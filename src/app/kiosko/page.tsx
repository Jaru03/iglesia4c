// src/app/kiosko/page.tsx
"use client";

import { useState } from "react";
// Importamos la lógica que acabamos de arreglar
import { marcarAsistencia } from "@/actions/marcar-asistencia";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function KioskoPage() {
  const [documento, setDocumento] = useState("");
  const [mensaje, setMensaje] = useState<{ texto: string; tipo: "exito" | "error" } | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!documento) return;

    setLoading(true);
    setMensaje(null);

    // Llamamos a tu Server Action
    const res = await marcarAsistencia(documento);

    setLoading(false);

    if (res?.success) {
      setMensaje({ texto: res.mensaje || "¡Bienvenido!", tipo: "exito" });
      setDocumento(""); // Limpiamos el campo para el siguiente
    } else {
      setMensaje({ texto: res?.error || "Error desconocido", tipo: "error" });
    }

    // El mensaje se borra solo a los 3 segundos
    setTimeout(() => setMensaje(null), 3000);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 p-4">
      <h1 className="text-white text-4xl font-bold mb-8 tracking-widest uppercase">
        Casa de Dios
      </h1>

      <Card className="w-full max-w-md shadow-2xl border-slate-800">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-slate-800">
            Registro de Asistencia
          </CardTitle>
          <p className="text-slate-500 text-sm">Ingresa tu documento</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              type="text"
              placeholder="DNI / Documento"
              value={documento}
              onChange={(e) => setDocumento(e.target.value)}
              className="text-center text-3xl h-16 tracking-widest font-mono"
              autoFocus
            />
            
            <Button 
              type="submit" 
              disabled={loading}
              className="w-full h-12 text-lg font-bold bg-blue-600 hover:bg-blue-700 transition-all"
            >
              {loading ? "Marcando..." : "MARCAR ASISTENCIA 📍"}
            </Button>
          </form>

          {/* Zona de Mensajes */}
          {mensaje && (
            <div className={`mt-6 p-4 rounded-xl text-center font-bold text-lg animate-in fade-in slide-in-from-bottom-2 ${
              mensaje.tipo === 'exito' 
                ? 'bg-green-100 text-green-700 border-2 border-green-200' 
                : 'bg-red-100 text-red-700 border-2 border-red-200'
            }`}>
              {mensaje.texto}
            </div>
          )}
        </CardContent>
      </Card>
      
      <p className="text-slate-500 mt-8 text-xs">Sistema de Gestión de Jóvenes</p>
    </div>
  );
}