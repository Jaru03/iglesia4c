"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Cake } from "lucide-react";
import toast from "react-hot-toast";

export function BirthdayReminderButton() {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    try {
      const res = await fetch("/api/birthdays/remind", { method: "POST" });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error ?? "Error al enviar");
        return;
      }

      if (data.sent === 0) {
        toast("No hay cumpleaños hoy 🎂", { icon: "📅" });
      } else {
        toast.success(`Email enviado con ${data.sent} cumpleaño${data.sent === 1 ? "s" : "s"} de hoy`);
      }
    } catch {
      toast.error("Error de conexión");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button variant="outline" size="sm" className="gap-2" onClick={handleClick} disabled={loading}>
      <Cake className="size-4" />
      {loading ? "Enviando..." : "Recordar cumpleaños"}
    </Button>
  );
}
