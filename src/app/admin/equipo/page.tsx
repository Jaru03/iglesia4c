import prisma from "@/utils/prisma";
import { obtenerUsuarios, eliminarUsuario } from "@/actions/users-actions";
import { Trash2, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function EquipoPage() {
  const usuarios = await obtenerUsuarios();

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <header className="border-b border-slate-200 pb-4">
        <h1 className="text-3xl font-bold text-slate-800">Gestión de Equipo</h1>
        <p className="text-slate-500 mt-1">Usuarios con acceso al panel</p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Usuarios ({usuarios.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {usuarios.length === 0 ? (
            <p className="text-center text-slate-400 py-8">Sin usuarios</p>
          ) : (
            <div className="divide-y divide-slate-100">
              {usuarios.map((user) => (
                <div key={user.id} className="flex items-center justify-between py-4">
                  <div>
                    <p className="font-semibold text-slate-800">
                      {user.person?.name} {user.person?.lastname}
                    </p>
                    <p className="text-sm text-slate-500">{user.person?.email}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={user.role === "ADMIN" ? "default" : "secondary"}>
                      <Shield className="w-3 h-3 mr-1" />
                      {user.role}
                    </Badge>
                    <form action={eliminarUsuario}>
                      <input type="hidden" name="userId" value={user.id} />
                      <Button type="submit" variant="ghost" size="icon" className="text-red-400 hover:text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
