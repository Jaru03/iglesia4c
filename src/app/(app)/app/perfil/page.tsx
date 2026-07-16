import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/utils/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Phone,
  MapPin,
  Building2,
  Users,
  CalendarCheck,
  Shield,
  Cake,
  User,
  Activity,
  Pencil,
} from "lucide-react";
import Link from "next/link";
import { AbsenceDialog } from "./components/AbsenceDialog";

export const dynamic = "force-dynamic";

function getInitials(name: string | null | undefined): string {
  if (!name) return "U";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

const roleLabel: Record<string, string> = {
  ADMIN: "Administrador",
  RESPONSIBLE: "Responsable de Iglesia",
  LEADER: "Líder de Departamento",
  USER: "Usuario",
  PASTOR: "Pastor",
  COUNCIL_MEMBER: "Miembro del Consejo",
  CO_LEADER: "Co-líder",
  SERVANT: "Servidor",
  VOLUNTEER: "Voluntario",
};

const roleColors: Record<string, string> = {
  ADMIN: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  RESPONSIBLE: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  LEADER: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
  PASTOR: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  COUNCIL_MEMBER: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  CO_LEADER: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
  SERVANT: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400",
  VOLUNTEER: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400",
  USER: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
};

const membershipLabel: Record<string, string> = {
  VISITOR: "Visitante",
  ACTIVE: "Activo",
  INACTIVE: "Inactivo",
};

const membershipColors: Record<string, string> = {
  VISITOR: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  ACTIVE: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  INACTIVE: "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400",
};

const lifeStageLabel: Record<string, string> = {
  KID: "Niño",
  TEEN: "Adolescente",
  YOUNG: "Joven",
  ADULT: "Adulto",
  SENIOR: "Senior",
};

const deptRoleLabel: Record<string, string> = {
  LEADER: "Líder",
  OBRERO: "Obrero",
  USER: "Miembro",
};

export default async function PerfilPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");

  const { role, name, churchTitle, email, id } = session.user;
  const userId = parseInt(id as string);

  const [person, leaderMemberships] = await Promise.all([
    prisma.person.findFirst({
      where: { user: { id: userId } },
      include: {
        church: { select: { id: true, title: true } },
        departments: {
          where: { active: true },
          include: { department: { select: { id: true, name: true } } },
          orderBy: { joinedAt: "asc" },
        },
        _count: { select: { attendances: true } },
      },
    }),
    prisma.departmentMember.findMany({
      where: { userId, active: true },
      include: { department: { select: { id: true, name: true } } },
    }),
  ]);

  // Merge PersonDepartment + DepartmentMember (leaders), deduplicated by department id
  const personDeptIds = new Set(person?.departments.map((d) => d.department.id) ?? []);
  const allDepartments: { id: number; departmentId: number; department: { id: number; name: string }; roleInDept: string | null }[] = [
    ...(person?.departments.map((d) => ({ ...d, departmentId: d.department.id, roleInDept: d.roleInDept ?? null })) ?? []),
    ...leaderMemberships
      .filter((m) => !personDeptIds.has(m.department.id))
      .map((m) => ({ id: m.id, departmentId: m.department.id, department: m.department, roleInDept: m.roleInDept ?? "LEADER" })),
  ];

  const initials = getInitials(name);
  const memberStatus = person?.membershipStatus ?? "VISITOR";

  // Campos completados para indicador de perfil
  const filledFields = [
    !!name,
    !!email,
    !!person?.phone,
    !!person?.address,
    !!person?.birthDate,
  ].filter(Boolean).length;
  const totalFields = 5;
  const profilePct = Math.round((filledFields / totalFields) * 100);

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-3xl mx-auto p-4 md:p-8 space-y-5">

        {/* ── Hero Card ── */}
        <Card className="overflow-hidden border-0 shadow-sm">
          {/* Gradient banner */}
          <div className="h-28 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent relative">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
          </div>

          <CardContent className="relative pb-6 px-6">
            {/* Avatar */}
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-14">
              <Avatar className="size-24 border-4 border-background shadow-lg ring-2 ring-primary/20">
                <AvatarFallback className="text-2xl font-bold bg-primary text-primary-foreground tracking-wide">
                  {initials}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0 pb-1 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-xl font-semibold tracking-tight leading-tight truncate">
                      {name || "Usuario"}
                    </h1>
                    <p className="text-sm text-muted-foreground truncate">{email}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <AbsenceDialog />
                    <Button asChild variant="outline" size="sm" className="gap-2">
                      <Link href="/app/perfil/editar">
                        <Pencil className="size-4" />
                        Editar
                      </Link>
                    </Button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    className={`${roleColors[role] ?? ""} border-0 text-xs font-medium`}
                    variant="secondary"
                  >
                    <Shield className="mr-1 h-3 w-3" />
                    {roleLabel[role] ?? role}
                  </Badge>
                  {churchTitle && (
                    <Badge variant="outline" className="text-xs font-normal">
                      <Building2 className="mr-1 h-3 w-3" />
                      {churchTitle}
                    </Badge>
                  )}
                  <Badge
                    className={`${membershipColors[memberStatus] ?? ""} border-0 text-xs font-medium`}
                    variant="secondary"
                  >
                    {membershipLabel[memberStatus] ?? memberStatus}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Quick stats strip */}
            <div className="mt-6 grid grid-cols-3 divide-x divide-border rounded-xl border bg-muted/40">
              <QuickStat
                value={person?._count.attendances ?? 0}
                label="Asistencias"
                icon={<CalendarCheck className="h-4 w-4 text-emerald-500" />}
              />
              <QuickStat
                value={allDepartments.length}
                label="Departamentos"
                icon={<Users className="h-4 w-4 text-blue-500" />}
              />
              <QuickStat
                value={`${profilePct}%`}
                label="Perfil completo"
                icon={<Activity className="h-4 w-4 text-violet-500" />}
              />
            </div>
          </CardContent>
        </Card>

        {/* ── Info Personal ── */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2 px-6 pt-5">
            <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              Información personal
            </CardTitle>
          </CardHeader>
          <CardContent className="px-6 pb-5 space-y-1">
            <InfoRow
              icon={<Mail className="h-3.5 w-3.5" />}
              label="Correo"
              value={email}
            />
            <InfoRow
              icon={<Phone className="h-3.5 w-3.5" />}
              label="Teléfono"
              value={person?.phone}
            />
            <InfoRow
              icon={<MapPin className="h-3.5 w-3.5" />}
              label="Dirección"
              value={person?.address}
            />
            {person?.birthDate && (
              <InfoRow
                icon={<Cake className="h-3.5 w-3.5" />}
                label="Fecha de nacimiento"
                value={new Date(person.birthDate).toLocaleDateString("es-ES", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              />
            )}
            {person?.lifeStage && (
              <InfoRow
                icon={<User className="h-3.5 w-3.5" />}
                label="Etapa de vida"
                value={lifeStageLabel[person.lifeStage] ?? person.lifeStage}
              />
            )}
            {person?.church && (
              <InfoRow
                icon={<Building2 className="h-3.5 w-3.5" />}
                label="Sede"
                value={person.church.title}
              />
            )}
          </CardContent>
        </Card>

        {/* ── Departamentos ── */}
        {allDepartments.length > 0 && (
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2 px-6 pt-5">
              <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                Departamentos
                <span className="ml-auto text-xs font-normal text-muted-foreground">
                  {allDepartments.length} {allDepartments.length === 1 ? "ministerio" : "ministerios"}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="px-6 pb-5">
              <div className="space-y-2">
                {allDepartments.map((d, i) => (
                  <div key={d.id}>
                    {i > 0 && <Separator className="my-2" />}
                    <div className="flex items-center justify-between py-1">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center size-8 rounded-full bg-primary/10 shrink-0">
                          <Users className="h-3.5 w-3.5 text-primary" />
                        </div>
                        <span className="text-sm font-medium">{d.department.name}</span>
                      </div>
                      {d.roleInDept && (
                        <Badge variant="secondary" className="text-xs font-normal">
                          {deptRoleLabel[d.roleInDept] ?? d.roleInDept}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

function QuickStat({
  value,
  label,
  icon,
}: {
  value: number | string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-1 py-4 px-2 text-center">
      {icon}
      <p className="text-lg font-bold leading-none">{value}</p>
      <p className="text-[11px] text-muted-foreground leading-tight">{label}</p>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string | null;
}) {
  if (!value) return null;
  return (
    <div className="flex items-center gap-3 py-2.5 group">
      <span className="text-muted-foreground shrink-0">{icon}</span>
      <span className="text-xs text-muted-foreground w-32 shrink-0">{label}</span>
      <span className="text-sm font-medium truncate">{value}</span>
    </div>
  );
}
