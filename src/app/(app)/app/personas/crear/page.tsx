import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/utils/prisma";
import PersonaForm from "@/components/forms/PersonaForm";

export const dynamic = "force-dynamic";

export default async function CrearPersonaPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");

  const { role } = session.user;

  if (role !== "ADMIN" && role !== "RESPONSIBLE") {
    redirect("/app/dashboard");
  }

  const departments = await prisma.department.findMany({
    where: { active: true },
    orderBy: { name: "asc" },
    select: { id: true, name: true },
  });

  const churches = await prisma.church.findMany({
    where: { active: true },
    orderBy: { title: "asc" },
    select: { id: true, title: true },
  });

  return (
    <div className="container mx-auto py-6 px-4">
      <PersonaForm departments={departments} churches={churches} isEdit={false} />
    </div>
  );
}
