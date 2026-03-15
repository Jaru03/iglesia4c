import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/utils/prisma";
import DepartmentForm from "@/components/forms/DepartmentForm";

export const dynamic = "force-dynamic";

export default async function NuevoDepartamentoPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");

  const { role, churchId } = session.user;

  if (role !== "ADMIN" && role !== "RESPONSIBLE") {
    redirect("/app/dashboard");
  }

  let churches: { id: number; title: string }[] = [];
  let users: { id: number; name: string; lastname: string; churchId?: number | null }[] = [];
  let persons: { id: number; name: string; lastname: string; churchId?: number | null }[] = [];

  if (role === "ADMIN") {
    churches = await prisma.church.findMany({
      where: { active: true },
      orderBy: { title: "asc" },
      select: { id: true, title: true },
    });
    const dbUsers = await prisma.user.findMany({
      include: { person: { select: { name: true, lastname: true, churchId: true } } },
    });
    users = dbUsers.map((u) => ({
      id: u.id,
      name: u.person.name,
      lastname: u.person.lastname,
      churchId: u.person.churchId,
    }));
    persons = await prisma.person.findMany({
      where: { active: true },
      orderBy: [{ name: "asc" }, { lastname: "asc" }],
      select: { id: true, name: true, lastname: true, churchId: true },
    });
  } else if (role === "RESPONSIBLE" && churchId) {
    churches = await prisma.church.findMany({
      where: { id: churchId, active: true },
      orderBy: { title: "asc" },
      select: { id: true, title: true },
    });
    const dbUsers = await prisma.user.findMany({
      include: { person: { select: { name: true, lastname: true } } },
    });
    users = dbUsers.map((u) => ({
      id: u.id,
      name: u.person.name,
      lastname: u.person.lastname,
    }));
    persons = await prisma.person.findMany({
      where: { active: true, churchId },
      orderBy: [{ name: "asc" }, { lastname: "asc" }],
      select: { id: true, name: true, lastname: true },
    });
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <DepartmentForm
        churches={churches}
        users={users}
        persons={persons}
        redirectTo="/app/departamentos"
        isEdit={false}
        role={role as "ADMIN" | "RESPONSIBLE"}
      />
    </div>
  );
}
