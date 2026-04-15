import type { LucideIcon } from "lucide-react";
import {
  Calendar,
  CalendarCheck,
  Church,
  ClipboardCheck,
  Home,
  Megaphone,
  MessageSquare,
  User,
  UserCircle,
  UserPlus,
} from "lucide-react";

type Role = "ADMIN" | "USER" | "RESPONSIBLE" | "LEADER" | "OBRERO";

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  exact?: boolean;
  roles: Role[];
  badge?: number;
};

export type NavSection = {
  title?: string;
  items: NavItem[];
};

export const dashboardNav: NavItem[] = [
  { href: "/app/dashboard", label: "Dashboard", icon: Home, exact: true, roles: ["ADMIN", "RESPONSIBLE", "LEADER", "OBRERO", "USER"] },

  // Admin only
  { href: "/app/iglesias", label: "Iglesias", icon: Church, roles: ["ADMIN"] },

  // Admin, Responsable & Leader
  { href: "/app/departamentos", label: "Departamentos", icon: Megaphone, roles: ["ADMIN", "RESPONSIBLE", "LEADER"] },
  { href: "/app/personas", label: "Personas", icon: UserCircle, roles: ["ADMIN", "RESPONSIBLE"] },
  { href: "/app/actividades", label: "Actividades", icon: Calendar, roles: ["ADMIN", "RESPONSIBLE", "LEADER"] },
  { href: "/app/cultos", label: "Cultos", icon: Church, roles: ["ADMIN", "RESPONSIBLE"] },
  { href: "/app/calendario-equipo", label: "Calendario Equipo", icon: CalendarCheck, roles: ["ADMIN", "LEADER"] },
  { href: "/app/asistencias", label: "Asistencias", icon: ClipboardCheck, roles: ["ADMIN", "RESPONSIBLE", "LEADER", "OBRERO", "USER"] },

  // Admin & Responsable
  { href: "/app/peticiones", label: "Peticiones", icon: MessageSquare, roles: ["ADMIN", "RESPONSIBLE"] },

  // Responsable only
  { href: "/app/iglesia", label: "Mi Iglesia", icon: Church, roles: ["RESPONSIBLE"] },
  { href: "/app/agenda", label: "Mi Agenda", icon: CalendarCheck, roles: ["RESPONSIBLE"] },

  // Todos los usuarios autenticados
  { href: "/app/citas", label: "Citas", icon: CalendarCheck, roles: ["ADMIN", "LEADER", "OBRERO", "USER"] },
  { href: "/app/mi-disponibilidad", label: "Mi Disponibilidad", icon: CalendarCheck, roles: ["LEADER", "RESPONSIBLE", "USER", "OBRERO"] },

  // Atención Primaria only
  { href: "/app/personas/nuevo", label: "Añadir Persona", icon: UserPlus, roles: [] },

  // All users
  { href: "/app/perfil", label: "Mi Perfil", icon: User, roles: ["ADMIN", "RESPONSIBLE", "LEADER", "OBRERO", "USER"] },
];

export function getNavForRole(role: Role | string, isAtencionPrimaria?: boolean): NavItem[] {
  const userRole = role as Role;
  let items = dashboardNav.filter(item => item.roles.includes(userRole));

  if (isAtencionPrimaria) {
    const addPersonItem = dashboardNav.find(item => item.href === "/app/personas/nuevo");
    if (addPersonItem && !items.some(item => item.href === "/app/personas/nuevo")) {
      items = [...items.slice(0, -1), addPersonItem, items[items.length - 1]];
    }
  }

  return items;
}

export function getNavSectionsForRole(role: Role | string): NavSection[] {
  const items = getNavForRole(role);

  return [
    {
      items: items,
    },
  ];
}
