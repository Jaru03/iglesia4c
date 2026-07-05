"use client";

import { Bar, BarChart, XAxis, YAxis, Tooltip } from "recharts";
import { ChartContainer, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";

const chartConfig = {
  value: { label: "Esta semana", color: "hsl(var(--chart-1))" },
  valuePasada: { label: "Semana pasada", color: "hsl(var(--chart-4))" },
  personas: { label: "Personas", color: "hsl(var(--chart-1))" },
  actividades: { label: "Actividades", color: "hsl(var(--chart-2))" },
  peticiones: { label: "Peticiones", color: "hsl(var(--chart-3))" },
  departamentos: { label: "Departamentos", color: "hsl(var(--chart-4))" },
} satisfies ChartConfig;

interface OverviewChartProps {
  data: {
    name: string;
    value: number;
    fill: string;
    valuePasada?: number;
  }[];
  /** Si es true, añade una segunda barra ("Semana pasada") por categoría. */
  comparison?: boolean;
}

export function OverviewChart({ data, comparison = false }: OverviewChartProps) {
  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <BarChart data={data}>
        <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
        <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
        <Tooltip content={<ChartTooltipContent />} />
        {comparison ? (
          <>
            <Bar dataKey="value" name="Esta semana" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="valuePasada" name="Semana pasada" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
          </>
        ) : (
          <Bar dataKey="value" radius={[4, 4, 0, 0]} />
        )}
      </BarChart>
    </ChartContainer>
  );
}
