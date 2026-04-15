"use client";

import { useState, useRef } from "react";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { useRouter } from "next/navigation";
import { crearDepartamento, actualizarDepartamento } from "@/actions/departamentos-actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
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
  X,
  Save,
  Megaphone,
  Pencil,
} from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

interface Department {
  id: number;
  name: string;
  description: string | null;
}

interface Church {
  id: number;
  title: string;
}

interface User {
  id: number;
  name: string;
  lastname: string;
  churchId?: number | null;
}

interface Person {
  id: number;
  name: string;
  lastname: string;
  churchId?: number | null;
}

interface Props {
  department?: Department;
  churches: Church[];
  users?: User[];
  persons?: Person[];
  currentLeaderId?: string;
  currentMemberIds?: number[];
  currentChurchId?: number;
  redirectTo: string;
  isEdit?: boolean;
  role?: "ADMIN" | "RESPONSIBLE" | "LEADER";
  showInfoSection?: boolean;
}

export default function DepartmentForm({
  department,
  churches,
  users = [],
  persons = [],
  currentLeaderId,
  currentMemberIds = [],
  currentChurchId,
  redirectTo,
  isEdit = false,
  role = "LEADER",
  showInfoSection = true,
}: Props) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [churchId, setChurchId] = useState<string>(
    currentChurchId
      ? String(currentChurchId)
      : isEdit
        ? ""
        : churches.length > 0
          ? String(churches[0].id)
          : ""
  );
  const [selectedLeaders, setSelectedLeaders] = useState<string[]>(
    currentLeaderId ? currentLeaderId.split(",").filter(Boolean) : []
  );
  const [selectedMembers, setSelectedMembers] = useState<string[]>(
    currentMemberIds.map(String)
  );

  const leadersAnchor = useComboboxAnchor();
  const membersAnchor = useComboboxAnchor();

  const isAdmin = role === "ADMIN";
  const isResponsable = role === "RESPONSIBLE";
  const isLeader = role === "LEADER";
  const canEditInfo = isAdmin || isResponsable || isLeader;
  const canEditLeader = isAdmin || isResponsable;
  const canEditChurch = isAdmin;

  const churchItems = churches.map((c) => c.title);
  const selectedChurch = churches.find((c) => String(c.id) === churchId);

  const filteredPersons = isAdmin && churchId
    ? persons.filter((p) => p.churchId === parseInt(churchId))
    : persons;

  // Leaders and members both use persons (leaders don't need a web account)
  const personItems = filteredPersons.map((p) => `${p.name} ${p.lastname}`);
  const selectedLeaderNames = selectedLeaders
    .map((id) => persons.find((p) => String(p.id) === id))
    .filter(Boolean)
    .map((p) => `${p!.name} ${p!.lastname}`);
  const selectedMemberNames = selectedMembers
    .map((id) => persons.find((p) => String(p.id) === id))
    .filter(Boolean)
    .map((p) => `${p!.name} ${p!.lastname}`);

  const handleSubmit = async (formData: FormData) => {
    if (!formData.get("name")?.toString().trim()) {
      toast.error("El nombre es obligatorio");
      return;
    }

    setLoading(true);

    if (canEditChurch && churchId) {
      formData.set("churchId", churchId);
    }
    if (isResponsable && churches.length > 0) {
      formData.set("churchId", String(churches[0].id));
    }

    formData.delete("leaderPersonIds");
    selectedLeaders.forEach((id) => formData.append("leaderPersonIds", id));

    formData.delete("memberIds");
    selectedMembers.forEach((id) => formData.append("memberIds", id));

    const result = isEdit
      ? await actualizarDepartamento(department!.id, formData)
      : await crearDepartamento(formData);

    setLoading(false);

    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success(
        result?.success ||
          (isEdit ? "Departamento actualizado" : "Departamento creado correctamente")
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
              <Megaphone className="size-6 text-primary-foreground" />
            )}
          </div>
          <div>
            <CardTitle className="text-xl">
              {isEdit ? "Editar Departamento" : "Nuevo Departamento"}
            </CardTitle>
            <CardDescription className="mt-1">
              {isLeader
                ? "Gestiona los miembros del departamento"
                : isEdit
                  ? "Actualiza los detalles del departamento"
                  : "Completa los campos para crear un nuevo departamento"}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <form ref={formRef} action={handleSubmit}>
          <FieldGroup className="gap-6">
            {/* Información básica */}
            {canEditInfo && showInfoSection && (
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-foreground">
                  Información básica
                </h3>

                <Field>
                  <FieldLabel htmlFor="name">
                    Nombre <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Nombre del departamento"
                    defaultValue={department?.name ?? ""}
                    required
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="description">Descripción</FieldLabel>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Descripción del departamento..."
                    defaultValue={department?.description ?? ""}
                    rows={4}
                  />
                </Field>
              </div>
            )}

            {/* Iglesia */}
            {canEditChurch && churches.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-foreground">Iglesia</h3>

                <Field>
                  <FieldLabel>
                    Iglesia <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Combobox
                    value={selectedChurch?.title ?? ""}
                    onValueChange={(value) => {
                      const church = churches.find((c) => c.title === value);
                      setChurchId(church ? String(church.id) : "");
                      setSelectedLeaders([]);
                      setSelectedMembers([]);
                    }}
                    items={churchItems}
                  >
                    <div className="relative flex items-center h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-within:ring-[3px] focus-within:ring-ring/50 focus-within:border-ring">
                      <ComboboxInput
                        placeholder="Seleccionar iglesia..."
                        className={selectedChurch ? "placeholder:text-foreground" : ""}
                      />
                      {churchId && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setChurchId("");
                            setSelectedLeaders([]);
                            setSelectedMembers([]);
                          }}
                          className="mr-1 size-4 rounded-full hover:bg-muted inline-flex items-center justify-center"
                        >
                          <X className="size-3 text-muted-foreground" />
                        </button>
                      )}
                      <ComboboxTrigger className="ml-auto" />
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
              </div>
            )}

            {/* Líder(es) */}
            {canEditLeader && filteredPersons.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-foreground">Líder(es)</h3>

                <Field>
                  <FieldLabel>Seleccionar líder(s)</FieldLabel>
                  <Combobox
                    multiple
                    autoHighlight
                    items={personItems}
                    value={selectedLeaderNames}
                    onValueChange={(values) => {
                      const ids = (values as string[])
                        .map((name) => {
                          const person = persons.find((p) => `${p.name} ${p.lastname}` === name);
                          return person ? String(person.id) : null;
                        })
                        .filter(Boolean) as string[];
                      setSelectedLeaders(ids);
                    }}
                  >
                    <ComboboxChips ref={leadersAnchor} className="min-h-9">
                      <ComboboxValue>
                        {(values) => (
                          <>
                            {(values as string[]).map((value) => (
                              <ComboboxChip key={value}>{value}</ComboboxChip>
                            ))}
                            <ComboboxChipsInput
                              placeholder={
                                selectedLeaderNames.length === 0
                                  ? "Seleccionar líder(s)..."
                                  : "Agregar..."
                              }
                            />
                          </>
                        )}
                      </ComboboxValue>
                    </ComboboxChips>
                    <ComboboxContent anchor={leadersAnchor}>
                      <ComboboxList>
                        {(item) => (
                          <ComboboxItem key={item} value={item}>
                            {item}
                          </ComboboxItem>
                        )}
                      </ComboboxList>
                      <ComboboxEmpty>No se encontraron personas</ComboboxEmpty>
                    </ComboboxContent>
                  </Combobox>
                </Field>
              </div>
            )}

            {/* Miembros */}
            {persons.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-foreground">Miembros</h3>

                <Field>
                  <FieldLabel>Seleccionar miembro(s)</FieldLabel>
                  <Combobox
                    multiple
                    autoHighlight
                    items={personItems}
                    value={selectedMemberNames}
                    onValueChange={(values) => {
                      const ids = (values as string[])
                        .map((name) => {
                          const person = persons.find(
                            (p) => `${p.name} ${p.lastname}` === name
                          );
                          return person ? String(person.id) : null;
                        })
                        .filter(Boolean) as string[];
                      setSelectedMembers(ids);
                    }}
                  >
                    <ComboboxChips ref={membersAnchor} className="min-h-9">
                      <ComboboxValue>
                        {(values) => (
                          <>
                            {(values as string[]).map((value) => (
                              <ComboboxChip key={value}>{value}</ComboboxChip>
                            ))}
                            <ComboboxChipsInput
                              placeholder={
                                selectedMemberNames.length === 0
                                  ? "Seleccionar miembro(s)..."
                                  : "Agregar..."
                              }
                            />
                          </>
                        )}
                      </ComboboxValue>
                    </ComboboxChips>
                    <ComboboxContent anchor={membersAnchor}>
                      <ComboboxList>
                        {(item) => (
                          <ComboboxItem key={item} value={item}>
                            {item}
                          </ComboboxItem>
                        )}
                      </ComboboxList>
                      <ComboboxEmpty>No se encontraron personas</ComboboxEmpty>
                    </ComboboxContent>
                  </Combobox>
                </Field>
              </div>
            )}
          </FieldGroup>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-6 mt-6 border-t">
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
              {isEdit ? "Guardar cambios" : "Crear departamento"}
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

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title={isEdit ? "¿Guardar cambios?" : "¿Crear departamento?"}
        description={
          isEdit
            ? "Los cambios se guardarán y no podrán deshacerse."
            : "Se creará el departamento con los datos introducidos."
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
