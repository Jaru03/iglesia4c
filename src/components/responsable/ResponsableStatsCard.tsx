import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ResponsableStatsCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  colorIndex: number;
}

const colorClasses = [
  "from-blue-500 to-blue-600",
  "from-emerald-500 to-emerald-600",
  "from-amber-400 to-amber-500",
  "from-violet-500 to-violet-600",
  "from-pink-500 to-pink-600",
  "from-cyan-500 to-cyan-600",
  "from-rose-500 to-rose-600",
  "from-indigo-500 to-indigo-600",
  "from-orange-500 to-orange-600",
  "from-teal-500 to-teal-600",
];

export function ResponsableStatsCard({ title, value, icon: Icon, colorIndex }: ResponsableStatsCardProps) {
  const colorClass = colorClasses[colorIndex % colorClasses.length];

  return (
    <div className={`bg-gradient-to-br ${colorClass} text-white border-0 rounded-xl`}>
      <div className="p-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-white/80">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
        </div>
        <Icon className="h-8 w-8 text-white/60" />
      </div>
    </div>
  );
}
