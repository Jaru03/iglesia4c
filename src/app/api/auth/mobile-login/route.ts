import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { authenticatePerson, canCreatePersons } from "@/lib/auth-helpers";

const TOKEN_TTL = "30d";

/**
 * JSON login for non-browser clients (e.g. the Expo app), which can't use
 * NextAuth's cookie-based session. Returns a signed JWT the client stores
 * and sends back as `Authorization: Bearer <token>` on later requests.
 */
export async function POST(req: Request) {
  const secret = process.env.NEXTAUTH_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Servidor mal configurado" }, { status: 500 });
  }

  let body: { identifier?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Cuerpo de la petición inválido" }, { status: 400 });
  }

  const { identifier, password } = body;
  if (!identifier || !password) {
    return NextResponse.json(
      { error: "Identificador y contraseña son obligatorios" },
      { status: 400 }
    );
  }

  const user = await authenticatePerson(identifier, password);
  if (!user) {
    return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 });
  }

  const fullUser = {
    ...user,
    canCreatePersons: await canCreatePersons(Number(user.id), user.role),
  };

  const token = jwt.sign(fullUser, secret, { expiresIn: TOKEN_TTL });

  return NextResponse.json({ token, user: fullUser });
}
