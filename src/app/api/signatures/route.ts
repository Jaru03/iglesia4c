import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { requireApiAuth } from "@/lib/auth-helpers";

export async function POST(req: Request) {
  const auth = await requireApiAuth();
  if (!auth.ok) return auth.response;

  const { image, name, lastname } = await req.json();
  if (!image) return NextResponse.json({ error: "Imagen requerida" }, { status: 400 });

  const dir = path.join(process.cwd(), "public", "signatures");
  await mkdir(dir, { recursive: true });

  // Sanitize name/lastname to prevent path traversal
  const sanitize = (s: string) =>
    s
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9_\- ]/g, "")
      .replace(/\s+/g, "_")
      .toLowerCase();

  const slug = [name, lastname]
    .filter(Boolean)
    .map(sanitize)
    .join("_");

  const date = new Date().toISOString().split("T")[0];
  const fileName = `${slug}_${date}.png`;

  // Final safety check: ensure resolved path stays within the signatures dir
  const filePath = path.resolve(dir, fileName);
  if (!filePath.startsWith(path.resolve(dir))) {
    return NextResponse.json({ error: "Nombre inválido" }, { status: 400 });
  }

  const buffer = Buffer.from(image, "base64");
  await writeFile(filePath, buffer);

  return NextResponse.json({ url: `/signatures/${fileName}` });
}
