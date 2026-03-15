"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Mail, Phone, Building2, Pencil } from "lucide-react";
import { DeleteDialog } from "@/components/dashboard/DeleteDialog";
import { eliminarPersona } from "@/actions/personas-actions";
import toast from "react-hot-toast";

export interface PersonaItem {
  id: number;
  name: string;
  lastname: string;
  email: string | null;
  phone: string | null;
  active: boolean;
  membershipStatus: string;
  church: { id: number; title: string } | null;
  _count: { attendances: number };
}

interface PersonaListItemProps {
  persona: PersonaItem;
  editHref?: string;
}

export function PersonaListItem({ persona, editHref }: PersonaListItemProps) {
  const href = editHref ?? `/admin/personas/${persona.id}/editar`;

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
          <Users className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h3 className="font-semibold text-slate-800">
            {persona.name} {persona.lastname}
          </h3>
          <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-slate-500">
            {persona.email && (
              <span className="flex items-center gap-1">
                <Mail className="h-3 w-3" />
                {persona.email}
              </span>
            )}
            {persona.phone && (
              <span className="flex items-center gap-1">
                <Phone className="h-3 w-3" />
                {persona.phone}
              </span>
            )}
            {persona.church && (
              <span className="flex items-center gap-1">
                <Building2 className="h-3 w-3" />
                {persona.church.title}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm text-slate-500">{persona._count.attendances} asistencias</span>
        <Badge variant={persona.active ? "default" : "secondary"}>
          {persona.membershipStatus}
        </Badge>
        <Button asChild size="sm" variant="ghost">
          <Link href={href}>
            <Pencil className="h-4 w-4" />
          </Link>
        </Button>
        <DeleteDialog
          dialogTitle="Eliminar persona"
          itemName={`${persona.name} ${persona.lastname}`}
          onConfirm={async () => {
            const formData = new FormData();
            formData.append("id", persona.id.toString());
            await eliminarPersona(formData);
            toast.success("Persona eliminada");
          }}
        />
      </div>
    </div>
  );
}
