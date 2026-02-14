"use client";

import Link from "next/link";
import { useState } from "react";
import { registrarUsuarioPermitido } from "@/actions/auth-actions";

export default function RegistrarsePage() {
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    setMensaje("");
    setError("");

    const res = await registrarUsuarioPermitido(formData);

    if (res?.error) {
      setError(res.error);
    } else if (res?.success) {
      setMensaje(res.success);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm">
        <div className="mb-4">
          <Link href="/login" className="text-sm font-semibold text-slate-500 hover:text-slate-700">
            ← Volver
          </Link>
        </div>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Registrarse</h1>
          <p className="text-slate-500 text-sm mt-1">
            Solo para correos autorizados en Gestión de Equipo
          </p>
        </div>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-sm text-center font-medium border border-red-200">
            ⚠️ {error}
          </div>
        )}

        {mensaje && (
          <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-4 text-sm text-center font-medium border border-green-200">
            ✅ {mensaje}
          </div>
        )}

        <form action={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Nombre</label>
            <input
              name="nombre"
              type="text"
              placeholder="Tu nombre"
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Email</label>
            <input
              name="email"
              type="email"
              required
              placeholder="correo@iglesia.com"
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>

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

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition shadow-lg shadow-blue-200 disabled:opacity-60"
          >
            {loading ? "Creando cuenta..." : "Crear cuenta"}
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
