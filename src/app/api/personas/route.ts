import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { requireApiAuth, requireMobileAuth } from "@/lib/auth-helpers";

const MANAGE_ROLES = ["ADMIN", "RESPONSIBLE", "LEADER"];

export async function GET() {
  const auth = await requireApiAuth(MANAGE_ROLES);
  if (!auth.ok) return auth.response;

  const personas = await prisma.person.findMany({
    select: { id: true, name: true, lastname: true, email: true },
    orderBy: { name: "asc" },
  });

  return NextResponse.json(personas);
}

/**
 * Used by the Expo app (bearer JWT, not a NextAuth session) to create a
 * Person. Mirrors the `crearPersona` server action: ADMIN/RESPONSIBLE/LEADER
 * can always create; anyone else needs to be an Atención Primaria member
 * (visitor intake), same as `canCreatePersons` baked into the mobile JWT.
 */
export async function POST(req: Request) {
  const auth = requireMobileAuth(req);
  if (!auth.ok) return auth.response;
  if (!auth.user.canCreatePersons) {
    return NextResponse.json({ error: "Sin permisos" }, { status: 403 });
  }

  const body = await req.json().catch(() => null);
  const name = body?.name?.toString().trim();
  const lastname = body?.lastname?.toString().trim();

  if (!name) {
    return NextResponse.json({ error: "El nombre es obligatorio." }, { status: 400 });
  }
  if (!lastname) {
    return NextResponse.json({ error: "Los apellidos son obligatorios." }, { status: 400 });
  }

  const requestedChurchId = body?.churchId ? Number(body.churchId) : null;
  if (
    auth.user.role === "RESPONSIBLE" &&
    requestedChurchId &&
    auth.user.churchId !== requestedChurchId
  ) {
    return NextResponse.json(
      { error: "Sin permisos para crear personas en esa iglesia" },
      { status: 403 }
    );
  }
  const churchId = auth.user.role === "RESPONSIBLE" ? auth.user.churchId : requestedChurchId;

  const attendsChurchRaw = body?.attendsChurch;
  const attendsChurch =
    attendsChurchRaw === true || attendsChurchRaw === "true"
      ? true
      : attendsChurchRaw === false || attendsChurchRaw === "false"
        ? false
        : null;

  try {
    const person = await prisma.person.create({
      data: {
        name,
        lastname,
        email: body?.email?.toString().trim() || null,
        phone: body?.phone?.toString().trim() || null,
        document: body?.document?.toString().trim() || null,
        birthDate: body?.birthDate ? new Date(body.birthDate) : null,
        active: true,
        membershipStatus: "VISITOR",
        arrivedAt: new Date(),
        attendsChurch,
        howDidYouMeetUs: body?.howDidYouMeetUs?.toString().trim() || null,
        authorizedContact: body?.authorizedContact === true,
        prayerRequest: body?.prayerRequest?.toString().trim() || null,
        signature: body?.signature?.toString().trim() || null,
        ...(churchId && { church: { connect: { id: churchId } } }),
      },
    });

    return NextResponse.json(person, { status: 201 });
  } catch (error) {
    console.error("[API /personas] Error al crear:", error);
    return NextResponse.json({ error: "Error al crear la persona." }, { status: 500 });
  }
}
