"use client";

import { useState, useMemo } from "react";
import { Mail, Phone, FileText, Users, Calendar, Church, MessageSquare, CheckCircle, XCircle, SlidersHorizontal } from "lucide-react";
import { PageLayout } from "@/components/dashboard/PageLayout";
import { ResourceList } from "@/components/dashboard/ResourceList";
import { ListItem } from "@/components/dashboard/ListItem";
import { quitarPersonaDeDepartamento } from "@/actions/lider-actions";
import { eliminarPersona } from "@/actions/personas-actions";
import toast from "react-hot-toast";
import { format } from "date-fns";
import { es } from "date-fns/locale";
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
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface Person {
  id: number;
  name: string;
  lastname: string;
  email: string | null;
  phone: string | null;
  document: string | null;
  membershipStatus: string | null;
  active: boolean;
  isMember?: boolean;
  birthDate: Date | null;
  arrivedAt: Date | null;
  attendsChurch: boolean | null;
  howDidYouMeetUs: string | null;
  authorizedContact: boolean;
  prayerRequest: string | null;
  signature: string | null;
  churchId?: number | null;
  church?: { title: string } | null;
  user?: { id: number; role: string } | null;
  departments?: { departmentId: number }[];
}

interface Miembro {
  id: number;
  roleInDept: string | null;
  person: Person;
}

type Role = "ADMIN" | "RESPONSIBLE" | "LEADER";

interface Props {
  personasData: {
    type: "persons";
    data: Person[];
  } | {
    type: "members";
    data: Miembro[];
  };
  role: Role;
  departmentId?: number;
  departmentName?: string;
  churchId?: number;
  churchName?: string;
  allDepartments?: { id: number; name: string }[];
}

const statusLabel: Record<string, string> = {
  ACTIVE: "Activo",
  VISITOR: "Visitante",
  INACTIVE: "Inactivo",
};

const roleLabel: Record<string, string> = {
  RESPONSIBLE: "Responsable",
  OBRERO: "Obrero",
  LEADER: "Líder",
  USER: "Usuario",
};

type PersonaItem = {
  id: number;
  name: string;
  lastname: string;
  email: string | null;
  phone: string | null;
  document: string | null;
  membershipStatus: string | null;
  isMember?: boolean;
  userRole?: string | null;
  birthDate: Date | null;
  arrivedAt: Date | null;
  attendsChurch: boolean | null;
  howDidYouMeetUs: string | null;
  authorizedContact: boolean;
  prayerRequest: string | null;
  signature: string | null;
  churchId?: number | null;
  churchTitle?: string | null;
  hasUser?: boolean;
  departmentIds?: number[];
};

function PersonaModal({ item }: { item: PersonaItem }) {
  const hasVisitorData =
    item.arrivedAt || item.attendsChurch !== null || item.howDidYouMeetUs ||
    item.prayerRequest || item.signature;

  return (
    <div className="space-y-4 pt-1">
      {/* Contacto */}
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Contacto</p>
        <div className="grid grid-cols-1 gap-2">
          {item.email && (
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
              <a
                href={`mailto:${item.email}`}
                className="text-primary underline underline-offset-2 hover:opacity-75 transition-opacity"
              >
                {item.email}
              </a>
            </div>
          )}
          {item.phone && (
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
              <a
                href={`https://wa.me/${item.phone.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-2 hover:opacity-75 transition-opacity"
              >
                {item.phone}
              </a>
            </div>
          )}
          {item.document && (
            <div className="flex items-center gap-2 text-sm">
              <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
              <span>{item.document}</span>
            </div>
          )}
          {item.birthDate && (
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
              <span>{format(new Date(item.birthDate), "d 'de' MMMM 'de' yyyy", { locale: es })}</span>
            </div>
          )}
          {!item.email && !item.phone && !item.document && !item.birthDate && (
            <p className="text-sm text-muted-foreground">Sin datos de contacto</p>
          )}
        </div>
      </div>

      {/* Datos de visita */}
      {hasVisitorData && (
        <div className="space-y-2 border-t pt-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Registro de visita</p>
          <div className="grid grid-cols-1 gap-2">
            {item.arrivedAt && (
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
                <span>Llegó el {format(new Date(item.arrivedAt), "d 'de' MMMM 'de' yyyy", { locale: es })}</span>
              </div>
            )}
            {item.attendsChurch !== null && (
              <div className="flex items-center gap-2 text-sm">
                <Church className="h-4 w-4 text-muted-foreground shrink-0" />
                <span>Asiste a otra iglesia: {item.attendsChurch ? "Sí" : "No"}</span>
              </div>
            )}
            {item.howDidYouMeetUs && (
              <div className="flex items-center gap-2 text-sm">
                <Users className="h-4 w-4 text-muted-foreground shrink-0" />
                <span>Nos conoció por: {item.howDidYouMeetUs}</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-sm">
              {item.authorizedContact ? (
                <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
              ) : (
                <XCircle className="h-4 w-4 text-muted-foreground shrink-0" />
              )}
              <span>Autoriza contacto: {item.authorizedContact ? "Sí" : "No"}</span>
            </div>
            {item.prayerRequest && (
              <div className="flex items-start gap-2 text-sm">
                <MessageSquare className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                <span>{item.prayerRequest}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Firma */}
      {item.signature && (
        <div className="space-y-2 border-t pt-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Firma</p>
          <img
            src={item.signature}
            alt="Firma del visitante"
            className="rounded-lg border bg-white w-full max-h-40 object-contain"
          />
        </div>
      )}
    </div>
  );
}

export function PersonasClient({
  personasData,
  role,
  departmentId,
  departmentName,
  churchId,
  churchName,
  allDepartments = [],
}: Props) {
  const isLeader = role === "LEADER";
  const isAdmin = role === "ADMIN";
  const isResponsable = role === "RESPONSIBLE";
  const canEdit = isAdmin || isResponsable;
  const canDelete = isAdmin || isResponsable;

  const [filtrosOpen, setFiltrosOpen] = useState(false);
  const [filtros, setFiltros] = useState<{
    membershipStatus: string | null;
    churchId: number | null;
    userRole: string | null;
    filterDepartmentId: number | null;
    soloMiembros: boolean;
    soloEnWeb: boolean;
  }>({ membershipStatus: null, churchId: null, userRole: null, filterDepartmentId: null, soloMiembros: false, soloEnWeb: false });

  const subtitle = departmentName || churchName || (isAdmin ? "Todas las personas" : "Personas");

  const allItems: PersonaItem[] = personasData.type === "members"
    ? personasData.data.map((m) => ({
        id: m.person.id,
        name: m.person.name,
        lastname: m.person.lastname,
        email: m.person.email,
        phone: m.person.phone,
        document: m.person.document,
        membershipStatus: m.person.membershipStatus,
        isMember: m.person.isMember,
        userRole: m.person.user?.role ?? null,
        birthDate: m.person.birthDate,
        arrivedAt: m.person.arrivedAt,
        attendsChurch: m.person.attendsChurch,
        howDidYouMeetUs: m.person.howDidYouMeetUs,
        authorizedContact: m.person.authorizedContact,
        prayerRequest: m.person.prayerRequest,
        signature: m.person.signature,
        churchId: m.person.churchId,
        churchTitle: m.person.church?.title,
        hasUser: !!m.person.user,
        departmentIds: m.person.departments?.map((d) => d.departmentId) ?? [],
      }))
    : personasData.data.map((p) => ({
        id: p.id,
        name: p.name,
        lastname: p.lastname,
        email: p.email,
        phone: p.phone,
        document: p.document,
        membershipStatus: p.membershipStatus,
        isMember: p.isMember,
        userRole: p.user?.role ?? null,
        birthDate: p.birthDate,
        arrivedAt: p.arrivedAt,
        attendsChurch: p.attendsChurch,
        howDidYouMeetUs: p.howDidYouMeetUs,
        authorizedContact: p.authorizedContact,
        prayerRequest: p.prayerRequest,
        signature: p.signature,
        churchId: p.churchId,
        churchTitle: p.church?.title,
        hasUser: !!p.user,
        departmentIds: p.departments?.map((d) => d.departmentId) ?? [],
      }));

  const churches = useMemo(() => {
    if (!isAdmin) return [];
    const seen = new Set<number>();
    const result: { id: number; title: string }[] = [];
    for (const item of allItems) {
      if (item.churchId && item.churchTitle && !seen.has(item.churchId)) {
        seen.add(item.churchId);
        result.push({ id: item.churchId, title: item.churchTitle });
      }
    }
    return result.sort((a, b) => a.title.localeCompare(b.title));
  }, [allItems, isAdmin]);

  const items = useMemo(() => {
    let result = allItems;
    if (filtros.membershipStatus) result = result.filter((i) => i.membershipStatus === filtros.membershipStatus);
    if (filtros.churchId) result = result.filter((i) => i.churchId === filtros.churchId);
    if (filtros.userRole) result = result.filter((i) => i.userRole === filtros.userRole);
    if (filtros.filterDepartmentId) result = result.filter((i) => i.departmentIds?.includes(filtros.filterDepartmentId!));
    if (filtros.soloMiembros) result = result.filter((i) => i.isMember);
    if (filtros.soloEnWeb) result = result.filter((i) => i.hasUser);
    return result;
  }, [allItems, filtros]);

  const totalMiembros = allItems.filter(i => i.membershipStatus === "ACTIVE").length;
  const totalVisitantes = allItems.filter(i => i.membershipStatus === "VISITOR").length;
  const totalLideres = allItems.filter(i => i.userRole === "LEADER").length;

  const hasFab = isAdmin || isResponsable || (isLeader && !!departmentId);
  const fabBottomClass = hasFab ? "bottom-24" : "bottom-6";
  const filtroCount = [filtros.membershipStatus, filtros.churchId, filtros.userRole, filtros.filterDepartmentId, filtros.soloMiembros, filtros.soloEnWeb].filter(Boolean).length;
  const hasActiveFiltro = filtroCount > 0;

  const handleDelete = async (item: PersonaItem) => {
    const name = `${item.name} ${item.lastname}`;

    if (isLeader && departmentId) {
      const formData = new FormData();
      formData.append("departmentId", departmentId.toString());
      formData.append("personId", item.id.toString());
      await quitarPersonaDeDepartamento(formData);
      toast.success(`${name} eliminado del departamento`);
    } else if (canDelete) {
      const formData = new FormData();
      formData.append("id", item.id.toString());
      await eliminarPersona(formData);
      toast.success(`${name} eliminado`);
    }
  };

  return (
    <>
      <PageLayout
        title="Personas"
        subtitle={subtitle}
        statsColumns={4}
        stats={[
          { title: "Total personas", value: allItems.length, icon: Users, colorIndex: 0 },
          { title: "Miembros", value: totalMiembros, icon: Users, colorIndex: 1 },
          { title: "Visitantes", value: totalVisitantes, icon: Users, colorIndex: 2 },
          { title: "Líderes", value: totalLideres, icon: Users, colorIndex: 3 },
        ]}
        listTitle={isLeader ? "Miembros del departamento" : "Personas"}
        fab={
          (isAdmin || isResponsable)
            ? { href: "/app/personas/crear", label: "Nueva persona" }
            : isLeader && departmentId
              ? { href: "/app/personas/agregar", label: "Agregar persona" }
              : undefined
        }
      >
        <ResourceList
          items={items}
          emptyMessage={isLeader ? "No hay personas en este departamento." : "No hay personas."}
          emptyIconName="Users"
          renderItem={(item) => (
            <ListItem
              avatar={{ icon: Users, color: "blue", shape: "circle" }}
              title={`${item.name} ${item.lastname}`}
              meta={item.email ? [{ text: item.email }] : []}
              badges={[
                ...(item.membershipStatus
                  ? [{ label: statusLabel[item.membershipStatus] ?? item.membershipStatus, variant: "outline" as const }]
                  : []),
                ...(item.userRole && roleLabel[item.userRole]
                  ? [{ label: roleLabel[item.userRole], variant: "secondary" as const }]
                  : []),
              ]}
              modalContent={<PersonaModal item={item} />}
              modalTitle={`${item.name} ${item.lastname}`}
              {...(canDelete && {
                onDelete: () => handleDelete(item),
                deleteTitle: isLeader ? "Quitar del departamento" : "Eliminar persona",
                deleteItemName: `${item.name} ${item.lastname}`,
              })}
              {...(canEdit && {
                editHref: `/app/personas/editar?id=${item.id}`,
              })}
            />
          )}
        />
      </PageLayout>

      {/* Filter FAB */}
      <button
        onClick={() => setFiltrosOpen(true)}
        className={`fixed ${fabBottomClass} right-6 z-50 flex items-center justify-center size-14 rounded-full bg-secondary text-secondary-foreground shadow-lg hover:bg-secondary/80 active:scale-95 transition-all`}
        aria-label="Filtros"
      >
        <SlidersHorizontal className="h-5 w-5" />
        {hasActiveFiltro && (
          <span className="absolute top-1 right-1 h-3 w-3 rounded-full bg-primary border-2 border-background" />
        )}
      </button>

      {/* Filter Drawer */}
      <Sheet open={filtrosOpen} onOpenChange={setFiltrosOpen}>
        <SheetContent side="right" className="w-full sm:max-w-xs flex flex-col gap-0 p-0">
          <SheetHeader className="px-6 py-5 border-b">
            <SheetTitle className="flex items-center gap-2">
              Filtros
              {filtroCount > 0 && (
                <span className="inline-flex items-center justify-center h-5 min-w-5 px-1.5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold">
                  {filtroCount}
                </span>
              )}
            </SheetTitle>
            <SheetDescription>Ajusta qué personas se muestran.</SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
            {/* Estado */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Estado</Label>
              <Select
                value={filtros.membershipStatus ?? "all"}
                onValueChange={(v) =>
                  setFiltros((f) => ({ ...f, membershipStatus: v === "all" ? null : v }))
                }
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="ACTIVE">Activo</SelectItem>
                  <SelectItem value="VISITOR">Visitante</SelectItem>
                  <SelectItem value="INACTIVE">Inactivo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Iglesia — solo ADMIN con múltiples iglesias */}
            {isAdmin && churches.length > 1 && (
              <div className="space-y-2">
                <Label className="text-sm font-medium">Iglesia</Label>
                <Select
                  value={filtros.churchId ? String(filtros.churchId) : "all"}
                  onValueChange={(v) =>
                    setFiltros((f) => ({ ...f, churchId: v === "all" ? null : Number(v) }))
                  }
                >
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las iglesias</SelectItem>
                    {churches.map((c) => (
                      <SelectItem key={c.id} value={String(c.id)}>{c.title}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Departamento */}
            {allDepartments.length > 0 && (
              <div className="space-y-2">
                <Label className="text-sm font-medium">Departamento</Label>
                <Select
                  value={filtros.filterDepartmentId ? String(filtros.filterDepartmentId) : "all"}
                  onValueChange={(v) =>
                    setFiltros((f) => ({ ...f, filterDepartmentId: v === "all" ? null : Number(v) }))
                  }
                >
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los departamentos</SelectItem>
                    {allDepartments.map((d) => (
                      <SelectItem key={d.id} value={String(d.id)}>{d.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Rol */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Rol</Label>
              <Select
                value={filtros.userRole ?? "all"}
                onValueChange={(v) =>
                  setFiltros((f) => ({ ...f, userRole: v === "all" ? null : v }))
                }
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  {Object.entries(roleLabel).map(([value, label]) => (
                    <SelectItem key={value} value={value}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Checkboxes al final */}
            <div className="space-y-3 pt-2 border-t">
              <label className="flex items-center gap-3 cursor-pointer">
                <Checkbox
                  checked={filtros.soloMiembros}
                  onCheckedChange={(v) => setFiltros((f) => ({ ...f, soloMiembros: !!v }))}
                />
                <span className="text-sm font-medium">Con membresía</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <Checkbox
                  checked={filtros.soloEnWeb}
                  onCheckedChange={(v) => setFiltros((f) => ({ ...f, soloEnWeb: !!v }))}
                />
                <span className="text-sm font-medium">Registrados en la web</span>
              </label>
            </div>
          </div>

          {hasActiveFiltro && (
            <div className="px-6 py-4 border-t">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setFiltros({ membershipStatus: null, churchId: null, userRole: null, filterDepartmentId: null, soloMiembros: false, soloEnWeb: false })}
              >
                Limpiar filtros
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
