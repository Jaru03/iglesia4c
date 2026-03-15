"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { crearIglesia, actualizarIglesia } from "@/actions/iglesias-actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { TimePicker } from "@/components/ui/time-picker";
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
  ComboboxChips,
  ComboboxChip,
  ComboboxChipsInput,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  ArrowLeft,
  Loader2,
  Save,
  Church,
  Pencil,
} from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

interface Church {
  id?: number;
  title: string;
  description: string | null;
  place: string;
  latitude: number;
  longitude: number;
  active?: boolean;
}

interface User {
  id: number;
  name: string;
  lastname: string;
}

interface Schedule {
  id?: number;
  day: string;
  time: string;
}

interface Props {
  church?: Church;
  users?: User[];
  currentResponsableIds?: number[];
  currentSchedules?: Schedule[];
  redirectTo: string;
  isEdit?: boolean;
  role?: "ADMIN" | "RESPONSIBLE";
}

const DAYS_OF_WEEK = [
  { value: "LUNES", label: "Lunes" },
  { value: "MARTES", label: "Martes" },
  { value: "MIERCOLES", label: "Miércoles" },
  { value: "JUEVES", label: "Jueves" },
  { value: "VIERNES", label: "Viernes" },
  { value: "SABADO", label: "Sábado" },
  { value: "DOMINGO", label: "Domingo" },
];

export default function ChurchForm({
  church,
  users = [],
  currentResponsableIds = [],
  currentSchedules = [],
  redirectTo,
  isEdit = false,
  role = "ADMIN",
}: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedResponsables, setSelectedResponsables] = useState<string[]>(
    currentResponsableIds.map(String)
  );
  const [schedules, setSchedules] = useState<Schedule[]>(
    currentSchedules.length > 0
      ? currentSchedules
      : [{ day: "DOMINGO", time: "11:00" }]
  );
  const [active, setActive] = useState(church?.active ?? true);

  const responsiblesAnchor = useComboboxAnchor();

  const canEditResponsables = role === "ADMIN";
  const isAdmin = role === "ADMIN";

  const userItems = users.map((u) => `${u.name} ${u.lastname}`);

  const selectedResponsableNames = selectedResponsables
    .map((id) => users.find((u) => String(u.id) === id))
    .filter(Boolean)
    .map((u) => `${u!.name} ${u!.lastname}`);

  const addSchedule = () => {
    setSchedules([...schedules, { day: "LUNES", time: "09:00" }]);
  };

  const removeSchedule = (index: number) => {
    setSchedules(schedules.filter((_, i) => i !== index));
  };

  const updateScheduleDay = (index: number, day: string) => {
    const newSchedules = [...schedules];
    newSchedules[index] = { ...newSchedules[index], day };
    setSchedules(newSchedules);
  };

  const updateScheduleTime = (index: number, time: string) => {
    const newSchedules = [...schedules];
    newSchedules[index] = { ...newSchedules[index], time };
    setSchedules(newSchedules);
  };

  const handleSubmit = async (formData: FormData) => {
    if (!formData.get("title")?.toString().trim()) {
      toast.error("El nombre es obligatorio");
      return;
    }
    if (!formData.get("place")?.toString().trim()) {
      toast.error("La ubicación es obligatoria");
      return;
    }

    setLoading(true);

    formData.delete("responsableIds");
    selectedResponsables.forEach((id) => formData.append("responsableIds", id));

    formData.delete("schedules");
    schedules.forEach((s) => formData.append("schedules", `${s.day}|${s.time}`));

    formData.set("active", active ? "on" : "off");

    const result = isEdit
      ? await actualizarIglesia(church!.id!, formData)
      : await crearIglesia(formData);

    setLoading(false);

    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success(
        result?.success ||
          (isEdit ? "Iglesia actualizada" : "Iglesia creada correctamente")
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
              <Church className="size-6 text-primary-foreground" />
            )}
          </div>
          <div>
            <CardTitle className="text-xl">
              {isAdmin ? (isEdit ? "Editar Iglesia" : "Nueva Iglesia") : "Mi Iglesia"}
            </CardTitle>
            <CardDescription className="mt-1">
              {isAdmin
                ? isEdit
                  ? "Actualiza los detalles de la iglesia"
                  : "Completa los campos para crear una nueva iglesia"
                : "Gestiona la información de tu iglesia"}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <form action={handleSubmit}>
          <FieldGroup className="gap-6">
            {/* Información básica */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-foreground">
                Información básica
              </h3>

              <Field>
                <FieldLabel htmlFor="title">
                  Nombre <span className="text-destructive">*</span>
                </FieldLabel>
                <Input
                  id="title"
                  name="title"
                  placeholder="Nombre de la iglesia"
                  defaultValue={church?.title ?? ""}
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="place">
                  Ubicación <span className="text-destructive">*</span>
                </FieldLabel>
                <Input
                  id="place"
                  name="place"
                  placeholder="Dirección de la iglesia"
                  defaultValue={church?.place ?? ""}
                  required
                />
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="latitude">Latitud</FieldLabel>
                  <Input
                    id="latitude"
                    name="latitude"
                    type="number"
                    step="any"
                    placeholder="40.416775"
                    defaultValue={church?.latitude ?? 0}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="longitude">Longitud</FieldLabel>
                  <Input
                    id="longitude"
                    name="longitude"
                    type="number"
                    step="any"
                    placeholder="-3.703790"
                    defaultValue={church?.longitude ?? 0}
                  />
                </Field>
              </div>

              <Field>
                <FieldLabel htmlFor="description">Descripción</FieldLabel>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Descripción de la iglesia..."
                  defaultValue={church?.description ?? ""}
                  rows={4}
                />
              </Field>

              {isEdit && isAdmin && (
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="active"
                    checked={active}
                    onCheckedChange={(checked) => setActive(checked as boolean)}
                    className="w-4 h-4"
                  />
                  <label htmlFor="active" className="text-sm cursor-pointer">
                    Iglesia activa
                  </label>
                </div>
              )}
            </div>

            {/* Responsables */}
            {canEditResponsables && users.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-foreground">Responsables</h3>

                <Field>
                  <FieldLabel>Seleccionar responsable(s)</FieldLabel>
                  <Combobox
                    multiple
                    autoHighlight
                    items={userItems}
                    value={selectedResponsableNames}
                    onValueChange={(values) => {
                      const ids = (values as string[])
                        .map((name) => {
                          const user = users.find(
                            (u) => `${u.name} ${u.lastname}` === name
                          );
                          return user ? String(user.id) : null;
                        })
                        .filter(Boolean) as string[];
                      setSelectedResponsables(ids);
                    }}
                  >
                    <ComboboxChips ref={responsiblesAnchor} className="min-h-9">
                      <ComboboxValue>
                        {(values) => (
                          <>
                            {(values as string[]).map((value) => (
                              <ComboboxChip key={value}>{value}</ComboboxChip>
                            ))}
                            <ComboboxChipsInput
                              placeholder={
                                selectedResponsableNames.length === 0
                                  ? "Seleccionar responsable(s)..."
                                  : "Agregar..."
                              }
                            />
                          </>
                        )}
                      </ComboboxValue>
                    </ComboboxChips>
                    <ComboboxContent anchor={responsiblesAnchor}>
                      <ComboboxList>
                        {(item) => (
                          <ComboboxItem key={item} value={item}>
                            {item}
                          </ComboboxItem>
                        )}
                      </ComboboxList>
                      <ComboboxEmpty>No se encontraron usuarios</ComboboxEmpty>
                    </ComboboxContent>
                  </Combobox>
                </Field>
              </div>
            )}

            {/* Horarios */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-foreground">Horarios</h3>

              <div className="space-y-2">
                {schedules.map((schedule, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <select
                      value={schedule.day}
                      onChange={(e) => updateScheduleDay(index, e.target.value)}
                      className="flex-1 h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm"
                    >
                      {DAYS_OF_WEEK.map((day) => (
                        <option key={day.value} value={day.value}>
                          {day.label}
                        </option>
                      ))}
                    </select>
                    <TimePicker
                      value={schedule.time}
                      onChange={(time) => updateScheduleTime(index, time)}
                      className="w-32"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeSchedule(index)}
                      className="text-destructive hover:text-destructive"
                      disabled={schedules.length === 1}
                    >
                      ×
                    </Button>
                  </div>
                ))}
              </div>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addSchedule}
              >
                + Añadir horario
              </Button>
            </div>
          </FieldGroup>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-6 mt-6 border-t">
            <Button type="submit" disabled={loading} className="gap-2">
              {loading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Save className="size-4" />
              )}
              {isEdit ? "Guardar cambios" : "Crear iglesia"}
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
