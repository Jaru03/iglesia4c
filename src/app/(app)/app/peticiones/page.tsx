import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/utils/prisma";
import { PeticionesClient } from "./PeticionesClient";
import type { PeticionItem } from "@/components/dashboard/items/PeticionListItem";

export const dynamic = "force-dynamic";

export default async function PeticionesPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  const { role } = session.user;

  if (!["ADMIN", "RESPONSIBLE"].includes(role)) {
    redirect("/app/dashboard");
  }

  const peticiones = await prisma.petition.findMany({
    orderBy: { createdAt: "desc" },
  });

  const data: PeticionItem[] = peticiones.map((p) => ({
    id: p.id,
    nombre: p.nombre,
    email: p.email,
    phone: p.phone,
    content: p.content,
    typePetition: p.typePetition,
    status: p.status,
    createdAt: p.createdAt.toISOString(),
  }));

  const pendientes = peticiones.filter((p) => p.status === "PENDIENTE").length;
  const enProceso = peticiones.filter((p) => p.status === "EN_PROCESO").length;
  const atendidas = peticiones.filter((p) => p.status === "ATENDIDA").length;

  return (
    <PeticionesClient
      items={data}
      total={peticiones.length}
      pendientes={pendientes}
      enProceso={enProceso}
      atendidas={atendidas}
    />
  );
}
