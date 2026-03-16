"use server";

import prisma from "@/utils/prisma";
import { revalidatePath } from "next/cache";

export async function crearIglesia(formData: FormData) {
  const title = formData.get("title")?.toString().trim();
  const description = formData.get("description")?.toString().trim();
  const place = formData.get("place")?.toString().trim();
  const latitude = parseFloat(formData.get("latitude") as string);
  const longitude = parseFloat(formData.get("longitude") as string);
  const responsableIds = formData.getAll("responsableIds") as string[];
  const schedules = formData.getAll("schedules") as string[];

  if (!title || !place) {
    return { error: "El nombre y la ubicación son obligatorios." };
  }

  try {
    const church = await prisma.church.create({
      data: {
        title,
        description: description || "",
        place,
        latitude: latitude || 0,
        longitude: longitude || 0,
        active: true,
      },
    });

    // Create schedules
    if (schedules.length > 0) {
      const scheduleData = schedules.map((s) => {
        const [day, time] = s.split("|");
        return { day, time };
      }).filter((s) => s.day && s.time);

      if (scheduleData.length > 0) {
        await prisma.churchSchedule.createMany({
          data: scheduleData.map((s) => ({
            churchId: church.id,
            day: s.day,
            time: s.time,
          })),
        });
      }
    }

    const responsablePromises = responsableIds
      .filter((userId) => userId)
      .map((userId, index) =>
        prisma.churchLeader.create({
          data: {
            churchId: church.id,
            userId: parseInt(userId),
            role: "RESPONSIBLE",
            order: index,
          },
        })
      );

    await Promise.all(responsablePromises);

    const updateRolePromises = responsableIds
      .filter((userId) => userId)
      .map(async (userId) => {
        const userIdNum = parseInt(userId);
        await prisma.user.update({
          where: { id: userIdNum },
          data: { role: "RESPONSIBLE" },
        }).catch((err) => console.error("Error updating user:", userIdNum, err));

        // Link person to this church as MEMBER
        const person = await prisma.person.findFirst({ where: { user: { id: userIdNum } } });
        if (person) {
          await prisma.person.update({
            where: { id: person.id },
            data: { churchId: church.id, membershipStatus: "MEMBER" },
          });
        }
      });

    await Promise.all(updateRolePromises);

    revalidatePath("/admin/iglesias");
    revalidatePath("/admin");
    revalidatePath("/admin/equipo");
    revalidatePath("/app/iglesias");
    revalidatePath("/app/dashboard");
    return { success: "Iglesia creada correctamente." };
  } catch (error) {
    console.error(error);
    return { error: "Error al crear la iglesia." };
  }
}

export async function actualizarIglesia(id: number, formData: FormData) {
  const title = formData.get("title")?.toString().trim();
  const description = formData.get("description")?.toString().trim();
  const place = formData.get("place")?.toString().trim();
  const latitude = parseFloat(formData.get("latitude") as string);
  const longitude = parseFloat(formData.get("longitude") as string);
  const active = formData.get("active") === "on";
  const responsableIds = formData.getAll("responsableIds") as string[];
  const schedules = formData.getAll("schedules") as string[];

  if (!title || !place) {
    return { error: "El nombre y la ubicación son obligatorios." };
  }

  try {
    console.log("--- actualizarIglesia ---");
    console.log("churchId:", id);
    console.log("responsableIds:", responsableIds);

    const oldLeaders = await prisma.churchLeader.findMany({
      where: { churchId: id, role: "RESPONSIBLE" },
      select: { userId: true },
    });
    const oldResponsableIds = new Set(oldLeaders.map((l) => l.userId));
    console.log("oldResponsableIds:", Array.from(oldResponsableIds));

    await prisma.church.update({
      where: { id },
      data: {
        title,
        description: description || "",
        place,
        latitude: latitude || 0,
        longitude: longitude || 0,
        active,
      },
    });

    // Update schedules
    await prisma.churchSchedule.deleteMany({ where: { churchId: id } });
    if (schedules.length > 0) {
      const scheduleData = schedules.map((s) => {
        const [day, time] = s.split("|");
        return { day, time };
      }).filter((s) => s.day && s.time);

      if (scheduleData.length > 0) {
        await prisma.churchSchedule.createMany({
          data: scheduleData.map((s) => ({
            churchId: id,
            day: s.day,
            time: s.time,
          })),
        });
      }
    }

    await prisma.churchLeader.deleteMany({
      where: { churchId: id },
    });

    const newResponsableIds = responsableIds.filter((userId) => userId).map((id) => parseInt(id));
    const newResponsableSet = new Set(newResponsableIds);
    console.log("newResponsableIds:", newResponsableIds);

    const responsablePromises = newResponsableIds.map((userId, index) =>
      prisma.churchLeader.create({
        data: {
          churchId: id,
          userId,
          role: "RESPONSIBLE",
          order: index,
        },
      })
    );

    await Promise.all(responsablePromises);

    const allCurrentLeaders = await prisma.churchLeader.findMany({
      where: { role: "RESPONSIBLE" },
      select: { userId: true },
    });
    const currentResponsableIds = new Set(allCurrentLeaders.map((l) => l.userId));

    for (const oldUserId of oldResponsableIds) {
      if (!newResponsableSet.has(oldUserId) && !currentResponsableIds.has(oldUserId)) {
        const isDeptLeader = await prisma.departmentMember.findFirst({
          where: { userId: oldUserId, roleInDept: "LEADER", active: true },
        });
        let newRole: "LEADER" | "MEMBER" | "USER" = "USER";
        if (isDeptLeader) {
          newRole = "LEADER";
        } else {
          const person = await prisma.person.findFirst({
            where: { user: { id: oldUserId } },
            select: { departments: { where: { active: true }, take: 1 } },
          });
          if ((person?.departments.length ?? 0) > 0) newRole = "MEMBER";
        }
        await prisma.user.update({
          where: { id: oldUserId },
          data: { role: newRole },
        });
      }
    }

    for (const newUserId of newResponsableIds) {
      await prisma.user.update({
        where: { id: newUserId },
        data: { role: "RESPONSIBLE" },
      }).catch((err) => console.error("Error updating user:", newUserId, err));

      // Link person to this church as MEMBER
      const person = await prisma.person.findFirst({ where: { user: { id: newUserId } } });
      if (person) {
        await prisma.person.update({
          where: { id: person.id },
          data: { churchId: id, membershipStatus: "MEMBER" },
        });
      }
    }

    revalidatePath("/admin/iglesias");
    revalidatePath("/admin");
    revalidatePath("/admin/equipo");
    revalidatePath("/responsable");
    revalidatePath("/responsable/configuracion");
    revalidatePath("/app/iglesias");
    revalidatePath("/app/dashboard");
    revalidatePath("/app/configuracion");
    
    return { success: "Iglesia actualizada correctamente." };
  } catch (error) {
    console.error(error);
    return { error: "Error al actualizar la iglesia." };
  }
}

export async function eliminarIglesia(formData: FormData) {
  const id = parseInt(formData.get("id") as string);
  if (!id) return;

  await prisma.church.delete({ where: { id } });
  revalidatePath("/admin/iglesias");
  revalidatePath("/admin");
  revalidatePath("/app/iglesias");
  revalidatePath("/app/dashboard");
}

export async function toggleIglesia(id: number) {
  const iglesia = await prisma.church.findUnique({ where: { id } });
  if (!iglesia) return;

  await prisma.church.update({
    where: { id },
    data: { active: !iglesia.active },
  });

  revalidatePath("/admin/iglesias");
  revalidatePath("/admin");
  revalidatePath("/app/iglesias");
  revalidatePath("/app/dashboard");
}
