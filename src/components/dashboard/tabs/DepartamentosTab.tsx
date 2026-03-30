"use client";

import Link from "next/link";
import { Activity, ArrowRight, Church } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { DepartamentosGrid, type DepartmentGridItem } from "@/components/dashboard/DepartamentosGrid";
import { ActivityCard } from "@/components/responsable/ActivityCard";
import { DashboardCalendar, type CalendarEvent } from "@/components/dashboard/DashboardCalendar";

export interface ActivityItem {
  id: number;
  title: string;
  hourStart: string;
  place: string;
  img?: string | null;
  departmentName?: string;
  allowPreRegistration?: boolean;
}

interface Props {
  // Carousels
  calendarActivities: ActivityItem[];
  cultoActivities: ActivityItem[];
  memberActivities?: ActivityItem[];    // solo si el usuario es también miembro de otros depts
  userPersonId?: number;
  attendedSet?: Set<number>;
  preRegisteredSet?: Set<number>;
  autoMarkedSet?: Set<number>;
  deptNameForMember?: string;

  // Grid de departamentos (abajo)
  departments: DepartmentGridItem[];
  visibleDepartmentIds?: number[];
  departmentBadge?: string;             // "Miembro", "Líder", etc.
  departmentDetailHrefBase: string;

  // Enlace para crear actividad (empty state)
  createActivityHref?: string;
}

function ActivityCarousel({
  title,
  activities,
  icon: Icon,
  isCulto = false,
  renderItem,
}: {
  title: string;
  activities: ActivityItem[];
  icon?: React.ElementType;
  isCulto?: boolean;
  renderItem: (a: ActivityItem) => React.ReactNode;
}) {
  if (activities.length === 0) return null;


  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        {Icon && <Icon className={`h-5 w-5 ${isCulto ? "text-amber-600" : "text-blue-600"}`} />}
        <h2 className="text-xl font-bold text-slate-800">{title}</h2>
      </div>
      <Carousel className="w-full" opts={{ align: "start", slidesToScroll: 3 }}>
        <CarouselContent className="-ml-3">
          {activities.slice(0, 10).map((a) => (
            <CarouselItem key={a.id} className="pl-3 basis-full md:basis-1/2 lg:basis-1/3">
              {renderItem(a)}
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0 bg-white shadow-lg border-0 hover:bg-slate-50" />
        <CarouselNext className="right-0 bg-white shadow-lg border-0 hover:bg-slate-50" />
      </Carousel>
    </div>
  );
}

export function DepartamentosTab({
  calendarActivities,
  cultoActivities,
  memberActivities = [],
  userPersonId,
  attendedSet,
  preRegisteredSet,
  autoMarkedSet,
  deptNameForMember,
  departments,
  visibleDepartmentIds,
  departmentBadge = "Miembro",
  departmentDetailHrefBase,
  createActivityHref,
}: Props) {
  const hasAnything =
    calendarActivities.length > 0 ||
    cultoActivities.length > 0 ||
    memberActivities.length > 0 ||
    departments.length > 0;

  const actividadesGenerales = calendarActivities;

  if (!hasAnything) {
    return (
      <div>
        <ActivityCarousel
          title="Actividades"
          activities={actividadesGenerales}
          renderItem={(a) => (
            <ActivityCard
              activity={{
                id: a.id,
                title: a.title,
                hourStart: a.hourStart,
                place: a.place,
                img: a.img ?? null,
                departmentName: a.departmentName ?? "",
                attended: attendedSet?.has(a.id),
              }}
              personId={userPersonId}
            />
          )}
        />

        <Card>
        <CardContent className="py-12 text-center">
          <Activity className="h-12 w-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500">No hay actividades registradas</p>
          {createActivityHref && (
            <Button variant="link" asChild className="mt-2">
              <Link href={createActivityHref}>
                Crear actividad <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}
        </CardContent>
      </Card>
      </div>
    );
  }

  const actividadesComoMiembro = memberActivities;

  const seenIds = new Set<number>();
  const calendarEvents: CalendarEvent[] = [
    ...calendarActivities.map((a): CalendarEvent => {
      seenIds.add(a.id);
      return {
        id: a.id, title: a.title, place: a.place,
        hourStart: a.hourStart, type: "actividad",
        departmentName: a.departmentName,
        attended: attendedSet?.has(a.id),
        preRegistered: preRegisteredSet?.has(a.id),
        autoMarked: autoMarkedSet?.has(a.id),
        allowPreRegistration: a.allowPreRegistration,
      };
    }),
    ...cultoActivities.map((a): CalendarEvent => {
      seenIds.add(a.id);
      return {
        id: a.id, title: a.title, place: a.place,
        hourStart: a.hourStart, type: "culto",
        attended: attendedSet?.has(a.id),
        preRegistered: preRegisteredSet?.has(a.id),
        autoMarked: autoMarkedSet?.has(a.id),
        allowPreRegistration: a.allowPreRegistration,
      };
    }),
    ...memberActivities
      .filter((a) => !seenIds.has(a.id))
      .map((a): CalendarEvent => ({
        id: a.id, title: a.title, place: a.place,
        hourStart: a.hourStart, type: "actividad",
        departmentName: a.departmentName,
        attended: attendedSet?.has(a.id),
        preRegistered: preRegisteredSet?.has(a.id),
        autoMarked: autoMarkedSet?.has(a.id),
        allowPreRegistration: a.allowPreRegistration,
        isInternal: true,
      })),
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Calendario</CardTitle>
        </CardHeader>
        <CardContent>
          <DashboardCalendar events={calendarEvents} personId={userPersonId} />
        </CardContent>
      </Card>

      <ActivityCarousel
        title="Actividades"
        activities={actividadesGenerales}
        renderItem={(a) => (
          <ActivityCard
            activity={{
              id: a.id,
              title: a.title,
              hourStart: a.hourStart,
              place: a.place,
              img: a.img ?? null,
              departmentName: a.departmentName ?? "",
              attended: attendedSet?.has(a.id),
              preRegistered: preRegisteredSet?.has(a.id),
              autoMarked: autoMarkedSet?.has(a.id),
              allowPreRegistration: a.allowPreRegistration,
            }}
            personId={userPersonId}
          />
        )}
      />

      <ActivityCarousel
        title="Cultos"
        icon={Church}
        isCulto
        activities={cultoActivities}
        renderItem={(a) => (
          <ActivityCard
            activity={{
              id: a.id,
              title: a.title,
              hourStart: a.hourStart,
              place: a.place,
              img: a.img ?? null,
              departmentName: a.departmentName ?? "",
              attended: attendedSet?.has(a.id),
              preRegistered: preRegisteredSet?.has(a.id),
              autoMarked: autoMarkedSet?.has(a.id),
              allowPreRegistration: a.allowPreRegistration,
            }}
            isCulto
            personId={userPersonId}
          />
        )}
      />

      {userPersonId && actividadesComoMiembro.length > 0 && (
        <ActivityCarousel
          title="Mis Actividades como Miembro"
          activities={actividadesComoMiembro}
          renderItem={(a) => (
            <ActivityCard
              activity={{
                id: a.id,
                title: a.title,
                hourStart: a.hourStart,
                place: a.place,
                img: a.img ?? null,
                departmentName: a.departmentName ?? deptNameForMember ?? "",
                attended: attendedSet?.has(a.id),
                preRegistered: preRegisteredSet?.has(a.id),
                autoMarked: autoMarkedSet?.has(a.id),
                allowPreRegistration: a.allowPreRegistration,
              }}
              personId={userPersonId}
            />
          )}
        />
      )}

    </div>
  );
}
