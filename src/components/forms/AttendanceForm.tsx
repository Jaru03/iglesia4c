"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toggleAttendance } from "@/actions/asistencia-actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, ClipboardCheck, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface Person {
  id: number;
  name: string;
  lastname: string;
  email: string | null;
}

interface AttendanceRecord {
  personId: number;
  attended: boolean;
  preRegistered?: boolean;
}

interface Activity {
  id: number;
  title: string;
  place: string;
  hourStart: Date | string;
  allowPreRegistration?: boolean;
}

interface Props {
  activity: Activity;
  persons: Person[];
  attendances: AttendanceRecord[];
}

export default function AttendanceForm({
  activity,
  persons,
  attendances,
}: Props) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [pending, startTransition] = useTransition();

  const attendanceMap = new Map(
    attendances.map((a) => [a.personId, a.attended])
  );
  const preRegisteredSet = new Set(
    attendances.filter((a) => a.preRegistered && !a.attended).map((a) => a.personId)
  );

  const filteredPersons = persons.filter(
    (p) =>
      `${p.name} ${p.lastname}`.toLowerCase().includes(search.toLowerCase()) ||
      p.email?.toLowerCase().includes(search.toLowerCase())
  );

  const handleToggle = (personId: number) => {
    startTransition(async () => {
      await toggleAttendance(personId, activity.id);
      router.refresh();
    });
  };

  const totalPersons = persons.length;
  const attendedCount = attendances.filter((a) => a.attended).length;

  return (
    <Card className="max-w-2xl mx-auto border-0 shadow-lg">
      <CardHeader className="pb-6 border-b bg-muted/30">
        <div className="flex items-center gap-4">
          <div className="size-12 bg-primary rounded-xl flex items-center justify-center shadow-sm">
            <ClipboardCheck className="size-6 text-primary-foreground" />
          </div>
          <div>
            <CardTitle className="text-xl">Asistencias</CardTitle>
            <CardDescription className="mt-1">
              {activity.title}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="mb-4 p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {activity.place}
            </span>
            <span className="text-sm font-medium">
              {attendedCount} / {totalPersons} asistentes
            </span>
          </div>
        </div>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar persona..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="space-y-2 max-h-[400px] overflow-y-auto">
          {filteredPersons.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">
              No se encontraron personas
            </p>
          ) : (
            filteredPersons.map((person) => {
              const isChecked = attendanceMap.get(person.id) ?? false;
              const isPreReg = preRegisteredSet.has(person.id);
              return (
                <div
                  key={person.id}
                  className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">
                        {person.name} {person.lastname}
                      </p>
                      {isPreReg && (
                        <Badge variant="outline" className="text-xs text-blue-600 border-blue-300">
                          Pre-registrado
                        </Badge>
                      )}
                    </div>
                    {person.email && (
                      <p className="text-sm text-muted-foreground">
                        {person.email}
                      </p>
                    )}
                  </div>
                  <Checkbox
                    checked={isChecked}
                    onCheckedChange={() => handleToggle(person.id)}
                    disabled={pending}
                    className="h-5 w-5"
                  />
                </div>
              );
            })
          )}
        </div>

        <div className="flex items-center gap-3 pt-6 mt-6 border-t">
          <Button type="button" variant="outline" asChild className="gap-2">
            <Link href="/app/asistencias">
              <ArrowLeft className="size-4" />
              Volver
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
