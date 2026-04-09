import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function uploadSignatureToSupabase(pngBase64: string, name: string, lastname: string): Promise<string> {
  const slug = [name, lastname]
    .filter(Boolean)
    .join("_")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "_")
    .toLowerCase();

  const date = new Date().toISOString().split("T")[0];
  const fileName = `${slug}_${date}.png`;

  const buffer = Uint8Array.from(atob(pngBase64), (c) => c.charCodeAt(0));
  const blob = new Blob([buffer], { type: "image/png" });

  const { error } = await supabase.storage
    .from("signatures")
    .upload(fileName, blob, { upsert: true, contentType: "image/png" });

  if (error) throw new Error(error.message);

  const { data: urlData } = supabase.storage.from("signatures").getPublicUrl(fileName);
  return urlData.publicUrl;
}

export async function uploadImageToSupabase(file: File): Promise<string> {
  const ext = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { error } = await supabase.storage
    .from("img-activities")
    .upload(fileName, file, { upsert: false });

  if (error) {
    throw new Error(error.message);
  }

  const { data: urlData } = supabase.storage
    .from("img-activities")
    .getPublicUrl(fileName);

  return urlData.publicUrl;
}
