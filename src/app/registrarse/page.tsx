"use client";

import { useState } from "react";
import Link from "next/link";
import { verificarPersona, completarRegistro } from "@/actions/auth-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Church, CheckCircle2, ArrowLeft } from "lucide-react";

type VerificacionData = {
  personaId: number;
  nombre: string;
  email?: string | null;
};

export default function RegistrarsePage() {
  const [paso, setPaso] = useState<1 | 2 | 3>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [verificacion, setVerificacion] = useState<VerificacionData | null>(null);

  const handleVerificar = async (formData: FormData) => {
    setLoading(true);
    setError("");

    const res = await verificarPersona(formData);

    if (res?.error) {
      setError(res.error);
    } else if (res?.personaId) {
      setVerificacion({
        personaId: res.personaId,
        nombre: res.nombre || "Usuario",
        email: res.email,
      });
      setPaso(2);
    }

    setLoading(false);
  };

  const handleCompletar = async (formData: FormData) => {
    setLoading(true);
    setError("");

    formData.set("personaId", verificacion?.personaId?.toString() || "");

    const res = await completarRegistro(formData);

    if (res?.error) {
      setError(res.error);
    } else if (res?.success) {
      setMensaje(res.success);
      setPaso(3);
    }

    setLoading(false);
  };

  if (paso === 3) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
        <Card className="w-full max-w-sm">
          <CardContent className="pt-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl">¡Cuenta creada!</CardTitle>
            <p className="text-slate-500 mt-2 mb-6">{mensaje}</p>
            <Button asChild className="w-full">
              <Link href="/login">
                Ir a iniciar sesión
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (paso === 2 && verificacion) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
        <Card className="w-full max-w-sm">
          <CardHeader className="space-y-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => { setPaso(1); setError(""); setVerificacion(null); }}
              className="w-fit -ml-2"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Volver
            </Button>
            <CardTitle className="text-xl">Completa tu registro</CardTitle>
            <CardDescription>
              Hola, {verificacion.nombre}
              {verificacion.email && <span className="block text-xs">{verificacion.email}</span>}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-sm text-center font-medium border border-red-200">
                {error}
              </div>
            )}

            <form action={handleCompletar} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <PasswordInput
                  id="password"
                  name="password"
                  required
                  placeholder="Mínimo 6 caracteres"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="passwordConfirm">Confirmar contraseña</Label>
                <PasswordInput
                  id="passwordConfirm"
                  name="passwordConfirm"
                  required
                  placeholder="Repite tu contraseña"
                />
              </div>

              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Creando cuenta..." : "Crear cuenta"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="space-y-1">
          <Link href="/login" className="inline-flex items-center text-sm text-slate-500 hover:text-slate-700 -ml-2">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Volver
          </Link>
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <Church className="h-5 w-5 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">Registrarse</CardTitle>
          <CardDescription className="text-center">
            Ingresa tu email, teléfono o documento
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-sm text-center font-medium border border-red-200">
              {error}
            </div>
          )}

          <form action={handleVerificar} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="dato">Email, teléfono o documento</Label>
              <Input
                id="dato"
                name="dato"
                type="text"
                required
                placeholder="ejemplo@correo.com"
              />
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Verificando..." : "Continuar"}
            </Button>
          </form>

          <p className="mt-4 text-center text-sm text-slate-500">
            ¿Ya tienes cuenta?{" "}
            <Link href="/login" className="text-primary font-semibold hover:underline">
              Iniciar sesión
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
