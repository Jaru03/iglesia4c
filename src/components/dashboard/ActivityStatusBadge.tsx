import { Badge } from "@/components/ui/badge";

interface ActivityStatusBadgeProps {
  hourStart: string | Date;
}

export function ActivityStatusBadge({ hourStart }: ActivityStatusBadgeProps) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const date = new Date(hourStart);

  const isToday = date >= today && date < tomorrow;
  const isFuture = date > now;

  if (isToday) return <Badge className="bg-blue-500">Hoy</Badge>;
  if (isFuture) return <Badge className="bg-green-500">Próxima</Badge>;
  return <Badge variant="secondary">Pasada</Badge>;
}
