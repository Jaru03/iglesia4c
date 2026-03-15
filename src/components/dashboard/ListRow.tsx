import { ReactNode } from "react";

interface ListRowProps {
  /** Columna izquierda: avatar/icono + contenido principal */
  left: ReactNode;
  /** Columna derecha: badges + botones de acción */
  right?: ReactNode;
}

/**
 * Fila de lista estándar del dashboard.
 * Usa layout flex responsivo: columna en móvil, fila en md+.
 */
export function ListRow({ left, right }: ListRowProps) {
  return (
    <div className="py-4 first:pt-0 last:pb-0">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">{left}</div>
        {right && <div className="flex items-center gap-2">{right}</div>}
      </div>
    </div>
  );
}
