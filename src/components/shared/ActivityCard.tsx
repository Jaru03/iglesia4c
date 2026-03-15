"use client";

import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { MapPin, Clock, Activity, Church } from "lucide-react";

type ActivityCardProps = {
  activity: {
    id: number;
    title: string;
    hourStart: string;
    place: string;
    img: string | null;
    departmentName: string;
  };
  isCulto?: boolean;
  children?: React.ReactNode;
};

export function ActivityCard({ activity, isCulto = false, children }: ActivityCardProps) {
  return (
    <Card className="overflow-hidden h-full group hover:shadow-xl transition-all duration-300 border-0">
      <div className="relative h-44 w-full overflow-hidden">
        {activity.img ? (
          <img 
            src={activity.img} 
            alt={activity.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className={`w-full h-full flex items-center justify-center ${
            isCulto ? "bg-gradient-to-br from-amber-700 to-amber-900" : "bg-gradient-to-br from-slate-800 to-slate-600"
          }`}>
            {isCulto ? (
              <Church className="h-10 w-10 text-white/30" />
            ) : (
              <Activity className="h-10 w-10 text-white/30" />
            )}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        {!isCulto && (
          <div className="absolute top-2 left-2">
            <span className="text-xs bg-white/95 backdrop-blur-sm px-2 py-1 rounded-full text-slate-800 font-medium">
              {activity.departmentName || "Departamento"}
            </span>
          </div>
        )}
        <div className="absolute bottom-2 left-2 right-2">
          <h3 className="font-bold text-white text-base leading-tight line-clamp-2">
            {activity.title}
          </h3>
        </div>
      </div>
      <CardContent className="p-3 bg-white">
        <div className="flex items-center justify-between text-xs text-slate-600 mb-2">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3 text-slate-400" />
            <span className="font-medium">
              {format(new Date(activity.hourStart), "d MMM", { locale: es })}
            </span>
            <span className="text-slate-400">
              {format(new Date(activity.hourStart), "h:mm a", { locale: es })}
            </span>
          </div>
          <div className="flex items-center gap-1 text-slate-500">
            <MapPin className="h-3 w-3" />
            <span className="truncate max-w-[60px]">{activity.place}</span>
          </div>
        </div>
        {children}
      </CardContent>
    </Card>
  );
}
