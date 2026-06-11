import { supabase } from "@/lib/supabase";

const BUCKET = "last-activities";

export type LastActivityPhoto = {
  id: string;
  url: string;
  title: string;
  name: string;
};

/**
 * Sube una foto al bucket `last-activities`. El título opcional se codifica en el
 * nombre del archivo (segmento tras `__`) para poder recuperarlo al listar, sin
 * necesidad de una tabla en base de datos.
 */
export async function uploadLastActivityPhoto(file: File, title?: string): Promise<void> {
  const ext = file.name.split(".").pop();
  const titlePart = encodeURIComponent(title?.trim() ?? "");
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}__${titlePart}.${ext}`;

  const { error } = await supabase.storage.from(BUCKET).upload(fileName, file, {
    upsert: false,
  });

  if (error) {
    throw new Error(error.message);
  }
}

/**
 * Lista las fotos del carrusel ordenadas de más reciente a más antigua.
 * Funciona tanto en server como en client porque usa la anon key pública.
 */
export async function listLastActivityPhotos(): Promise<LastActivityPhoto[]> {
  const { data, error } = await supabase.storage.from(BUCKET).list("", {
    sortBy: { column: "created_at", order: "desc" },
  });

  if (error || !data) {
    return [];
  }

  return data
    .filter((obj) => obj.name !== ".emptyFolderPlaceholder")
    .map((obj) => {
      const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(obj.name);
      return {
        id: obj.id ?? obj.name,
        name: obj.name,
        url: urlData.publicUrl,
        title: decodeTitleFromName(obj.name),
      };
    });
}

export async function deleteLastActivityPhoto(name: string): Promise<void> {
  const { error } = await supabase.storage.from(BUCKET).remove([name]);
  if (error) {
    throw new Error(error.message);
  }
}

/** Extrae el título codificado entre `__` y la extensión del nombre del archivo. */
function decodeTitleFromName(name: string): string {
  const match = name.match(/__(.*)\.[^.]+$/);
  if (!match) return "";
  try {
    return decodeURIComponent(match[1]);
  } catch {
    return "";
  }
}
