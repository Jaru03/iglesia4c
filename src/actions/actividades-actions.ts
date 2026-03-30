"use server";

import prisma from "@/utils/prisma";
import { revalidatePath } from "next/cache";
import { logAudit } from "./audit-actions";
import { createClient } from "@supabase/supabase-js";
import { getSessionUser, canManageActivity, canManageDepartment } from "@/lib/auth-helpers";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const MANAGE_ROLES = ["ADMIN", "RESPONSIBLE", "LEADER"];

export async function crearActividad(formData: FormData) {
  const user = await getSessionUser();
  if (!user) return { error: "No autenticado" };
  if (!MANAGE_ROLES.includes(user.role)) return { error: "Sin permisos" };

  const title = formData.get("title") as string;
  const place = formData.get("place") as string;
  const description = formData.get("description") as string;
  const img = formData.get("img") as string;
  const fecha = formData.get("fecha") as string;
  const horaInicio = formData.get("horaInicio") as string;
  const horaFin = formData.get("horaFin") as string;
  const departmentId = parseInt(formData.get("departmentId") as string);
  const showCalendar = formData.get("showCalendar") === "on";
  const allowPreRegistration = formData.get("allowPreRegistration") === "on";

  if (!title || !place || !fecha || !horaInicio || !horaFin || !departmentId) {
    return { error: "Faltan datos obligatorios (título, lugar, fecha, hora y departamento)." };
  }

  const allowed = await canManageDepartment(user, departmentId);
  if (!allowed) return { error: "Sin permisos sobre ese departamento" };

  const date = new Date(`${fecha}T00:00:00`);
  const hourStart = new Date(`${fecha}T${horaInicio}:00`);
  const hourEnd = new Date(`${fecha}T${horaFin}:00`);

  const creada = await prisma.activity.create({
    data: {
      title,
      place,
      description,
      img: img || null,
      date,
      hourStart,
      hourEnd,
      showCalendar,
      allowPreRegistration,
      departmentId,
    },
  });

  await logAudit({
    module: "ACTIVIDADES",
    action: "CREATE",
    entity: "Activity",
    entityId: String(creada.id),
    description: `Actividad creada: ${creada.title}`,
  });

  revalidatePath("/app/actividades");
  revalidatePath("/app/dashboard");
  return { success: "Actividad creada." };
}

export async function eliminarActividad(id: number, _formData: FormData) {
  return eliminarActividadPorId(id);
}

export async function eliminarActividadPorId(id: number) {
  const user = await getSessionUser();
  if (!user) return { error: "No autenticado" };
  if (!MANAGE_ROLES.includes(user.role)) return { error: "Sin permisos" };

  const allowed = await canManageActivity(user, id);
  if (!allowed) return { error: "Sin permisos sobre esa actividad" };

  try {
    const actividad = await prisma.activity.findUnique({ where: { id } });

    if (actividad?.img) {
      const fileName = actividad.img.split("/img-activities/").at(-1);
      if (fileName) {
        await supabase.storage.from("img-activities").remove([fileName]);
      }
    }

    await prisma.activity.delete({ where: { id } });

    await logAudit({
      module: "ACTIVIDADES",
      action: "DELETE",
      entity: "Activity",
      entityId: String(id),
      description: `Actividad eliminada: ${actividad?.title || id}`,
    });

    revalidatePath("/app/actividades");
    revalidatePath("/app/dashboard");
    return { success: "Actividad eliminada." };
  } catch {
    return { error: "No se pudo eliminar la actividad." };
  }
}

export async function actualizarActividad(id: number, formData: FormData) {
  const user = await getSessionUser();
  if (!user) return { error: "No autenticado" };
  if (!MANAGE_ROLES.includes(user.role)) return { error: "Sin permisos" };

  const allowed = await canManageActivity(user, id);
  if (!allowed) return { error: "Sin permisos sobre esa actividad" };

  const title = formData.get("title") as string;
  const place = formData.get("place") as string;
  const description = formData.get("description") as string;
  const img = formData.get("img") as string;
  const fecha = formData.get("fecha") as string;
  const horaInicio = formData.get("horaInicio") as string;
  const horaFin = formData.get("horaFin") as string;
  const departmentId = parseInt(formData.get("departmentId") as string);
  const showCalendar = formData.get("showCalendar") === "on";
  const allowPreRegistration = formData.get("allowPreRegistration") === "on";

  if (!id || !title || !place || !fecha || !horaInicio || !horaFin || !departmentId) {
    return { error: "Faltan datos para actualizar." };
  }

  const date = new Date(`${fecha}T00:00:00`);
  const hourStart = new Date(`${fecha}T${horaInicio}:00`);
  const hourEnd = new Date(`${fecha}T${horaFin}:00`);

  const actualizada = await prisma.activity.update({
    where: { id },
    data: {
      title,
      place,
      description,
      img: img || null,
      date,
      hourStart,
      hourEnd,
      departmentId,
      showCalendar,
      allowPreRegistration,
    },
  });

  await logAudit({
    module: "ACTIVIDADES",
    action: "UPDATE",
    entity: "Activity",
    entityId: String(id),
    description: `Actividad editada: ${actualizada.title}`,
  });

  revalidatePath("/app/actividades");
  revalidatePath("/app/dashboard");
  return { success: "Actividad actualizada." };
}
