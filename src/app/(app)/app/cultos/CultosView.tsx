"use client";

import { useMemo, useState } from "react";
import { CultosCalendar, type CultoItem } from "./CultosCalendar";
import { FiltrosDrawer, FiltrosFab, type Filtros } from "./FiltrosDrawer";

interface Props {
  cultos: CultoItem[];
  personId?: number;
  isAdmin?: boolean;
  churches?: { id: number; title: string }[];
}

export function CultosView({ cultos, personId, isAdmin, churches = [] }: Props) {
  const [filtrosOpen, setFiltrosOpen] = useState(false);
  const [filtros, setFiltros] = useState<Filtros>({
    churchId: null,
    mostrarPasados: false,
  });

  const now = new Date();

  const cultosFiltrados = useMemo(() => {
    let result = cultos;

    if (filtros.churchId !== null) {
      const titulo = churches.find((c) => c.id === filtros.churchId)?.title;
      result = result.filter((c) => c.churchTitle === titulo);
    }

    if (!filtros.mostrarPasados) {
      result = result.filter((c) => new Date(c.hourStart) >= now);
    }

    return result;
  }, [cultos, filtros, churches]);

  const hayFiltros = filtros.churchId !== null || filtros.mostrarPasados;

  return (
    <>
      <CultosCalendar
        cultos={cultosFiltrados}
        personId={personId}
        isAdmin={isAdmin}
      />

      <FiltrosFab onClick={() => setFiltrosOpen(true)} hasActive={hayFiltros} />

      <FiltrosDrawer
        open={filtrosOpen}
        onOpenChange={setFiltrosOpen}
        filtros={filtros}
        onFiltrosChange={setFiltros}
        churches={churches}
        isAdmin={isAdmin}
      />
    </>
  );
}
