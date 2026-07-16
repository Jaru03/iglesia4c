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
  // Recharts da prioridad al `fill` de cada punto sobre el del <Bar>, así que en
  // modo comparación hay que quitarlo para que cada serie use su propio color.
  const chartData = comparison ? data.map(({ fill: _fill, ...rest }) => rest) : data;

  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <BarChart data={chartData}>
        <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
        <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
        <Tooltip content={<ChartTooltipContent />} />
        {/* Los <Bar> tienen que ser hijos directos del BarChart: recharts 2.x los
            busca con react-is@18, que no reconoce los elementos de React 19, así
            que cualquier <Bar> envuelto en un fragment se pierde y el chart se
            dibuja sin series. */}
        <Bar
          dataKey="value"
          name={comparison ? "Esta semana" : undefined}
          fill={comparison ? "#3b82f6" : undefined}
          radius={[4, 4, 0, 0]}
          animationDuration={700}
          animationEasing="ease-out"
        />
        {comparison ? (
          <Bar
            dataKey="valuePasada"
            name="Semana pasada"
            fill="#cbd5e1"
            radius={[4, 4, 0, 0]}
            animationBegin={120}
            animationDuration={700}
            animationEasing="ease-out"
          />
        ) : null}
      </BarChart>
    </ChartContainer>
  );
}
