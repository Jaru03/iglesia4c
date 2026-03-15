"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Pencil, UserCircle } from "lucide-react";
import { DeleteDialog } from "@/components/dashboard/DeleteDialog";
import { eliminarUsuario } from "@/actions/users-actions";
import toast from "react-hot-toast";

export interface UsuarioItem {
  id: number;
  role: string;
  person: {
    name: string;
    lastname: string;
    email: string | null;
  } | null;
}

interface UsuarioListItemProps {
  usuario: UsuarioItem;
  editHref?: string;
}

export function UsuarioListItem({ usuario, editHref }: UsuarioListItemProps) {
  const href = editHref ?? `/admin/equipo/${usuario.id}/editar`;
  const displayName = usuario.person
    ? `${usuario.person.name} ${usuario.person.lastname}`
    : `Usuario #${usuario.id}`;

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
          <UserCircle className="h-6 w-6 text-slate-500" />
        </div>
        <div>
          <h3 className="font-semibold text-slate-800">{displayName}</h3>
          {usuario.person?.email && (
            <p className="text-sm text-slate-500 mt-1">{usuario.person.email}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Badge variant={usuario.role === "ADMIN" ? "default" : "secondary"}>
          <Shield className="w-3 h-3 mr-1" />
          {usuario.role}
        </Badge>
        <Button asChild size="sm" variant="ghost">
          <Link href={href}>
            <Pencil className="h-4 w-4" />
          </Link>
        </Button>
        <DeleteDialog
          dialogTitle="Eliminar usuario"
          itemName={displayName}
          onConfirm={async () => {
            const formData = new FormData();
            formData.append("userId", usuario.id.toString());
            await eliminarUsuario(formData);
            toast.success("Usuario eliminado");
          }}
        />
      </div>
    </div>
  );
}
