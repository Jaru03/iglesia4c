import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

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
