"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Settings, Plus, Users, SlidersHorizontal, AlertCircle, Phone, Mail, Cake, CheckCircle2, XCircle } from "lucide-react";
import { PageLayout } from "@/components/dashboard/PageLayout";
import { ResourceList } from "@/components/dashboard/ResourceList";
import { ListItem } from "@/components/dashboard/ListItem";
import { FloatingActionButton } from "@/components/admin/FloatingActionButton";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import toast from "react-hot-toast";

function MemberModal({ member, isFollowUp }: { member: DeptMember; isFollowUp: boolean }) {
  const age = member.birthDate
    ? Math.floor((Date.now() - new Date(member.birthDate).getTime()) / (365.25 * 24 * 3600 * 1000))
    : null;

  const statusLabel: Record<string, string> = {
    ACTIVE: "Activo",
    VISITOR: "Visitante",
    INACTIVE: "Inactivo",
  };
  const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
    ACTIVE: "default",
    VISITOR: "secondary",
    INACTIVE: "destructive",
  };

  return (
    <div className="space-y-4 pt-1">
      {/* Estado + seguimiento */}
      <div className="flex flex-wrap gap-2">
        {member.membershipStatus && (
          <Badge variant={statusVariant[member.membershipStatus] ?? "secondary"}>
            {statusLabel[member.membershipStatus] ?? member.membershipStatus}
          </Badge>
        )}
        {isFollowUp && (
          <Badge variant="outline" className="border-amber-400 text-amber-600">
            Seguimiento pendiente
          </Badge>
        )}
      </div>

      {/* Contacto */}
      <div className="space-y-2">
        {member.phone ? (
          <a
            href={`tel:${member.phone}`}
            className="flex items-center gap-3 rounded-lg border px-4 py-3 hover:bg-muted transition-colors"
          >
            <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
            <span className="text-sm">{member.phone}</span>
          </a>
        ) : (
          <div className="flex items-center gap-3 rounded-lg border px-4 py-3 opacity-50">
            <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
            <span className="text-sm text-muted-foreground">Sin teléfono</span>
          </div>
        )}
        {member.email ? (
          <a
            href={`mailto:${member.email}`}
            className="flex items-center gap-3 rounded-lg border px-4 py-3 hover:bg-muted transition-colors"
          >
            <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
            <span className="text-sm truncate">{member.email}</span>
          </a>
        ) : (
          <div className="flex items-center gap-3 rounded-lg border px-4 py-3 opacity-50">
            <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
            <span className="text-sm text-muted-foreground">Sin correo</span>
          </div>
        )}
      </div>

      {/* Datos adicionales */}
      <div className="space-y-2 text-sm">
        {age !== null && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Cake className="h-4 w-4 shrink-0" />
            <span>{age} años</span>
          </div>
        )}
        {member.attendsChurch !== null && member.attendsChurch !== undefined && (
          <div className="flex items-center gap-2 text-muted-foreground">
            {member.attendsChurch ? (
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
            ) : (
              <XCircle className="h-4 w-4 shrink-0 text-rose-400" />
            )}
            <span>{member.attendsChurch ? "Asiste a la iglesia" : "No asiste actualmente"}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export interface DeptMember {
  personId: number;
  name: string;
  lastname: string;
  email: string | null;
  phone?: string | null;
  birthDate?: Date | string | null;
  membershipStatus?: string | null;
  attendsChurch?: boolean | null;
}

export interface DeptInfo {
  id: number;
  name: string;
  description: string | null;
  memberCount: number;
  activityCount: number;
}

export interface DepartamentoViewProps {
  dept: DeptInfo;
  members: DeptMember[];

  // Multi-dept tabs
  allDepts?: { id: number; name: string }[];
  activeDeptId?: number;

  // Permissions
  canEdit?: boolean;
  canAddMembers?: boolean;
  canRemoveMembers?: boolean;
  disableAddMember?: boolean;

  // Hrefs
  editHref?: string;
  addMemberHref?: string;

  // Follow-up members (no activity attendance in last 30 days)
  followUpMembers?: DeptMember[];

  // Server action to remove a member
  onRemoveMember?: (personId: number, deptId: number) => Promise<{ error?: string } | void>;
}

export function DepartamentoView({
  dept,
  members,
  followUpMembers,
  allDepts = [],
  activeDeptId,
  canEdit = false,
  canAddMembers = false,
  canRemoveMembers = false,
  disableAddMember = false,
  editHref,
  addMemberHref,
  onRemoveMember,
}: DepartamentoViewProps) {
  const router = useRouter();
  const [filtrosOpen, setFiltrosOpen] = useState(false);
  const [filterFollowUp, setFilterFollowUp] = useState(false);

  const hasDeptFilter = allDepts.length > 1;
  const hasFollowUp = followUpMembers !== undefined && followUpMembers.length > 0;
  const showFilterButton = hasDeptFilter || hasFollowUp;

  const followUpIds = new Set(followUpMembers?.map((m) => m.personId) ?? []);

  // Follow-up members first, then the rest (preserving server-side alphabetical order within each group)
  const sortedMembers = followUpMembers !== undefined
    ? [
        ...members.filter((m) => followUpIds.has(m.personId)),
        ...members.filter((m) => !followUpIds.has(m.personId)),
      ]
    : members;

  const visibleMembers = filterFollowUp
    ? sortedMembers.filter((m) => followUpIds.has(m.personId))
    : sortedMembers;

  return (
    <>
      <PageLayout
        title={dept.name}
        subtitle={dept.description ?? undefined}
        stats={[
          { title: "Miembros", value: dept.memberCount, icon: Users, colorIndex: 0 },
          { title: "Actividades", value: dept.activityCount, icon: Users, colorIndex: 1 },
          ...(followUpMembers !== undefined
            ? [{ title: "Seguimiento", value: followUpMembers.length, icon: AlertCircle, colorIndex: 2 }]
            : []),
        ]}
        statsColumns={followUpMembers !== undefined ? 3 : 2}
        listTitle="Miembros del departamento"
      >
        <ResourceList
          items={visibleMembers.map((m) => ({ ...m, id: m.personId }))}
          emptyMessage={filterFollowUp ? "No hay personas pendientes de seguimiento." : "No hay miembros en este departamento."}
          emptyIconName="Users"
          renderItem={(member) => {
            const isFollowUp = followUpIds.has(member.personId);
            const meta = [
              ...(isFollowUp && member.phone ? [{ text: member.phone }] : []),
              ...(member.email ? [{ text: member.email }] : []),
            ];

            return (
              <ListItem
                key={member.personId}
                avatar={{
                  icon: Users,
                  color: isFollowUp ? "amber" : "blue",
                  shape: "circle",
                }}
                title={`${member.name} ${member.lastname}`}
                meta={meta}
                badges={
                  isFollowUp
                    ? [{ label: "Seguimiento", variant: "outline" }]
                    : undefined
                }
                modalContent={<MemberModal member={member} isFollowUp={isFollowUp} />}
                modalTitle={`${member.name} ${member.lastname}`}
                {...(canRemoveMembers && onRemoveMember
                  ? {
                      deleteTitle: "Quitar del departamento",
                      deleteItemName: `${member.name} ${member.lastname}`,
                      onDelete: async () => {
                        const res = await onRemoveMember(member.personId, dept.id);
                        if (res && "error" in res && res.error) {
                          toast.error(res.error);
                          return res;
                        }
                        toast.success("Persona removida del departamento");
                      },
                    }
                  : {})}
              />
            );
          }}
        />
      </PageLayout>

      {canEdit && editHref && (
        <FloatingActionButton
          href={editHref}
          label={disableAddMember ? "Gestionar departamento" : "Editar departamento"}
          icon={Settings}
          bottomClass={disableAddMember ? "bottom-6" : "bottom-24"}
          size={disableAddMember ? "lg" : "default"}
          variant="secondary"
        />
      )}
      {canAddMembers && addMemberHref && !disableAddMember && (
        <FloatingActionButton href={addMemberHref} label="Agregar persona" icon={Plus} />
      )}

      {showFilterButton && (
        <>
          <button
            onClick={() => setFiltrosOpen(true)}
            className={`fixed z-50 flex items-center justify-center size-14 rounded-full shadow-lg hover:bg-secondary/80 active:scale-95 transition-all ${canEdit ? "bottom-24" : "bottom-6"} right-6 ${filterFollowUp ? "bg-amber-500 text-white" : "bg-secondary text-secondary-foreground"}`}
            aria-label="Filtrar departamento"
          >
            <SlidersHorizontal className="h-5 w-5" />
          </button>

          <Sheet open={filtrosOpen} onOpenChange={setFiltrosOpen}>
            <SheetContent side="right" className="w-full sm:max-w-xs flex flex-col gap-0 p-0">
              <SheetHeader className="px-6 py-5 border-b">
                <SheetTitle>Filtros</SheetTitle>
                <SheetDescription>Ajusta la vista del departamento.</SheetDescription>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
                {hasDeptFilter && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Departamento</Label>
                    <Select
                      value={String(activeDeptId ?? dept.id)}
                      onValueChange={(v) => {
                        router.push(`?dept=${v}`);
                        setFiltrosOpen(false);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {allDepts.map((d) => (
                          <SelectItem key={d.id} value={String(d.id)}>
                            {d.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {followUpMembers !== undefined && (
                  <div className="flex items-center justify-between gap-4">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-medium">Solo seguimiento</Label>
                      <p className="text-xs text-muted-foreground">
                        {followUpMembers.length} persona{followUpMembers.length !== 1 ? "s" : ""} sin asistencia en 30 días
                      </p>
                    </div>
                    <Switch
                      checked={filterFollowUp}
                      onCheckedChange={(checked) => {
                        setFilterFollowUp(checked);
                        setFiltrosOpen(false);
                      }}
                    />
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </>
      )}
    </>
  );
}
