import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/utils/prisma";
import PerfilForm from "@/components/forms/PerfilForm";

export const dynamic = "force-dynamic";

export default async function EditarPerfilPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");

  const { id } = session.user;
  const userId = parseInt(id as string);

  const person = await prisma.person.findFirst({
    where: { user: { id: userId } },
    include: { user: true },
  });

  if (!person) {
    redirect("/app/perfil");
  }

  const personaData = {
    id: person.id,
    name: person.name,
    lastname: person.lastname,
    email: person.email,
    phone: person.phone,
    address: person.address,
    birthDate: person.birthDate,
    hasUser: !!person.user,
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <PerfilForm
        persona={personaData}
        redirectTo="/app/perfil"
      />
    </div>
  );
}
