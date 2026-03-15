import { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  message?: string;
  icon?: LucideIcon;
}

export function EmptyState({ message = "No hay resultados.", icon: Icon }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-slate-400 gap-2">
      {Icon && <Icon className="h-8 w-8" />}
      <p className="text-sm">{message}</p>
    </div>
  );
}
