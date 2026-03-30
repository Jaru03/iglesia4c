"use client";

import { useRef, useState } from "react";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { useRouter } from "next/navigation";
import { crearPersona, actualizarPersona } from "@/actions/personas-actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import ReactSignature, { type SignatureRef } from "@uiw/react-signature";
import { uploadSignatureToSupabase } from "@/lib/upload";

function svgToPngBase64(svgEl: SVGSVGElement): Promise<string> {
  return new Promise((resolve, reject) => {
    const width = svgEl.clientWidth || 600;
    const height = svgEl.clientHeight || 160;
    const svgData = new XMLSerializer().serializeToString(svgEl);
    const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d")!;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/png").split(",")[1]); // solo base64
    };
    img.onerror = reject;
    img.src = url;
  });
}

const MEMBERSHIP_STATUS_OPTIONS = [
  { value: "VISITOR", label: "Visitante" },
  { value: "ACTIVE", label: "Activo" },
  { value: "INACTIVE", label: "Inactivo" },
];

interface Persona {
  id?: number;
  name: string;
  lastname: string;
  email: string | null;
  phone: string | null;
  document: string | null;
  birthDate: Date | null;
  churchId: number | null;
  isMember?: boolean;
  membershipStatus?: string;
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
  defaultChurchId?: number | null;
}

export default function PersonaForm({
  persona,
  departments,
  churches,
  isEdit = false,
  isAtencionPrimaria = false,
  defaultChurchId,
}: Props) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedDepts, setSelectedDepts] = useState<string[]>(
    persona?.departments?.map((d) => String(d.departmentId)) ?? []
  );
  const [churchId, setChurchId] = useState<string>(
    persona?.churchId ? String(persona.churchId) : defaultChurchId ? String(defaultChurchId) : ""
  );
  const [birthDate, setBirthDate] = useState<Date | undefined>(
    persona?.birthDate ? new Date(persona.birthDate) : undefined
  );
  const [membershipStatus, setMembershipStatus] = useState<string>(
    persona?.membershipStatus ?? "VISITOR"
  );
  const [isMember, setIsMember] = useState<boolean>(
    persona?.isMember ?? false
  );

  // Campos de visitante (solo Atención Primaria)
  const [arrivedAt, setArrivedAt] = useState<Date | undefined>(new Date());
  const [attendsChurch, setAttendsChurch] = useState<"true" | "false" | "">("");
  const [authorizedContact, setAuthorizedContact] = useState(false);
  const signatureRef = useRef<SignatureRef>(null);

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
      const y = birthDate.getFullYear();
      const m = String(birthDate.getMonth() + 1).padStart(2, "0");
      const d = String(birthDate.getDate()).padStart(2, "0");
      formData.set("birthDate", `${y}-${m}-${d}`);
    }

    formData.set("membershipStatus", membershipStatus);
    formData.set("isMember", String(isMember));

    formData.delete("departmentIds");
    selectedDepts.forEach((id) => formData.append("departmentIds", id));

    if (isAtencionPrimaria) {
      if (arrivedAt) {
        const y = arrivedAt.getFullYear();
        const m = String(arrivedAt.getMonth() + 1).padStart(2, "0");
        const d = String(arrivedAt.getDate()).padStart(2, "0");
        formData.set("arrivedAt", `${y}-${m}-${d}T12:00:00`);
      }
      if (attendsChurch) formData.set("attendsChurch", attendsChurch);
      formData.set("authorizedContact", String(authorizedContact));

      // Subir firma a Supabase como PNG
      if (signatureRef.current?.svg) {
        try {
          const pngBase64 = await svgToPngBase64(signatureRef.current.svg);
          const name = (formData.get("name") as string ?? "").trim();
          const lastname = (formData.get("lastname") as string ?? "").trim();
          const url = await uploadSignatureToSupabase(pngBase64, name, lastname);
          formData.set("signature", url);
        } catch {
          toast.error("Error al subir la firma");
          setLoading(false);
          return;
        }
      }
    }

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
        <form ref={formRef} action={handleSubmit}>
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

            {/* Rol y membresía */}
            {!isAtencionPrimaria && (
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-foreground">Estatus y membresía</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                  <Field>
                    <FieldLabel>Estatus</FieldLabel>
                    <Select value={membershipStatus} onValueChange={setMembershipStatus}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar rol..." />
                      </SelectTrigger>
                      <SelectContent>
                        {MEMBERSHIP_STATUS_OPTIONS.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                  <div className="flex items-center gap-3 pb-1">
                    <Checkbox
                      id="isMember"
                      checked={isMember}
                      onCheckedChange={(v) => setIsMember(v === true)}
                    />
                    <Label htmlFor="isMember" className="cursor-pointer text-sm">
                      Es miembro
                    </Label>
                  </div>
                </div>
              </div>
            )}

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

          {/* Campos de visitante — solo Atención Primaria */}
          {isAtencionPrimaria && (
            <div className="space-y-4 pt-4">
              <h3 className="text-sm font-medium text-foreground">Registro de visita</h3>

              {/* ¿Asiste a una iglesia? */}
              <Field>
                <FieldLabel>¿Asiste actualmente a una iglesia?</FieldLabel>
                <div className="flex gap-6 mt-1">
                  {[{ label: "Sí", value: "true" }, { label: "No", value: "false" }].map(({ label, value }) => (
                    <label key={value} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="attendsChurch"
                        value={value}
                        checked={attendsChurch === value}
                        onChange={() => setAttendsChurch(value as "true" | "false")}
                        className="accent-primary"
                      />
                      <span className="text-sm">{label}</span>
                    </label>
                  ))}
                </div>
              </Field>

              {/* Cómo nos conociste */}
              <Field>
                <FieldLabel htmlFor="howDidYouMeetUs">¿Cómo nos conociste?</FieldLabel>
                <Input
                  id="howDidYouMeetUs"
                  name="howDidYouMeetUs"
                  placeholder="Ej: redes sociales, un amigo..."
                />
              </Field>

              {/* Motivo de oración */}
              <Field>
                <FieldLabel htmlFor="prayerRequest">Motivo de oración (opcional)</FieldLabel>
                <Textarea
                  id="prayerRequest"
                  name="prayerRequest"
                  placeholder="Comparte tu petición de oración..."
                  rows={3}
                />
              </Field>

              {/* Autorización de contacto */}
              <div className="flex items-center gap-3">
                <Checkbox
                  id="authorizedContact"
                  checked={authorizedContact}
                  onCheckedChange={(v) => setAuthorizedContact(v === true)}
                />
                <Label htmlFor="authorizedContact" className="cursor-pointer text-sm">
                  Nos autorizas a contactar contigo
                </Label>
              </div>

              {/* Firma */}
              <Field>
                <FieldLabel>Firma del visitante</FieldLabel>
                <div className="rounded-lg border bg-white overflow-hidden">
                  <ReactSignature
                    ref={signatureRef}
                    style={{ width: "100%", height: 160 }}
                    strokeWidth={3}
                  />
                </div>
                <button
                  type="button"
                  className="mt-1 text-xs text-muted-foreground underline"
                  onClick={() => signatureRef.current?.clear()}
                >
                  Limpiar firma
                </button>
              </Field>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-3 pt-6 mt-8 border-t">
            <Button
              type="button"
              disabled={loading}
              className="gap-2"
              onClick={() => setConfirmOpen(true)}
            >
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

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title={isEdit ? "¿Guardar cambios?" : "¿Crear persona?"}
        description={
          isEdit
            ? "Los cambios se guardarán y no podrán deshacerse."
            : "Se creará el registro con los datos introducidos."
        }
        confirmLabel={isEdit ? "Guardar" : "Crear"}
        onConfirm={() => {
          setConfirmOpen(false);
          formRef.current?.requestSubmit();
        }}
      />
    </Card>
  );
}
