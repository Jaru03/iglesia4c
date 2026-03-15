"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { crearActividad, actualizarActividad } from "@/actions/actividades-actions";
import ImageUpload from "@/components/ImageUpload";
import { uploadImageToSupabase } from "@/lib/upload";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { DatePicker } from "@/components/ui/date-picker";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Combobox,
  ComboboxTrigger,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxInput,
  ComboboxEmpty,
  ComboboxValue,
} from "@/components/ui/combobox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  ArrowLeft,
  Loader2,
  X,
  Save,
  CalendarPlus,
  Pencil,
} from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { TimePicker } from "../ui/time-picker";

interface Activity {
  id: number;
  title: string;
  place: string;
  description: string | null;
  img: string | null;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  departmentId: number;
  churchId?: number;
  showCalendar: boolean;
}

interface Department {
  id: number;
  name: string;
  churchId?: number | null;
}

interface Church {
  id: number;
  title: string;
}

interface Props {
  activity?: Activity;
  departments: Department[];
  churches?: Church[];
  lockedDepartmentId?: number;
  redirectTo: string;
  isEdit?: boolean;
  role?: "ADMIN" | "RESPONSIBLE" | "LEADER";
}

export default function ActivityForm({
  activity,
  departments,
  churches,
  lockedDepartmentId,
  redirectTo,
  isEdit = false,
  role = "LEADER",
}: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showCalendar, setShowCalendar] = useState(activity?.showCalendar ?? true);
  const [departamentoId, setDepartamentoId] = useState<string>(
    activity?.departmentId
      ? String(activity.departmentId)
      : lockedDepartmentId
        ? String(lockedDepartmentId)
        : ""
  );
  const [iglesiaId, setIglesiaId] = useState<string>(
    activity?.churchId ? String(activity.churchId) : ""
  );
  const [fecha, setFecha] = useState<Date | undefined>(
    activity?.fecha
      ? new Date(activity.fecha + "T12:00:00")
      : undefined
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imgUrl, setImgUrl] = useState(activity?.img || "");
  const [horaInicio, setHoraInicio] = useState<string>(activity?.horaInicio || "");
  const [horaFin, setHoraFin] = useState<string>(activity?.horaFin || "");

  const isAdmin = role === "ADMIN";
  const isResponsable = role === "RESPONSIBLE";
  const isLeader = role === "LEADER";
  const showChurchSelector = isAdmin;
  const canSelectDepartment = isAdmin || isResponsable || (isLeader && !lockedDepartmentId);

  const deptItems = departments.map((d) => d.name);
  const churchItems = churches?.map((c) => c.title) || [];

  const selectedDept = departments.find((d) => String(d.id) === departamentoId);
  const selectedChurch = churches?.find((c) => String(c.id) === iglesiaId);

  const filteredDepts = isAdmin && iglesiaId && churches
    ? departments.filter((d) => d.churchId === parseInt(iglesiaId))
    : departments;

  const handleSubmit = async (formData: FormData) => {
    if (!departamentoId && !lockedDepartmentId) {
      toast.error("Selecciona un departamento");
      return;
    }
    if (!fecha) {
      toast.error("La fecha es obligatoria");
      return;
    }

    setLoading(true);

    let finalImgUrl = imgUrl;
    if (selectedFile) {
      try {
        finalImgUrl = await uploadImageToSupabase(selectedFile);
      } catch {
        toast.error("Error al subir la imagen");
        setLoading(false);
        return;
      }
    }

    if (fecha) {
      const year = fecha.getFullYear();
      const month = String(fecha.getMonth() + 1).padStart(2, "0");
      const day = String(fecha.getDate()).padStart(2, "0");
      formData.set("fecha", `${year}-${month}-${day}`);
    }

    if (lockedDepartmentId) {
      formData.set("departmentId", String(lockedDepartmentId));
    } else {
      formData.set("departmentId", departamentoId);
    }

    formData.set("img", finalImgUrl);
    formData.set("showCalendar", showCalendar ? "on" : "");
    formData.set("horaInicio", horaInicio);
    formData.set("horaFin", horaFin);

    const result = isEdit
      ? await actualizarActividad(activity!.id, formData)
      : await crearActividad(formData);

    setLoading(false);

    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success(
        result?.success ||
          (isEdit ? "Actividad actualizada" : "Actividad creada correctamente")
      );
      router.push(redirectTo);
      router.refresh();
    }
  };

  return (
    <Card className="max-w-2xl mx-auto border-0 shadow-lg">
      <CardHeader className="pb-6 border-b bg-muted/30">
        <div className="flex items-center gap-4">
          <div className="size-12 bg-primary rounded-xl flex items-center justify-center shadow-sm">
            {isEdit ? (
              <Pencil className="size-6 text-primary-foreground" />
            ) : (
              <CalendarPlus className="size-6 text-primary-foreground" />
            )}
          </div>
          <div>
            <CardTitle className="text-xl">
              {isEdit ? "Editar Actividad" : "Nueva Actividad"}
            </CardTitle>
            <CardDescription className="mt-1">
              {isEdit
                ? "Actualiza los detalles de la actividad"
                : "Completa los campos para crear una nueva actividad"}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <form action={handleSubmit}>
          <FieldGroup className="gap-8">
            {/* Información básica */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-foreground">
                Información básica
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {showChurchSelector && churches && churches.length > 0 && (
                  <Field>
                    <FieldLabel>Iglesia</FieldLabel>
                    <Combobox
                      value={selectedChurch?.title ?? ""}
                      onValueChange={(value) => {
                        const church = churches.find((c) => c.title === value);
                        setIglesiaId(church ? String(church.id) : "");
                        setDepartamentoId("");
                      }}
                      items={churchItems}
                    >
                      <div className="relative flex items-center h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-within:ring-[3px] focus-within:ring-ring/50 focus-within:border-ring">
                        <ComboboxValue>
                          {(value) => (
                            <ComboboxInput
                              placeholder="Seleccionar iglesia..."
                              className={value ? "placeholder:text-foreground" : ""}
                            />
                          )}
                        </ComboboxValue>
                        {iglesiaId && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setIglesiaId("");
                            }}
                            className="mr-1 size-4 rounded-full hover:bg-muted inline-flex items-center justify-center"
                          >
                            <X className="size-3 text-muted-foreground" />
                          </button>
                        )}
                        <ComboboxTrigger />
                      </div>
                      <ComboboxContent>
                        <ComboboxList>
                          {(item) => (
                            <ComboboxItem key={item} value={item}>
                              {item}
                            </ComboboxItem>
                          )}
                        </ComboboxList>
                        <ComboboxEmpty>
                          No se encontraron iglesias
                        </ComboboxEmpty>
                      </ComboboxContent>
                    </Combobox>
                  </Field>
                )}

                {canSelectDepartment && (
                  <Field>
                    <FieldLabel>
                      Departamento <span className="text-destructive">*</span>
                    </FieldLabel>
                    <Combobox
                      value={selectedDept?.name ?? ""}
                      onValueChange={(value) => {
                        const dept = departments.find((d) => d.name === value);
                        setDepartamentoId(dept ? String(dept.id) : "");
                      }}
                      items={filteredDepts.map((d) => d.name)}
                    >
                      <div className="relative flex items-center h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-within:ring-[3px] focus-within:ring-ring/50 focus-within:border-ring">
                        <ComboboxValue>
                          {(value) => (
                            <ComboboxInput
                              placeholder="Seleccionar departamento..."
                              className={value ? "placeholder:text-foreground" : ""}
                            />
                          )}
                        </ComboboxValue>
                        {departamentoId && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setDepartamentoId("");
                            }}
                            className="mr-1 size-4 rounded-full hover:bg-muted inline-flex items-center justify-center"
                          >
                            <X className="size-3 text-muted-foreground" />
                          </button>
                        )}
                        <ComboboxTrigger />
                      </div>
                      <ComboboxContent>
                        <ComboboxList>
                          {(item) => (
                            <ComboboxItem key={item} value={item}>
                              {item}
                            </ComboboxItem>
                          )}
                        </ComboboxList>
                        <ComboboxEmpty>
                          No se encontraron departamentos
                        </ComboboxEmpty>
                      </ComboboxContent>
                    </Combobox>
                  </Field>
                )}

                {isLeader && lockedDepartmentId && (
                  <Field>
                    <FieldLabel>Departamento</FieldLabel>
                    <Input
                      value={departments.find(d => d.id === lockedDepartmentId)?.name || ""}
                      disabled
                      className="bg-muted"
                    />
                  </Field>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="title">
                    Nombre del Evento <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Nombre del evento"
                    defaultValue={activity?.title ?? ""}
                    required
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="place">
                    Lugar <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Input
                    id="place"
                    name="place"
                    placeholder="Lugar del evento"
                    defaultValue={activity?.place ?? ""}
                    required
                  />
                </Field>
              </div>
            </div>

            {/* Imagen */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-foreground">Imagen</h3>

              <Field>
                <FieldLabel>Imagen del evento</FieldLabel>
                <input type="hidden" name="img" value={imgUrl} />
                <ImageUpload
                  onFileSelect={(file) => setSelectedFile(file)}
                  onImageUrl={(url) => setImgUrl(url)}
                  defaultImage={activity?.img || ""}
                />
              </Field>
            </div>

            {/* Fecha y horario */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-foreground">
                Fecha y horario
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Field>
                  <FieldLabel>
                    Fecha <span className="text-destructive">*</span>
                  </FieldLabel>
                  <DatePicker
                    value={fecha}
                    onChange={setFecha}
                    placeholder="Seleccionar fecha"
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="horaInicio">
                    Inicio <span className="text-destructive">*</span>
                  </FieldLabel>
                  <TimePicker
                    value={horaInicio}
                    onChange={setHoraInicio}
                    placeholder="Seleccionar hora"
                    name="horaInicio"
                    required
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="horaFin">
                    Fin <span className="text-destructive">*</span>
                  </FieldLabel>
                  <TimePicker
                    value={horaFin}
                    onChange={setHoraFin}
                    placeholder="Seleccionar hora"
                    name="horaFin"
                    required
                  />
                </Field>
              </div>
            </div>

            {/* Descripción */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-foreground">Descripción</h3>

              <Field>
                <FieldLabel htmlFor="description">Descripción del evento</FieldLabel>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe los detalles de la actividad..."
                  defaultValue={activity?.description ?? ""}
                  rows={4}
                />
              </Field>
            </div>

            {/* Opciones */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-foreground">Opciones</h3>

              <div className="flex items-center gap-2">
                <Checkbox
                  id="showCalendar"
                  checked={showCalendar}
                  onCheckedChange={(v) => setShowCalendar(v as boolean)}
                />
                <label
                  htmlFor="showCalendar"
                  className="text-sm text-foreground cursor-pointer"
                >
                  Mostrar en el calendario general
                </label>
              </div>
            </div>
          </FieldGroup>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-6 mt-8 border-t">
            <Button type="submit" disabled={loading} className="gap-2">
              {loading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Save className="size-4" />
              )}
              {isEdit ? "Guardar cambios" : "Crear actividad"}
            </Button>
            <Button type="button" variant="outline" asChild className="gap-2">
              <Link href={redirectTo}>
                <ArrowLeft className="size-4" />
                Cancelar
              </Link>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
