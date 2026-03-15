"use client";

import { useState } from "react";
import { eliminarActividadPorId } from "@/actions/actividades-actions";
import { Button } from "@/components/ui/button";
import { Trash2, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

type Props = {
  activityId: number;
  activityTitle: string;
};

export function DeleteActivityButton({ activityId, activityTitle }: Props) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`¿Estás seguro de eliminar "${activityTitle}"?`)) {
      return;
    }

    setLoading(true);
    const result = await eliminarActividadPorId(activityId);
    
    if (result?.success) {
      toast.success("Actividad eliminada");
    } else {
      toast.error(result?.error || "Error al eliminar");
    }
    
    setLoading(false);
  };

  return (
    <Button
      size="sm"
      variant="ghost"
      onClick={handleDelete}
      disabled={loading}
      className="text-red-500 hover:text-red-700 hover:bg-red-50"
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
    </Button>
  );
}
