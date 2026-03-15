import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/utils/prisma";
import { PersonasClient } from "./components/PersonasClient";

export const dynamic = "force-dynamic";

export default async function PersonasPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  const { role, churchId, departmentId } = session.user;

  // Solo ADMIN, RESPONSIBLE y LEADER pueden acceder
  if (!["ADMIN", "RESPONSIBLE", "LEADER"].includes(role)) {
    redirect("/app/dashboard");
  }

  // Cargar datos según el rol
  if (role === "ADMIN") {
    const personas = await prisma.person.findMany({
      orderBy: { name: "asc" },
      select: {
        id: true,
        name: true,
        lastname: true,
        email: true,
        phone: true,
        document: true,
        membershipStatus: true,
        active: true,
      },
    });

    return (
      <PersonasClient
        personasData={{ type: "persons", data: personas }}
        role={role}
      />
    );
  }

  if (role === "RESPONSIBLE" && churchId) {
    const church = await prisma.church.findUnique({
      where: { id: churchId },
      select: { title: true },
    });

    const personas = await prisma.person.findMany({
      where: { churchId },
      orderBy: { name: "asc" },
      select: {
        id: true,
        name: true,
        lastname: true,
        email: true,
        phone: true,
        document: true,
        membershipStatus: true,
        active: true,
      },
    });

    return (
      <PersonasClient
        personasData={{ type: "persons", data: personas }}
        role={role}
        churchId={churchId}
        churchName={church?.title}
      />
    );
  }

  if (role === "LEADER" && departmentId) {
    const department = await prisma.department.findUnique({
      where: { id: departmentId },
      select: { name: true },
    });

    const miembros = await prisma.personDepartment.findMany({
      where: { departmentId, active: true },
      include: {
        person: {
          select: {
            id: true,
            name: true,
            lastname: true,
            email: true,
            phone: true,
            document: true,
            membershipStatus: true,
            active: true,
          },
        },
      },
      orderBy: { person: { name: "asc" } },
    });

    return (
      <PersonasClient
        personasData={{ type: "members", data: miembros }}
        role={role}
        departmentId={departmentId}
        departmentName={department?.name}
      />
    );
  }

  // Si no tiene los datos necesarios, redirigir
  redirect("/app/dashboard");
}
