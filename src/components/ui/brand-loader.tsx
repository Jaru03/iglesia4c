import { Church } from "lucide-react";

/**
 * Pantalla de carga a pantalla completa con la identidad de la iglesia:
 * degradado de marca, logo con anillo giratorio y resplandor animado.
 */
export function BrandLoader({ label = "Cargando..." }: { label?: string }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 bg-gradient-to-b from-[#060735] via-[#0a0a4a] to-slate-900 px-4">
      <div className="relative flex items-center justify-center">
        {/* Resplandor */}
        <div className="absolute h-28 w-28 rounded-full bg-primary/40 blur-2xl animate-pulse" />
        {/* Anillo giratorio */}
        <div className="absolute h-24 w-24 rounded-full border-4 border-white/10 border-t-white animate-spin" />
        {/* Logo */}
        <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm ring-1 ring-white/20">
          <Church className="h-8 w-8 text-white" />
        </div>
      </div>

      <div className="text-center space-y-1">
        <p className="text-lg font-semibold tracking-wide text-white">Casa de Dios</p>
        <p className="text-sm text-white/60 animate-pulse">{label}</p>
      </div>
    </div>
  );
}
