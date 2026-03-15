"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { actualizarPerfil } from "@/actions/perfil-actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { DatePicker } from "@/components/ui/date-picker";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  ArrowLeft,
  Loader2,
  Save,
  User,
  Pencil,
} from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

interface Persona {
  id: number;
  name: string;
  lastname: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  birthDate: Date | string | null;
  hasUser: boolean;
}

interface Props {
  persona: Persona;
  redirectTo: string;
}

export default function PerfilForm({
  persona,
  redirectTo,
}: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [birthDate, setBirthDate] = useState<Date | undefined>(
    persona?.birthDate ? new Date(persona.birthDate as string) : undefined
  );

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

    if (birthDate) {
      formData.set("birthDate", birthDate.toISOString().split("T")[0]);
    } else {
      formData.delete("birthDate");
    }

    const result = await actualizarPerfil(persona.id, formData);

    setLoading(false);

    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success(
        result?.success || "Perfil actualizado correctamente"
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
            <Pencil className="size-6 text-primary-foreground" />
          </div>
          <div>
            <CardTitle className="text-xl">
              Editar Perfil
            </CardTitle>
            <CardDescription className="mt-1">
              Actualiza tu información personal
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <form action={handleSubmit}>
          <FieldGroup className="gap-6">
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
            </div>

            {/* Información de Contacto */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-foreground">Contacto</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                <Field>
                  <FieldLabel>Fecha de Nacimiento</FieldLabel>
                  <DatePicker
                    value={birthDate}
                    onChange={setBirthDate}
                    placeholder="Seleccionar fecha"
                  />
                </Field>
              </div>

              <Field>
                <FieldLabel htmlFor="address">Dirección</FieldLabel>
                <Input
                  id="address"
                  name="address"
                  placeholder="Dirección completa"
                  defaultValue={persona?.address ?? ""}
                />
              </Field>
            </div>

            {/* Cambiar Contraseña */}
            {persona?.hasUser && (
              <div className="space-y-4 pt-4 border-t">
                <h3 className="text-sm font-medium text-foreground">
                  Cambiar contraseña
                </h3>

                <Field>
                  <FieldLabel htmlFor="currentPassword">
                    Contraseña actual
                  </FieldLabel>
                  <Input
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                    placeholder="Ingresa la contraseña actual"
                  />
                </Field>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="newPassword">
                      Nueva contraseña
                    </FieldLabel>
                    <Input
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      placeholder="Mínimo 6 caracteres"
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="confirmPassword">
                      Confirmar contraseña
                    </FieldLabel>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="Repite la nueva contraseña"
                    />
                  </Field>
                </div>
              </div>
            )}
          </FieldGroup>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-6 mt-6 border-t">
            <Button type="submit" disabled={loading} className="gap-2">
              {loading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Save className="size-4" />
              )}
              Guardar cambios
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
