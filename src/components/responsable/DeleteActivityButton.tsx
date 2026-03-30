"use client";

import { eliminarActividadPorId } from "@/actions/actividades-actions";
import { DeleteDialog } from "@/components/dashboard/DeleteDialog";
import toast from "react-hot-toast";

type Props = {
  activityId: number;
  activityTitle: string;
};

export function DeleteActivityButton({ activityId, activityTitle }: Props) {
  return (
    <DeleteDialog
      dialogTitle="Eliminar actividad"
      itemName={activityTitle}
      onConfirm={async () => {
        const result = await eliminarActividadPorId(activityId);
        if (result?.error) {
          toast.error(result.error);
          return result;
        }
        toast.success("Actividad eliminada");
      }}
    />
  );
}
