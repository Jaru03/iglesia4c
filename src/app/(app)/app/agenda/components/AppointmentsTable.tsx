"use client";

import { useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MessageSquare, Check, X, CheckCheck, User } from "lucide-react";
import toast from "react-hot-toast";
import { ListItem } from "@/components/dashboard/ListItem";
import { ResourceList } from "@/components/dashboard/ResourceList";
import { buildAppointmentCalendarUrl } from "@/lib/google-calendar";

export interface AppointmentRow {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
  status: string;
  notes?: string | null;
  user: { person: { name: string; lastname: string; email?: string | null } };
  responsableName?: string;
}

const STATUS_LABELS: Record<string, string> = {
  PENDING: "Pendiente",
  CONFIRMED: "Confirmada",
  CANCELLED: "Cancelada",
  COMPLETED: "Completada",
};

const STATUS_BADGE_CLASS: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  CONFIRMED: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
  CANCELLED: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
  COMPLETED: "bg-slate-100 text-slate-600 dark:bg-slate-800/40 dark:text-slate-400",
};

interface Props {
  appointments: AppointmentRow[];
  isResponsable?: boolean;
}

export function AppointmentsTable({ appointments, isResponsable }: Props) {
  const [items, setItems] = useState(appointments);

  async function changeStatus(id: number, status: string) {
    const res = await fetch(`/api/appointments/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) { toast.error("Error al actualizar"); return; }
    setItems((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
    toast.success("Cita actualizada");
  }

  return (
    <ResourceList
      items={items}
      searchFields={["user.person.name", "user.person.lastname"]}
      emptyMessage="No hay citas registradas"
      emptyIconName="Calendar"
      renderItem={(appt) => {
        const person = appt.user.person;
        return (
          <ListItem
            avatar={{ icon: User, color: "blue", shape: "circle" }}
            title={`${person.name} ${person.lastname}`}
            titleBadge={{
              label: STATUS_LABELS[appt.status] ?? appt.status,
              className: STATUS_BADGE_CLASS[appt.status] ?? "",
            }}
            meta={[
              {
                icon: Calendar,
                text: format(new Date(appt.date), "EEE d MMM yyyy", { locale: es }),
                className: "capitalize",
              },
              { icon: Clock, text: `${appt.startTime}–${appt.endTime}` },
              ...(appt.responsableName ? [{ icon: User, text: appt.responsableName }] : []),
              ...(appt.notes ? [{ icon: MessageSquare, text: appt.notes }] : []),
            ]}
            customActions={
              <div className="flex items-center gap-2 flex-wrap">
                {isResponsable && appt.status === "PENDING" && (
                  <Button
                    size="sm"
                    className="h-7 gap-1 text-xs"
                    onClick={() => changeStatus(appt.id, "CONFIRMED")}
                  >
                    <Check className="h-3 w-3" />
                    Confirmar
                  </Button>
                )}
                {isResponsable && appt.status === "CONFIRMED" && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 gap-1 text-xs"
                    onClick={() => changeStatus(appt.id, "COMPLETED")}
                  >
                    <CheckCheck className="h-3 w-3" />
                    Completar
                  </Button>
                )}
                {appt.status === "CONFIRMED" && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 gap-1 text-xs border-[#4285F4]/40 text-[#4285F4] hover:bg-[#4285F4]/10 hover:text-[#4285F4]"
                    asChild
                  >
                    <a
                      href={buildAppointmentCalendarUrl({
                        dateStr: format(new Date(appt.date), "yyyy-MM-dd"),
                        startTime: appt.startTime,
                        endTime: appt.endTime,
                        responsableName: appt.responsableName ?? `${person.name} ${person.lastname}`,
                        notes: appt.notes,
                      })}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Calendar className="h-3 w-3" />
                      Google Calendar
                    </a>
                  </Button>
                )}
                {["PENDING", "CONFIRMED"].includes(appt.status) && (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 gap-1 text-xs text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => changeStatus(appt.id, "CANCELLED")}
                  >
                    <X className="h-3 w-3" />
                    Cancelar
                  </Button>
                )}
              </div>
            }
          />
        );
      }}
    />
  );
}
