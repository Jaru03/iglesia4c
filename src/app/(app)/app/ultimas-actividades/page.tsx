import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { listLastActivityPhotos } from "@/lib/lastActivities";
import { UltimasActividadesClient } from "./components/UltimasActividadesClient";

export const dynamic = "force-dynamic";

export default async function UltimasActividadesPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/app/dashboard");
  }

  const photos = await listLastActivityPhotos();

  return <UltimasActividadesClient initialPhotos={photos} />;
}
