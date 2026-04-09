"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Church, MapPin, Calendar, Users, User, Pencil } from "lucide-react";
import { DeleteDialog } from "@/components/dashboard/DeleteDialog";
import { eliminarIglesia } from "@/actions/iglesias-actions";
import toast from "react-hot-toast";

export interface IglesiaItem {
  id: number;
  title: string;
  place: string;
  active: boolean;
  _count: { persons: number };
  schedules: { id: number }[];
  leaders: { role: string; user: { person: { name: string; lastname: string } } | null }[];
}

interface IglesiaListItemProps {
  iglesia: IglesiaItem;
  editHref?: string;
}

export function IglesiaListItem({ iglesia, editHref }: IglesiaListItemProps) {
  const [open, setOpen] = useState(false);
  const href = editHref ?? `/admin/iglesias/${iglesia.id}/editar`;

  const responsableNombre =
    iglesia.leaders && iglesia.leaders.length > 0
      ? iglesia.leaders
          .filter((l) => l.user?.person)
          .map((l) => `${l.user!.person.name} ${l.user!.person.lastname}`)
          .join(", ")
      : null;

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex items-start gap-4 text-left hover:opacity-75 transition-opacity"
        >
          <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Church className="h-6 w-6 text-pink-600" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800">{iglesia.title}</h3>
            <div className="flex items-center gap-1 text-sm text-slate-500 mt-1">
              <MapPin className="h-3 w-3" />
              {iglesia.place}
            </div>
            {responsableNombre && (
              <div className="flex items-center gap-1 text-sm text-slate-500 mt-1">
                <User className="h-3 w-3" />
                Responsable: {responsableNombre}
              </div>
            )}
          </div>
        </button>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3 text-sm text-slate-500">
            <span className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              {iglesia._count.persons}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {iglesia.schedules.length} horarios
            </span>
          </div>
          <Badge variant={iglesia.active ? "default" : "secondary"}>
            {iglesia.active ? "Activa" : "Inactiva"}
          </Badge>
          <Button asChild size="sm" variant="ghost">
            <Link href={href}>
              <Pencil className="h-4 w-4" />
            </Link>
          </Button>
          <DeleteDialog
            dialogTitle="Eliminar iglesia"
            itemName={iglesia.title}
            onConfirm={async () => {
              const formData = new FormData();
              formData.append("id", iglesia.id.toString());
              await eliminarIglesia(formData);
              toast.success("Iglesia eliminada");
            }}
          />
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{iglesia.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 mt-2">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <MapPin className="h-4 w-4 text-slate-400" />
              <span>{iglesia.place}</span>
            </div>
            {responsableNombre && (
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <User className="h-4 w-4 text-slate-400" />
                <span>Responsable: {responsableNombre}</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Users className="h-4 w-4 text-slate-400" />
              <span>{iglesia._count.persons} personas</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Calendar className="h-4 w-4 text-slate-400" />
              <span>{iglesia.schedules.length} horarios</span>
            </div>
            <div className="pt-1">
              <Badge variant={iglesia.active ? "default" : "secondary"}>
                {iglesia.active ? "Activa" : "Inactiva"}
              </Badge>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
