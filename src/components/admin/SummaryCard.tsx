import Link from "next/link";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type SummaryCardVariant = "personas" | "peticiones" | "actividades" | "custom";

type PersonaItem = { id: number; name: string; lastname: string; email?: string | null };
type PeticionItem = { id: number; nombre: string; status: string };
type ActividadItem = { id: number; title: string; hourStart: string; place?: string };

interface SummaryCardProps {
  title: string;
  icon: LucideIcon;
  iconColor: string;
  href: string;
  variant?: SummaryCardVariant;
  data?: PersonaItem[] | PeticionItem[] | ActividadItem[];
  children?: React.ReactNode;
}

function renderPersonas(data: PersonaItem[]) {
  if (data.length === 0) return <p className="text-slate-400 text-sm">Sin datos</p>;
  return data.map((p) => (
    <div key={p.id} className="text-sm">
      <p className="font-medium text-slate-800 truncate">{p.name} {p.lastname}</p>
      {p.email && <p className="text-slate-500 text-xs truncate">{p.email}</p>}
    </div>
  ));
}

function renderPeticiones(data: PeticionItem[]) {
  if (data.length === 0) return <p className="text-slate-400 text-sm">Sin datos</p>;
  return data.map((p) => (
    <div key={p.id} className="flex items-center justify-between">
      <span className="text-sm truncate">{p.nombre}</span>
      <Badge variant={p.status === "PENDIENTE" ? "destructive" : "secondary"} className="text-xs">
        {p.status}
      </Badge>
    </div>
  ));
}

function renderActividades(data: ActividadItem[]) {
  if (data.length === 0) return <p className="text-slate-400 text-sm">Sin datos</p>;
  return data.map((a) => (
    <div key={a.id} className="text-sm">
      <p className="font-medium text-slate-800 truncate">{a.title}</p>
      <p className="text-slate-500 text-xs">
        {a.place && <span className="mr-2">{a.place}</span>}
        {format(new Date(a.hourStart), "d MMM", { locale: es })}, {String(new Date(a.hourStart).getUTCHours()).padStart(2,"0")}:{String(new Date(a.hourStart).getUTCMinutes()).padStart(2,"0")}
      </p>
    </div>
  ));
}

export function SummaryCard({ title, icon: Icon, iconColor, href, variant = "custom", data, children }: SummaryCardProps) {
  const renderContent = () => {
    const limitedData = data?.slice(0, 3);
    switch (variant) {
      case "personas":
        return renderPersonas(limitedData as PersonaItem[]);
      case "peticiones":
        return renderPeticiones(limitedData as PeticionItem[]);
      case "actividades":
        return renderActividades(limitedData as ActividadItem[]);
      case "custom":
      default:
        return children;
    }
  };

  return (
    <Card className="shadow-md border-slate-200">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Icon className={`h-5 w-5 ${iconColor}`} />
            {title}
          </CardTitle>
          <Button asChild size="sm" variant="outline">
            <Link href={href}>Ver</Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0 space-y-3">
        {renderContent()}
      </CardContent>
    </Card>
  );
}
