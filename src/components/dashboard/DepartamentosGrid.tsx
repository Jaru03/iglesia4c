"use client";

import { format } from "date-fns";
import { es } from "date-fns/locale";
import Link from "next/link";
import { Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type DepartmentActivity = {
  id: number;
  title: string;
  hourStart: string;
  place: string;
};

export type DepartmentGridItem = {
  id: number;
  name: string;
  memberCount: number;
  activities: DepartmentActivity[];
};

type Props = {
  departments: DepartmentGridItem[];
  visibleDepartmentIds?: number[];
  title?: string;
  emptyStateText?: string;
  badgeText?: string;
  detailHrefBase: string;
};

export function DepartamentosGrid({
  departments,
  visibleDepartmentIds,
  title = "Mis Departamentos",
  emptyStateText = "No perteneces a ningun departamento",
  badgeText = "Miembro",
  detailHrefBase,
}: Props) {
  const visibleSet = visibleDepartmentIds ? new Set(visibleDepartmentIds) : null;
  const filteredDepartments = visibleSet
    ? departments.filter((dept) => visibleSet.has(dept.id))
    : departments;

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-bold text-slate-800">{title}</h2>
      {filteredDepartments.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center">
            <Building2 className="h-10 w-10 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500">{emptyStateText}</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredDepartments.map((dept) => (
            <Card key={dept.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{dept.name}</CardTitle>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">{badgeText}</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-slate-500">Miembros</span>
                  <span className="font-semibold">{dept.memberCount}</span>
                </div>
                {dept.activities.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-slate-500">Actividades del departamento</p>
                    {dept.activities.slice(0, 5).map((activity) => (
                      <div key={activity.id} className="text-xs bg-slate-50 p-2 rounded flex items-center justify-between">
                        <div>
                          <p className="font-medium truncate">{activity.title}</p>
                          <p className="text-slate-400">
                            {format(new Date(activity.hourStart), "d MMM", { locale: es })}, {String(new Date(activity.hourStart).getUTCHours()).padStart(2,"0")}:{String(new Date(activity.hourStart).getUTCMinutes()).padStart(2,"0")}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <Button variant="outline" size="sm" className="w-full mt-3" asChild>
                  <Link href={`${detailHrefBase}${dept.id}`}>Ver detalle</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
