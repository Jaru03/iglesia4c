"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import { Images, Loader2, Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import ImageUpload from "@/components/ImageUpload";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import {
  uploadLastActivityPhoto,
  deleteLastActivityPhoto,
  type LastActivityPhoto,
} from "@/lib/lastActivities";

interface Props {
  initialPhotos: LastActivityPhoto[];
}

export function UltimasActividadesClient({ initialPhotos }: Props) {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadKey, setUploadKey] = useState(0);
  const [toDelete, setToDelete] = useState<LastActivityPhoto | null>(null);
  const [deleting, setDeleting] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      toast.error("Selecciona una imagen");
      return;
    }

    setLoading(true);
    try {
      await uploadLastActivityPhoto(file, title);
      toast.success("Foto subida correctamente");
      setFile(null);
      setTitle("");
      setUploadKey((k) => k + 1); // remonta ImageUpload para limpiar la vista previa
      router.refresh();
    } catch {
      toast.error("Error al subir la imagen");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!toDelete) return;

    setDeleting(true);
    try {
      await deleteLastActivityPhoto(toDelete.name);
      toast.success("Foto eliminada");
      setToDelete(null);
      router.refresh();
    } catch {
      toast.error("Error al eliminar la imagen");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 pb-6 space-y-4 lg:h-[100vh] lg:overflow-auto">
      <DashboardHeader
        title="Últimas Actividades"
        subtitle="Gestiona las fotos del carrusel de la página de inicio."
      />

      <div className="grid gap-4 lg:grid-cols-[32rem_1fr] lg:items-start">
        {/* Subir nueva foto */}
        <Card className="shadow-md border-slate-200 lg:sticky lg:top-4">
          <CardHeader className="pb-3">
            <CardTitle>Subir nueva foto</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ImageUpload key={uploadKey} onFileSelect={setFile} heightClassName="h-52" />

            <div className="space-y-2">
              <Label htmlFor="title">Título (opcional)</Label>
              <Input
                id="title"
                type="text"
                placeholder="Ej. Culto del Domingo"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <Button
              onClick={handleUpload}
              disabled={loading || !file}
              className="w-full"
            >
              {loading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Upload className="size-4" />
              )}
              {loading ? "Subiendo..." : "Subir foto"}
            </Button>
          </CardContent>
        </Card>

        {/* Galería */}
        <Card className="shadow-md border-slate-200">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <CardTitle>Fotos del carrusel</CardTitle>
              <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                {initialPhotos.length}
              </span>
            </div>
          </CardHeader>
          <CardContent>
            {initialPhotos.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-200 py-14 text-center">
                <div className="flex size-11 items-center justify-center rounded-full bg-muted">
                  <Images className="size-5 text-muted-foreground" />
                </div>
                <p className="text-sm font-medium">Aún no hay fotos</p>
                <p className="max-w-xs text-xs text-muted-foreground">
                  Mientras tanto, el carrusel muestra las imágenes por defecto.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {initialPhotos.map((photo) => (
                  <div
                    key={photo.id}
                    className="group relative aspect-[16/9] overflow-hidden rounded-xl border border-slate-200 bg-muted"
                  >
                    <Image
                      src={photo.url}
                      alt={photo.title || "Foto de actividad"}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/10 opacity-90" />

                    {photo.title && (
                      <p className="absolute inset-x-3 bottom-2.5 truncate text-sm font-medium text-white">
                        {photo.title}
                      </p>
                    )}

                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute right-2 top-2 size-8 opacity-0 shadow-sm transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
                      onClick={() => setToDelete(photo)}
                    >
                      <Trash2 className="size-4" />
                      <span className="sr-only">Eliminar foto</span>
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <ConfirmDialog
        open={toDelete !== null}
        onOpenChange={(open) => !open && setToDelete(null)}
        onConfirm={handleDelete}
        title="Eliminar foto"
        description="Esta foto se quitará del carrusel de la página de inicio. Esta acción no se puede deshacer."
        confirmLabel="Eliminar"
        variant="destructive"
        loading={deleting}
      />
    </div>
  );
}
