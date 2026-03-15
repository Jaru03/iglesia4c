"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { crearPersona, actualizarPersona } from "@/actions/personas-actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import { DatePicker } from "@/components/ui/date-picker";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { ArrowLeft, Loader2, X, Save, UserPlus, Pencil } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

interface Persona {
  id?: number;
  name: string;
  lastname: string;
  email: string | null;
  phone: string | null;
  document: string | null;
  birthDate: Date | null;
  churchId: number | null;
  departments?: { departmentId: number }[];
}

interface Department {
  id: number;
  name: string;
}

interface Church {
  id: number;
  title: string;
}

interface Props {
  persona?: Persona;
  departments: Department[];
  churches: Church[];
  isEdit?: boolean;
  isAtencionPrimaria?: boolean;
}

export default function PersonaForm({
  persona,
  departments,
  churches,
  isEdit = false,
  isAtencionPrimaria = false,
}: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedDepts, setSelectedDepts] = useState<string[]>(
    persona?.departments?.map((d) => String(d.departmentId)) ?? []
  );
  const [churchId, setChurchId] = useState<string>(
    persona?.churchId ? String(persona.churchId) : ""
  );
  const [birthDate, setBirthDate] = useState<Date | undefined>(
    persona?.birthDate ? new Date(persona.birthDate) : undefined
  );

  const deptsAnchor = useComboboxAnchor();

  const selectedChurch = churches.find((c) => String(c.id) === churchId);

  const churchItems = churches.map((c) => c.title);
  const deptItems = departments.map((d) => d.name);
  const selectedDeptNames = selectedDepts
    .map((id) => departments.find((d) => String(d.id) === id)?.name)
    .filter(Boolean) as string[];

  const handleSubmit = async (formData: FormData) => {
    if (!formData.get("name")?.toString().trim()) {
      toast.error("El nombre es obligatorio");
      return;
    }
    if (!formData.get("lastname")?.toString().trim()) {
      toast.error("Los apellidos son obligatorios");
      return;
    }

    setLoading(true);

    if (churchId) {
      formData.set("churchId", churchId);
    }

    if (birthDate) {
      formData.set("birthDate", birthDate.toISOString().split("T")[0]);
    }

    formData.delete("departmentIds");
    selectedDepts.forEach((id) => formData.append("departmentIds", id));

    const result = isEdit
      ? await actualizarPersona(persona!.id!, formData)
      : await crearPersona(formData);

    setLoading(false);

    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success(
        result?.success ||
          (isEdit ? "Persona actualizada" : "Persona creada correctamente")
      );
      router.push("/app/personas");
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
              <UserPlus className="size-6 text-primary-foreground" />
            )}
          </div>
          <div>
            <CardTitle className="text-xl">
              {isEdit ? "Editar Persona" : "Nueva Persona"}
            </CardTitle>
            <CardDescription className="mt-1">
              {isEdit
                ? "Actualiza la información del registro"
                : "Completa los campos para crear un nuevo registro"}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <form action={handleSubmit}>
          <FieldGroup className="gap-8">
            {/* Información Personal */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-foreground">
                Información personal
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="name">
                    Nombre <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Ingresa el nombre"
                    defaultValue={persona?.name ?? ""}
                    required
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="lastname">
                    Apellidos <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Input
                    id="lastname"
                    name="lastname"
                    placeholder="Ingresa los apellidos"
                    defaultValue={persona?.lastname ?? ""}
                    required
                  />
                </Field>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="document">
                    Documento de Identidad
                  </FieldLabel>
                  <Input
                    id="document"
                    name="document"
                    placeholder="DNI, NIE, Pasaporte..."
                    defaultValue={persona?.document ?? ""}
                  />
                </Field>

                <Field>
                  <FieldLabel>Fecha de Nacimiento</FieldLabel>
                  <DatePicker
                    value={birthDate}
                    onChange={setBirthDate}
                    placeholder="Seleccionar fecha"
                  />
                </Field>
              </div>
            </div>

            {/* Información de Contacto */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-foreground">Contacto</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="correo@ejemplo.com"
                    defaultValue={persona?.email ?? ""}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="phone">Teléfono</FieldLabel>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+34 600 000 000"
                    defaultValue={persona?.phone ?? ""}
                  />
                </Field>
              </div>
            </div>

            {/* Asignación */}
            {(churches.length > 0 || (departments.length > 0 && !isAtencionPrimaria)) && (
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-foreground">
                  Asignación
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {churches.length > 0 && (
                    <Field>
                      <FieldLabel>Iglesia</FieldLabel>
                      <Combobox
                        value={selectedChurch?.title ?? ""}
                        onValueChange={(value) => {
                          const church = churches.find((c) => c.title === value);
                          setChurchId(church ? String(church.id) : "");
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
                          {churchId && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setChurchId("");
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

                  {departments.length > 0 && !isAtencionPrimaria && (
                    <Field>
                      <FieldLabel>Departamentos</FieldLabel>
                      <Combobox
                        multiple
                        autoHighlight
                        items={deptItems}
                        value={selectedDeptNames}
                        onValueChange={(values) => {
                          const ids = (values as string[])
                            .map((name) => {
                              const dept = departments.find((d) => d.name === name);
                              return dept ? String(dept.id) : null;
                            })
                            .filter(Boolean) as string[];
                          setSelectedDepts(ids);
                        }}
                      >
                        <ComboboxChips ref={deptsAnchor} className="min-h-9">
                          <ComboboxValue>
                            {(values) => (
                              <>
                                {(values as string[]).map((value) => (
                                  <ComboboxChip key={value}>{value}</ComboboxChip>
                                ))}
                                <ComboboxChipsInput placeholder={selectedDeptNames.length === 0 ? "Seleccionar departamentos..." : "Agregar..."} />
                              </>
                            )}
                          </ComboboxValue>
                        </ComboboxChips>
                        <ComboboxContent anchor={deptsAnchor}>
                          <ComboboxList>
                            {(item) => (
                              <ComboboxItem key={item} value={item}>
                                {item}
                              </ComboboxItem>
                            )}
                          </ComboboxList>
                          <ComboboxEmpty>
                            No hay más departamentos disponibles
                          </ComboboxEmpty>
                        </ComboboxContent>
                      </Combobox>
                    </Field>
                  )}
                </div>
              </div>
            )}
          </FieldGroup>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-6 mt-8 border-t">
            <Button type="submit" disabled={loading} className="gap-2">
              {loading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Save className="size-4" />
              )}
              {isEdit ? "Guardar cambios" : "Crear persona"}
            </Button>
            <Button type="button" variant="outline" asChild className="gap-2">
              <Link href="/app/personas">
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
