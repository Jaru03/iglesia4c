"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { LucideIcon, Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DeleteDialog } from "./DeleteDialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// ─── Avatar ────────────────────────────────────────────────────────────────

type AvatarColor =
  | "pink" | "purple" | "blue" | "emerald" | "amber"
  | "slate" | "violet" | "cyan" | "rose" | "teal";

const avatarColors: Record<AvatarColor, { bg: string; text: string }> = {
  pink:    { bg: "bg-pink-100",    text: "text-pink-600"    },
  purple:  { bg: "bg-purple-100",  text: "text-purple-600"  },
  blue:    { bg: "bg-blue-100",    text: "text-blue-600"    },
  emerald: { bg: "bg-emerald-100", text: "text-emerald-600" },
  amber:   { bg: "bg-amber-100",   text: "text-amber-600"   },
  slate:   { bg: "bg-slate-100",   text: "text-slate-500"   },
  violet:  { bg: "bg-violet-100",  text: "text-violet-600"  },
  cyan:    { bg: "bg-cyan-100",    text: "text-cyan-600"    },
  rose:    { bg: "bg-rose-100",    text: "text-rose-600"    },
  teal:    { bg: "bg-teal-100",    text: "text-teal-600"    },
};

interface AvatarConfig {
  icon?: LucideIcon;
  /** URL de imagen (ej: foto de actividad). Si se provee, reemplaza el icono. */
  image?: string | null;
  imageAlt?: string;
  color?: AvatarColor;
  /** "square" = rounded-lg (entidades), "circle" = rounded-full (personas/usuarios) */
  shape?: "square" | "circle";
  /** Número de notificaciones/alertas a mostrar como badge sobre el avatar */
  badge?: number;
}

// ─── Subcomponentes de datos ────────────────────────────────────────────────

export interface MetaItem {
  icon?: LucideIcon;
  text: ReactNode;
  className?: string;
}

export interface BadgeConfig {
  label: ReactNode;
  variant?: "default" | "secondary" | "destructive" | "outline";
  className?: string;
}

export interface StatItem {
  icon?: LucideIcon;
  text: ReactNode;
}

// ─── Props del componente ───────────────────────────────────────────────────

export interface ListItemProps {
  // Avatar (izquierda)
  avatar: AvatarConfig;

  // Contenido principal (izquierda)
  title: string;
  /** Badge inline junto al título (ej: estado de petición) */
  titleBadge?: BadgeConfig;
  /** Líneas de metadata debajo del título */
  meta?: MetaItem[];
  /** Contenido extra debajo de meta (ej: cuerpo de petición) */
  extraContent?: ReactNode;

  // Sección derecha
  /** Estadísticas de texto (ej: "45 personas", "3 horarios") */
  stats?: StatItem[];
  /** Badges de estado/categoría */
  badges?: BadgeConfig[];
  /** Acciones personalizadas adicionales (se renderizan entre badges y edit/delete) */
  customActions?: ReactNode;

  // Acciones estándar (derecha)
  editHref?: string;
  onDelete?: () => Promise<{ error?: string } | void>;
  deleteTitle?: string;
  /** Nombre del ítem en el diálogo de confirmación. Por defecto usa `title`. */
  deleteItemName?: string;
  /** Si se provee, el área izquierda es clickable y abre este contenido en un modal. */
  modalContent?: ReactNode;
  /** Título del modal. Por defecto usa `title`. */
  modalTitle?: string;
  /** Se llama al abrir el modal (ej: marcar notificaciones como leídas). */
  onModalOpen?: () => void;
}

// ─── Componente ─────────────────────────────────────────────────────────────

export function ListItem({
  avatar,
  title,
  titleBadge,
  meta = [],
  extraContent,
  stats = [],
  badges = [],
  customActions,
  editHref,
  onDelete,
  deleteTitle = "Eliminar elemento",
  deleteItemName,
  modalContent,
  modalTitle,
  onModalOpen,
}: ListItemProps) {
  const { bg, text: iconText } = avatarColors[avatar.color ?? "slate"];
  const shape = avatar.shape === "circle" ? "rounded-full" : "rounded-lg";
  const Icon = avatar.icon;
  const [open, setOpen] = useState(false);

  const leftArea = (
    <div className="flex items-start gap-4 flex-1 min-w-0">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          {avatar.image ? (
            <div className={`w-12 h-12 ${shape} overflow-hidden`}>
              <img
                src={avatar.image}
                alt={avatar.imageAlt ?? title}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div
              className={`w-12 h-12 ${bg} ${shape} flex items-center justify-center`}
            >
              {Icon && <Icon className={`h-6 w-6 ${iconText}`} />}
            </div>
          )}
          {!!avatar.badge && (
            <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[10px] font-bold leading-none ring-2 ring-background">
              {avatar.badge > 99 ? "99+" : avatar.badge}
            </span>
          )}
        </div>

        {/* Contenido */}
        <div className="flex-1 min-w-0">
          {/* Título + badge inline */}
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-slate-800">{title}</h3>
            {titleBadge && (
              <Badge
                variant={titleBadge.variant ?? "secondary"}
                className={titleBadge.className}
              >
                {titleBadge.label}
              </Badge>
            )}
          </div>

          {/* Meta líneas */}
          {meta.map((item, i) => (
            <div
              key={i}
              className={`flex items-center gap-1 text-sm text-slate-500 mt-1 ${item.className ?? ""}`}
            >
              {item.icon && <item.icon className="h-3 w-3 flex-shrink-0" />}
              <span className="truncate">{item.text}</span>
            </div>
          ))}

          {/* Contenido extra (ej: cuerpo de petición) */}
          {extraContent && <div className="mt-2">{extraContent}</div>}
        </div>
      </div>
  );

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        {/* ── Izquierda ── */}
        {modalContent ? (
          <button
            type="button"
            onClick={() => {
              setOpen(true);
              onModalOpen?.();
            }}
            className="flex items-start gap-4 flex-1 min-w-0 text-left hover:opacity-75 transition-opacity"
          >
            {leftArea}
          </button>
        ) : (
          <div className="flex items-start gap-4 flex-1 min-w-0">{leftArea}</div>
        )}

      {/* ── Derecha ── */}
      <div className="flex items-center gap-3 shrink-0 flex-wrap md:flex-nowrap">
        {/* Stats de texto */}
        {stats.map((s, i) => (
          <span key={i} className="flex items-center gap-1 text-sm text-slate-500">
            {s.icon && <s.icon className="h-3 w-3" />}
            {s.text}
          </span>
        ))}

        {/* Badges */}
        {badges.map((b, i) => (
          <Badge
            key={i}
            variant={b.variant ?? "secondary"}
            className={b.className}
          >
            {b.label}
          </Badge>
        ))}

        {/* Slot custom (ej: select de estado en peticiones) */}
        {customActions}

        {/* Edit */}
        {editHref && (
          <Button asChild size="sm" variant="ghost">
            <Link href={editHref}>
              <Pencil className="h-4 w-4" />
            </Link>
          </Button>
        )}

        {/* Delete */}
        {onDelete && (
          <DeleteDialog
            dialogTitle={deleteTitle}
            itemName={deleteItemName ?? title}
            onConfirm={onDelete}
          />
        )}
      </div>
    </div>

      {/* ── Modal ── */}
      {modalContent && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{modalTitle ?? title}</DialogTitle>
            </DialogHeader>
            {modalContent}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
