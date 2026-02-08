import prisma from "@/utils/prisma";
import ListadoJovenesCliente from "./ListadoJovenesCliente";

// 1. Esta es una Server Component (sin "use client")
export default async function JovenesPage() {
  // 2. Traemos los datos reales de Supabase
  const jovenesReales = await prisma.joven.findMany({
    orderBy: {
      nombres: 'asc'
    }
  });

  // 3. Se los pasamos al componente que tiene el buscador
  return <ListadoJovenesCliente jovenesIniciales={jovenesReales} />;
}