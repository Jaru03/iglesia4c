"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import prisma from "@/utils/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckCircle, Search, ArrowRight, Church } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Persona = {
  id: number;
  name: string;
  lastname: string;
};

type Actividad = {
  id: number;
  title: string;
  date: string;
  hourStart: string;
  department: { name: string };
};

export default function KioskoPage() {
  const router = useRouter();
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [actividades, setActividades] = useState<Actividad[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);
  const [selectedActividad, setSelectedActividad] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/personas")
      .then((res) => res.json())
      .then(setPersonas)
      .catch(console.error);

    const today = new Date();
    const dateStr = today.toISOString().split("T")[0];

    fetch(`/api/actividades-hoy?date=${dateStr}`)
      .then((res) => res.json())
      .then(setActividades)
      .catch(console.error);
  }, []);

  const filteredPersonas = personas.filter(
    (p) =>
      searchTerm.length > 0 &&
      `${p.name} ${p.lastname}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectPersona = (persona: Persona) => {
    setSelectedPersona(persona);
    setSearchTerm(`${persona.name} ${persona.lastname}`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!selectedPersona || !selectedActividad) {
      setError("Selecciona tu nombre y la actividad");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/asistencias", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          personId: selectedPersona.id,
          activityId: parseInt(selectedActividad),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          setSelectedPersona(null);
          setSelectedActividad("");
          setSearchTerm("");
        }, 3000);
      } else {
        setError(data.error || "Error al registrar asistencia");
      }
    } catch (err) {
      setError("Error al registrar asistencia");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Church className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Bienvenido</h1>
          <p className="text-slate-400">Registra tu asistencia hoy</p>
        </div>

        <Card className="shadow-2xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-center">
              {success ? "¡Asistencia Registrada!" : "Check-in"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {success ? (
              <div className="text-center py-8">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <p className="text-lg font-semibold text-slate-800">
                  ¡Gracias por asistir!
                </p>
                <p className="text-slate-500 mt-2">
                  Tu asistencia ha sido registrada
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <Label>Tu nombre</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input
                      placeholder="Escribe tu nombre..."
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setSelectedPersona(null);
                      }}
                      className="pl-9"
                      autoComplete="off"
                    />
                  </div>
                  {searchTerm && !selectedPersona && filteredPersonas.length > 0 && (
                    <div className="bg-white border rounded-lg shadow-lg max-h-40 overflow-y-auto">
                      {filteredPersonas.slice(0, 5).map((persona) => (
                        <button
                          key={persona.id}
                          type="button"
                          onClick={() => handleSelectPersona(persona)}
                          className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-2"
                        >
                          <span className="font-medium">
                            {persona.name} {persona.lastname}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Actividad de hoy</Label>
                  <Select value={selectedActividad} onValueChange={setSelectedActividad}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona la actividad" />
                    </SelectTrigger>
                    <SelectContent>
                      {actividades.length === 0 ? (
                        <div className="px-4 py-2 text-sm text-slate-500">
                          No hay actividades hoy
                        </div>
                      ) : (
                        actividades.map((act) => (
                          <SelectItem key={act.id} value={act.id.toString()}>
                            {act.title}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Registrando..." : "Registrar Asistencia"}
                  {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        <p className="text-center text-slate-500 text-sm mt-6">
          Comunidad Cristiana Casa de Dios Madrid
        </p>
      </div>
    </div>
  );
}
