"use server";

import prisma from "@/utils/prisma";
import { revalidatePath } from "next/cache";
import { getSessionUser, canManagePerson } from "@/lib/auth-helpers";

const MANAGE_ROLES = ["ADMIN", "RESPONSIBLE", "LEADER"];
const ADMIN_RESPONSIBLE = ["ADMIN", "RESPONSIBLE"];

async function updateMembershipStatus(personId: number) {
  const person = await prisma.person.findUnique({
    where: { id: personId },
    include: {
      departments: { where: { active: true } },
      _count: { select: { attendances: true } },
    },
  });

  if (!person) return;

  const isInDepartments = person.departments.length > 0;
  const attendanceCount = person._count.attendances;

  let newStatus: "ACTIVE" | "VISITOR" | "INACTIVE" = "VISITOR";

  if (!person.active) {
    newStatus = "INACTIVE";
  } else if (isInDepartments || attendanceCount > 1) {
    newStatus = "ACTIVE";
  }

  if (person.membershipStatus !== newStatus) {
    await prisma.person.update({
      where: { id: personId },
      data: { membershipStatus: newStatus },
    });
  }
}

// Roles que no deben ser degradados al asignar/quitar obrero
const PROTECTED_ROLES = ["ADMIN", "RESPONSIBLE", "LEADER"];

async function syncObreroRole(personId: number, isObrero: boolean) {
  const person = await prisma.person.findUnique({
    where: { id: personId },
    select: { user: { select: { id: true, role: true } } },
  });
  const userRecord = person?.user;
  if (!userRecord) return; // sin cuenta, nada que hacer

  if (isObrero && !PROTECTED_ROLES.includes(userRecord.role)) {
    await prisma.user.update({ where: { id: userRecord.id }, data: { role: "OBRERO" } });
  } else if (!isObrero && userRecord.role === "OBRERO") {
    await prisma.user.update({ where: { id: userRecord.id }, data: { role: "USER" } });
  }
}

export async function toggleIsMember(personId: number, isMember: boolean) {
  const user = await getSessionUser();
  if (!user) return { error: "No autenticado" };
  if (!ADMIN_RESPONSIBLE.includes(user.role)) return { error: "Sin permisos" };

  const allowed = await canManagePerson(user, personId);
  if (!allowed) return { error: "Sin permisos sobre esa persona" };

  await prisma.person.update({
    where: { id: personId },
    data: { isMember },
  });

  const userRecord = await prisma.user.findFirst({ where: { personId } });
  if (userRecord && !["ADMIN", "RESPONSIBLE", "LEADER"].includes(userRecord.role)) {
    await prisma.user.update({
      where: { id: userRecord.id },
      data: { role: "USER" },
    });
  }

  revalidatePath("/app/personas");
  revalidatePath("/app/miembros");
  return { success: isMember ? "Membresía activada." : "Membresía desactivada." };
}

export async function recalculateAllMembershipStatus() {
  const user = await getSessionUser();
  if (!user) return { error: "No autenticado" };
  if (!ADMIN_RESPONSIBLE.includes(user.role)) return { error: "Sin permisos" };

  // Batch update using 3 SQL statements instead of N individual updates
  await prisma.$transaction([
    // 1. Mark inactive persons
    prisma.$executeRaw`
      UPDATE "Person" SET "membershipStatus" = 'INACTIVE'
      WHERE active = false AND "membershipStatus" != 'INACTIVE'
    `,
    // 2. Mark active persons who are in departments or have >1 attendance
    prisma.$executeRaw`
      UPDATE "Person" SET "membershipStatus" = 'ACTIVE'
      WHERE active = true AND "membershipStatus" != 'ACTIVE'
      AND (
        EXISTS (SELECT 1 FROM "PersonDepartment" pd WHERE pd."personId" = "Person".id AND pd.active = true)
        OR (SELECT COUNT(*) FROM "Attendance" a WHERE a."personId" = "Person".id) > 1
      )
    `,
    // 3. Mark remaining active persons as visitors
    prisma.$executeRaw`
      UPDATE "Person" SET "membershipStatus" = 'VISITOR'
      WHERE active = true AND "membershipStatus" != 'VISITOR'
      AND NOT EXISTS (SELECT 1 FROM "PersonDepartment" pd WHERE pd."personId" = "Person".id AND pd.active = true)
      AND (SELECT COUNT(*) FROM "Attendance" a WHERE a."personId" = "Person".id) <= 1
    `,
  ]);

  revalidatePath("/app/personas");
  revalidatePath("/app/dashboard");
  return { success: "Membresías actualizadas correctamente." };
}

export async function crearPersona(formData: FormData) {
  const user = await getSessionUser();
  if (!user) return { error: "No autenticado" };
  if (!MANAGE_ROLES.includes(user.role)) return { error: "Sin permisos" };

  const name = formData.get("name")?.toString().trim();
  const lastname = formData.get("lastname")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const phone = formData.get("phone")?.toString().trim();
  const document = formData.get("document")?.toString().trim();
  const birthDateStr = formData.get("birthDate")?.toString().trim();
  const churchIdRaw = formData.get("churchId");
  const churchId = churchIdRaw ? parseInt(churchIdRaw as string) : null;
  const departmentIds = formData.getAll("departmentIds").map((id) => parseInt(id as string)).filter(Boolean);

  const membershipStatusRaw = formData.get("membershipStatus")?.toString().trim();
  const membershipStatus = (["VISITOR", "ACTIVE", "INACTIVE"].includes(membershipStatusRaw ?? "")
    ? membershipStatusRaw
    : "VISITOR") as "VISITOR" | "ACTIVE" | "INACTIVE";
  const isMember = formData.get("isMember") === "true";
  const isObrero = formData.get("isObrero") === "true";

  const arrivedAtStr = formData.get("arrivedAt")?.toString().trim();
  const attendsChurchStr = formData.get("attendsChurch")?.toString();
  const howDidYouMeetUs = formData.get("howDidYouMeetUs")?.toString().trim();
  const authorizedContact = formData.get("authorizedContact") === "true";
  const prayerRequest = formData.get("prayerRequest")?.toString().trim();
  const signature = formData.get("signature")?.toString().trim();

  if (!name) return { error: "El nombre es obligatorio." };
  if (!lastname) return { error: "Los apellidos son obligatorios." };

  // RESPONSIBLE can only create persons in their own church
  if (user.role === "RESPONSIBLE" && churchId && user.churchId !== churchId) {
    return { error: "Sin permisos para crear personas en esa iglesia" };
  }

  try {
    const newPerson = await prisma.person.create({
      data: {
        name,
        lastname,
        email: email || null,
        phone: phone || null,
        document: document || null,
        birthDate: birthDateStr ? new Date(birthDateStr) : null,
        ...(churchId && { church: { connect: { id: churchId } } }),
        active: true,
        membershipStatus,
        isMember,
        isObrero,
        arrivedAt: arrivedAtStr ? new Date(arrivedAtStr) : null,
        attendsChurch: attendsChurchStr === "true" ? true : attendsChurchStr === "false" ? false : null,
        howDidYouMeetUs: howDidYouMeetUs || null,
        authorizedContact,
        prayerRequest: prayerRequest || null,
        signature: signature || null,
        ...(departmentIds.length > 0 && {
          departments: {
            create: departmentIds.map((deptId) => ({ departmentId: deptId, active: true })),
          },
        }),
      },
    });

    await updateMembershipStatus(newPerson.id);
    await syncObreroRole(newPerson.id, isObrero);

    revalidatePath("/app/personas");
    revalidatePath("/app/dashboard");
    return { success: "Persona creada correctamente." };
  } catch (error) {
    console.error(error);
    return { error: "Error al crear la persona." };
  }
}

export async function actualizarPersona(id: number, formData: FormData) {
  const user = await getSessionUser();
  if (!user) return { error: "No autenticado" };
  if (!MANAGE_ROLES.includes(user.role)) return { error: "Sin permisos" };

  const allowed = await canManagePerson(user, id);
  if (!allowed) return { error: "Sin permisos sobre esa persona" };

  const name = formData.get("name")?.toString().trim();
  const lastname = formData.get("lastname")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const phone = formData.get("phone")?.toString().trim();
  const document = formData.get("document")?.toString().trim();
  const birthDateStr = formData.get("birthDate")?.toString().trim();
  const churchIdRaw = formData.get("churchId");
  const churchId = churchIdRaw ? parseInt(churchIdRaw as string) : null;
  const departmentIds = formData.getAll("departmentIds").map((d) => parseInt(d as string)).filter(Boolean);
  const membershipStatusRaw = formData.get("membershipStatus")?.toString().trim();
  const membershipStatus = (["VISITOR", "ACTIVE", "INACTIVE"].includes(membershipStatusRaw ?? "")
    ? membershipStatusRaw
    : undefined) as "VISITOR" | "ACTIVE" | "INACTIVE" | undefined;
  const isMemberRaw = formData.get("isMember");
  const isMember = isMemberRaw !== null ? isMemberRaw === "true" : undefined;
  const isObreroRaw = formData.get("isObrero");
  const isObrero = isObreroRaw !== null ? isObreroRaw === "true" : undefined;

  if (!name) return { error: "El nombre es obligatorio." };
  if (!lastname) return { error: "Los apellidos son obligatorios." };

  try {
    await prisma.$transaction([
      prisma.person.update({
        where: { id },
        data: {
          name,
          lastname,
          email: email || null,
          phone: phone || null,
          document: document || null,
          birthDate: birthDateStr ? new Date(birthDateStr) : null,
          church: churchId ? { connect: { id: churchId } } : { disconnect: true },
          ...(membershipStatus !== undefined && { membershipStatus }),
          ...(isMember !== undefined && { isMember }),
          ...(isObrero !== undefined && { isObrero }),
        },
      }),
      prisma.personDepartment.deleteMany({ where: { personId: id } }),
      ...(departmentIds.length > 0
        ? [
            prisma.personDepartment.createMany({
              data: departmentIds.map((deptId) => ({ personId: id, departmentId: deptId, active: true })),
            }),
          ]
        : []),
    ]);

    revalidatePath("/app/personas");
    revalidatePath("/app/dashboard");

    await updateMembershipStatus(id);
    if (isObrero !== undefined) await syncObreroRole(id, isObrero);
    return { success: "Persona actualizada correctamente." };
  } catch (error) {
    console.error(error);
    return { error: "Error al actualizar la persona." };
  }
}

export async function eliminarPersona(formData: FormData) {
  const user = await getSessionUser();
  if (!user) return { error: "No autenticado" };
  if (!ADMIN_RESPONSIBLE.includes(user.role)) return { error: "Sin permisos" };

  const id = parseInt(formData.get("id") as string);
  if (!id) return { error: "ID inválido" };

  const allowed = await canManagePerson(user, id);
  if (!allowed) return { error: "Sin permisos sobre esa persona" };

  await prisma.$transaction(async (tx) => {
    const person = await tx.person.findUnique({
      where: { id },
      include: { user: { select: { id: true } } },
    });

    const userId = person?.user?.id;

    await tx.attendance.deleteMany({ where: { personId: id } });
    await tx.personDepartment.deleteMany({ where: { personId: id } });

    if (userId) {
      await tx.departmentMember.deleteMany({ where: { userId } });
      await tx.churchLeader.deleteMany({ where: { userId } });
      await tx.availability.deleteMany({ where: { userId } });
      await tx.appointment.deleteMany({
        where: { OR: [{ responsableId: userId }, { userId }] },
      });
      await tx.user.delete({ where: { id: userId } });
    }

    await tx.person.delete({ where: { id } });
  });

  revalidatePath("/app/personas");
  revalidatePath("/app/dashboard");
}

export async function togglePersona(id: number) {
  const user = await getSessionUser();
  if (!user) return { error: "No autenticado" };
  if (!ADMIN_RESPONSIBLE.includes(user.role)) return { error: "Sin permisos" };

  const allowed = await canManagePerson(user, id);
  if (!allowed) return { error: "Sin permisos sobre esa persona" };

  const persona = await prisma.person.findUnique({ where: { id } });
  if (!persona) return;

  await prisma.person.update({
    where: { id },
    data: { active: !persona.active },
  });

  revalidatePath("/app/personas");
  revalidatePath("/app/dashboard");
}
