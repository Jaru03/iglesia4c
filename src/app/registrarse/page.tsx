"use client";

import { useState } from "react";
import Link from "next/link";
import { verificarPersona, completarRegistro } from "@/actions/auth-actions";

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
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">✅</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-800">¡Cuenta creada!</h1>
          <p className="text-slate-500 mt-2 mb-6">{mensaje}</p>
          <Link
            href="/login"
            className="block w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Ir a iniciar sesión
          </Link>
        </div>
      </div>
    );
  }

  if (paso === 2 && verificacion) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-slate-800">Completa tu registro</h1>
            <p className="text-slate-500 text-sm mt-1">Hola, {verificacion.nombre}</p>
            {verificacion.email && (
              <p className="text-slate-400 text-xs mt-1">{verificacion.email}</p>
            )}
          </div>

          {error && (
            <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-sm text-center font-medium border border-red-200">
              {error}
            </div>
          )}

          <form action={handleCompletar} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Contraseña</label>
              <input
                name="password"
                type="password"
                required
                placeholder="Mínimo 6 caracteres"
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Confirmar contraseña</label>
              <input
                name="passwordConfirm"
                type="password"
                required
                placeholder="Repite tu contraseña"
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition shadow-lg shadow-blue-200 disabled:opacity-60"
            >
              {loading ? "Creando cuenta..." : "Crear cuenta"}
            </button>
          </form>

          <button
            onClick={() => { setPaso(1); setError(""); setVerificacion(null); }}
            className="mt-4 w-full text-slate-500 text-sm hover:text-slate-700"
          >
            ← Volver
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Registrarse</h1>
          <p className="text-slate-500 text-sm mt-1">
            Ingresa tu email, teléfono o documento
          </p>
        </div>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-sm text-center font-medium border border-red-200">
            {error}
          </div>
        )}

        <form action={handleVerificar} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Email, teléfono o documento</label>
            <input
              name="dato"
              type="text"
              required
              placeholder="ejemplo@correo.com"
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition shadow-lg shadow-blue-200 disabled:opacity-60"
          >
            {loading ? "Verificando..." : "Continuar"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          ¿Ya tienes cuenta?{" "}
          <Link href="/login" className="text-blue-600 font-semibold hover:text-blue-700">
            Iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
