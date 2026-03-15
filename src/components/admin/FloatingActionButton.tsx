"use client";

import Link from "next/link";
import { Plus, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FloatingActionButtonProps {
  href?: string;
  onClick?: () => void;
  label?: string;
  icon?: LucideIcon;
  /** Clase de posición vertical. Por defecto "bottom-6". */
  bottomClass?: string;
  /** Variante visual. "primary" = oscuro (por defecto), "secondary" = blanco con borde. */
  variant?: "primary" | "secondary";
  /** Tamaño del botón. "default" = normal, "lg" = más grande. */
  size?: "default" | "lg";
}

export function FloatingActionButton({
  href,
  onClick,
  label = "Añadir",
  icon: Icon = Plus,
  bottomClass = "bottom-6",
  variant = "primary",
  size = "default",
}: FloatingActionButtonProps) {
  const colorClass =
    variant === "secondary"
      ? "bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-md"
      : "bg-slate-800 hover:bg-slate-700 text-white shadow-lg";

  const sizeClass = size === "lg" 
    ? "h-14 w-14" 
    : variant === "secondary" 
      ? "h-12 w-12" 
      : "h-14 w-14";

  const button = (
    <Button
      size="icon"
      className={`fixed ${bottomClass} right-6 z-50 ${sizeClass} rounded-full ${colorClass}`}
      onClick={onClick}
      aria-label={label}
    >
      <Icon className={size === "lg" ? "h-7 w-7" : "h-5 w-5"} />
    </Button>
  );

  if (href) {
    return <Link href={href}>{button}</Link>;
  }

  return button;
}
