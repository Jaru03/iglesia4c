"use server";

import prisma from "@/utils/prisma";
import { revalidatePath } from "next/cache";

async function updateMembershipStatus(personId: number) {
  const person = await prisma.person.findUnique({
    where: { id: personId },
    include: { 
      user: true,
      departments: true,
      _count: { select: { attendances: true } },
    },
  });

  if (!person) return;

  const hasUser = !!person.user;
  const isInDepartments = person.departments.length > 0;
  const attendanceCount = person._count.attendances;

  let newStatus: "MEMBER" | "VISITOR" | "INACTIVE" = "VISITOR";

  if (!person.active) {
    newStatus = "INACTIVE";
  } else if (hasUser || isInDepartments || attendanceCount > 1) {
    newStatus = "MEMBER";
  }

  if (person.membershipStatus !== newStatus) {
    await prisma.person.update({
      where: { id: personId },
      data: { membershipStatus: newStatus },
    });
  }
}

export async function recalculateAllMembershipStatus() {
  const allPersons = await prisma.person.findMany({
    include: { 
      user: true,
      departments: true,
      _count: { select: { attendances: true } },
    },
  });

  for (const person of allPersons) {
    const hasUser = !!person.user;
    const isInDepartments = person.departments.length > 0;
    const attendanceCount = person._count.attendances;

    let newStatus: "MEMBER" | "VISITOR" | "INACTIVE" = "VISITOR";

    if (!person.active) {
      newStatus = "INACTIVE";
    } else if (hasUser || isInDepartments || attendanceCount > 1) {
      newStatus = "MEMBER";
    }

    if (person.membershipStatus !== newStatus) {
      await prisma.person.update({
        where: { id: person.id },
        data: { membershipStatus: newStatus },
      });
    }
  }

  revalidatePath("/app/personas");
  revalidatePath("/app/personas");
  revalidatePath("/app/dashboard");
  revalidatePath("/app/dashboard");

  return { success: "Membresías actualizadas correctamente." };
}

export async function crearPersona(formData: FormData) {
  const name = formData.get("name")?.toString().trim();
  const lastname = formData.get("lastname")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const phone = formData.get("phone")?.toString().trim();
  const document = formData.get("document")?.toString().trim();
  const birthDateStr = formData.get("birthDate")?.toString().trim();
  const churchId = formData.get("churchId") ? parseInt(formData.get("churchId") as string) : null;
  const departmentIds = formData.getAll("departmentIds").map((id) => parseInt(id as string)).filter(Boolean);

  if (!name) {
    return { error: "El nombre es obligatorio." };
  }

  if (!lastname) {
    return { error: "Los apellidos son obligatorios." };
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
        churchId: churchId || null,
        active: true,
        membershipStatus: "VISITOR",
        ...(departmentIds.length > 0 && {
          departments: {
            create: departmentIds.map((deptId) => ({
              departmentId: deptId,
              active: true,
            })),
          },
        }),
      },
    });

    await updateMembershipStatus(newPerson.id);

    revalidatePath("/app/personas");
    revalidatePath("/app/personas");
    revalidatePath("/app/dashboard");
    revalidatePath("/app/dashboard");

    return { success: "Persona creada correctamente." };
  } catch (error) {
    console.error(error);
    return { error: "Error al crear la persona." };
  }
}

export async function actualizarPersona(id: number, formData: FormData) {
  const name = formData.get("name")?.toString().trim();
  const lastname = formData.get("lastname")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const phone = formData.get("phone")?.toString().trim();
  const document = formData.get("document")?.toString().trim();
  const birthDateStr = formData.get("birthDate")?.toString().trim();
  const churchId = formData.get("churchId") ? parseInt(formData.get("churchId") as string) : null;
  const departmentIds = formData.getAll("departmentIds").map((d) => parseInt(d as string)).filter(Boolean);

  if (!name) {
    return { error: "El nombre es obligatorio." };
  }

  if (!lastname) {
    return { error: "Los apellidos son obligatorios." };
  }

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
          churchId: churchId || null,
        },
      }),
      prisma.personDepartment.deleteMany({ where: { personId: id } }),
      ...(departmentIds.length > 0
        ? [
            prisma.personDepartment.createMany({
              data: departmentIds.map((deptId) => ({
                personId: id,
                departmentId: deptId,
                active: true,
              })),
            }),
          ]
        : []),
    ]);

    revalidatePath("/app/personas");
    revalidatePath("/app/personas");
    revalidatePath("/app/dashboard");
    revalidatePath("/app/dashboard");

    await updateMembershipStatus(id);

    return { success: "Persona actualizada correctamente." };
  } catch (error) {
    console.error(error);
    return { error: "Error al actualizar la persona." };
  }
}

export async function eliminarPersona(formData: FormData) {
  const id = parseInt(formData.get("id") as string);
  if (!id) return;

  await prisma.$transaction([
    prisma.attendance.deleteMany({ where: { personId: id } }),
    prisma.person.delete({ where: { id } }),
  ]);

  revalidatePath("/app/personas");
  revalidatePath("/app/personas");
  revalidatePath("/app/dashboard");
  revalidatePath("/app/dashboard");
}

export async function togglePersona(id: number) {
  const persona = await prisma.person.findUnique({ where: { id } });
  if (!persona) return;

  await prisma.person.update({
    where: { id },
    data: { active: !persona.active },
  });

  revalidatePath("/app/personas");
  revalidatePath("/app/personas");
  revalidatePath("/app/dashboard");
  revalidatePath("/app/dashboard");
}
