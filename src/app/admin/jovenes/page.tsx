import prisma from "@/utils/prisma";
import ListadoJovenesCliente from "./ListadoJovenesCliente";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function JovenesPage() {
  const jovenesReales = await prisma.joven.findMany({
    orderBy: {
      nombres: "asc",
    },
  });

  return <ListadoJovenesCliente jovenesIniciales={jovenesReales} />;
}