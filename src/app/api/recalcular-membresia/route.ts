import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { recalculateAllMembershipStatus } from "@/actions/personas-actions";

export async function POST() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  if (session.user.role !== "ADMIN" && session.user.role !== "RESPONSIBLE") {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  const result = await recalculateAllMembershipStatus();
  
  return NextResponse.json(result);
}
