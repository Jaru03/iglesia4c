"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, Users, Church, Pencil } from "lucide-react";
import { DeleteDialog } from "@/components/dashboard/DeleteDialog";
import { eliminarDepartamento } from "@/actions/departamentos-actions";
import toast from "react-hot-toast";

export interface DepartamentoItem {
  id: number;
  name: string;
  description: string | null;
  active: boolean;
  church: { id: number; title: string } | null;
  churchId?: number;
  _count: { persons: number; activities: number };
}

interface DepartamentoListItemProps {
  departamento: DepartamentoItem;
  editHref?: string;
}

export function DepartamentoListItem({ departamento, editHref }: DepartamentoListItemProps) {
  const href = editHref ?? `/admin/departamentos/${departamento.id}/editar`;

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <Building2 className="h-6 w-6 text-purple-600" />
        </div>
        <div>
          <h3 className="font-semibold text-slate-800">{departamento.name}</h3>
          <div className="flex flex-wrap items-center gap-2 mt-1">
            {departamento.church && (
              <span className="text-sm text-slate-500 flex items-center gap-1">
                <Church className="h-3 w-3" />
                {departamento.church.title}
              </span>
            )}
            {departamento.description && (
              <span className="text-sm text-slate-400 truncate max-w-xs">
                {departamento.description}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1 text-sm text-slate-500">
          <Users className="h-3 w-3" />
          {departamento._count.persons}
        </span>
        <Badge variant={departamento.active ? "default" : "secondary"}>
          {departamento.active ? "Activo" : "Inactivo"}
        </Badge>
        <Button asChild size="sm" variant="ghost">
          <Link href={href}>
            <Pencil className="h-4 w-4" />
          </Link>
        </Button>
        <DeleteDialog
          dialogTitle="Eliminar departamento"
          itemName={departamento.name}
          onConfirm={async () => {
            const formData = new FormData();
            formData.append("id", departamento.id.toString());
            await eliminarDepartamento(formData);
            toast.success("Departamento eliminado");
          }}
        />
      </div>
    </div>
  );
}
