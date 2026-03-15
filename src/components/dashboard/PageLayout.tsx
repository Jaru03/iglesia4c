import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";
import { DashboardHeader } from "./DashboardHeader";
import { StatCard } from "./StatCard";
import { ListCard } from "./ListCard";
import { FloatingActionButton } from "@/components/admin/FloatingActionButton";

export interface StatConfig {
  title: string;
  value: number;
  colorIndex: number;
  icon?: LucideIcon;
}

const colsMap: Record<2 | 3 | 4 | 5, string> = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 xl:grid-cols-4",
  5: "grid-cols-1 sm:grid-cols-2 xl:grid-cols-5",
};

interface PageLayoutProps {
  title: string;
  subtitle?: string;
  /** Elemento extra a la derecha del header (ej: card de fecha, botón) */
  headerAction?: ReactNode;
  /** Tabs de navegación entre secciones (ej: tabs de departamentos) */
  tabs?: ReactNode;
  stats?: StatConfig[];
  statsColumns?: 2 | 3 | 4 | 5;
  listTitle: string;
  filter?: ReactNode;
  children: ReactNode;
  fab?: { href: string; label: string };
}

/**
 * Layout estándar de página del dashboard.
 * Header + stats grid + card de lista con filtro + FAB opcional.
 * Completamente agnóstico: funciona en admin, responsable, lider, usuario.
 */
export function PageLayout({
  title,
  subtitle,
  headerAction,
  tabs,
  stats,
  statsColumns = 3,
  listTitle,
  filter,
  children,
  fab,
}: PageLayoutProps) {
  return (
    <>
      <div className="max-w-7xl mx-auto p-4 pb-6 space-y-4 h-[100vh] overflow-auto">
        <DashboardHeader title={title} subtitle={subtitle} action={headerAction} />
        {tabs}

        {stats && stats.length > 0 && (
          <div className={`grid ${colsMap[statsColumns]} gap-3`}>
            {stats.map((s, i) => (
              <StatCard key={i} title={s.title} value={s.value} colorIndex={s.colorIndex} icon={s.icon} />
            ))}
          </div>
        )}

        <ListCard title={listTitle} filter={filter}>
          {children}
        </ListCard>
      </div>

      {fab && <FloatingActionButton href={fab.href} label={fab.label} />}
    </>
  );
}
