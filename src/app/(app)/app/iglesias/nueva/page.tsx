import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/utils/prisma";
import ChurchForm from "@/components/forms/ChurchForm";

export const dynamic = "force-dynamic";

export default async function NuevaIglesiaPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/app/dashboard");
  }

  const users = await prisma.user.findMany({
    include: {
      person: {
        select: { name: true, lastname: true },
      },
    },
  });

  const userData = users.map((u) => ({
    id: u.id,
    name: u.person.name,
    lastname: u.person.lastname,
  }));

  return (
    <div className="container mx-auto py-6 px-4">
      <ChurchForm
        users={userData}
        redirectTo="/app/iglesias"
        isEdit={false}
      />
    </div>
  );
}
