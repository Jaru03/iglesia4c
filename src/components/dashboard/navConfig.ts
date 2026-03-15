import type { LucideIcon } from "lucide-react";
import {
  Calendar,
  Church,
  ClipboardCheck,
  Home,
  Megaphone,
  MessageSquare,
  User,
  UserCircle,
  Users,
  UserPlus,
} from "lucide-react";

type Role = "ADMIN" | "MEMBER" | "USER" | "PASTOR" | "COUNCIL_MEMBER" | "RESPONSIBLE" | "LEADER" | "CO_LEADER" | "SERVANT" | "VOLUNTEER";

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  exact?: boolean;
  roles: Role[];
};

export type NavSection = {
  title?: string;
  items: NavItem[];
};

export const dashboardNav: NavItem[] = [
  { href: "/app/dashboard", label: "Dashboard", icon: Home, exact: true, roles: ["ADMIN", "RESPONSIBLE", "LEADER", "USER", "MEMBER", "PASTOR", "COUNCIL_MEMBER", "CO_LEADER", "SERVANT", "VOLUNTEER"] },
  
  // Admin only
  { href: "/app/iglesias", label: "Iglesias", icon: Church, roles: ["ADMIN"] },
  
  // Admin, Responsable & Leader
  { href: "/app/departamentos", label: "Departamentos", icon: Megaphone, roles: ["ADMIN", "RESPONSIBLE", "LEADER"] },
  { href: "/app/personas", label: "Personas", icon: UserCircle, roles: ["ADMIN", "RESPONSIBLE"] },
  { href: "/app/actividades", label: "Actividades", icon: Calendar, roles: ["ADMIN", "RESPONSIBLE", "LEADER"] },
  { href: "/app/asistencias", label: "Asistencias", icon: ClipboardCheck, roles: ["ADMIN", "RESPONSIBLE", "LEADER", "USER", "MEMBER", "PASTOR", "COUNCIL_MEMBER", "CO_LEADER", "SERVANT", "VOLUNTEER"] },

  // Admin & Responsable
  { href: "/app/peticiones", label: "Peticiones", icon: MessageSquare, roles: ["ADMIN", "RESPONSIBLE"] },
  { href: "/app/miembros", label: "Miembros", icon: Users, roles: ["ADMIN", "RESPONSIBLE"] },

  // Responsable only
  { href: "/app/iglesia", label: "Mi Iglesia", icon: Church, roles: ["RESPONSIBLE"] },

  // Atención Primaria - add people
  { href: "/app/personas/nuevo", label: "Añadir Persona", icon: UserPlus, roles: ["ADMIN", "RESPONSIBLE"] },

  // All users
  { href: "/app/perfil", label: "Mi Perfil", icon: User, roles: ["ADMIN", "RESPONSIBLE", "LEADER", "USER", "MEMBER", "PASTOR", "COUNCIL_MEMBER", "CO_LEADER", "SERVANT", "VOLUNTEER"] },
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
