import prisma from "@/utils/prisma";
import { agregarUsuario, eliminarUsuario } from "@/actions/users-actions";
import { Trash2, Shield, UserPlus } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function EquipoPage() {
  const usuarios = await prisma.allowedUser.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-5xl mx-auto p-6">
      <header className="mb-8 border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-bold text-slate-800">Gestión de Equipo</h1>
        <p className="text-slate-500 mt-2">Autoriza a nuevas personas para acceder al panel de administración.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* FORMULARIO DE CREAR */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 sticky top-8">
            <h2 className="font-bold text-lg mb-4 text-slate-700 flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-blue-600" /> Nuevo Miembro
            </h2>
            
            <form action={agregarUsuario} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase">Nombre</label>
                <input type="text" name="name" placeholder="Ej: Juan Pérez" required
                  className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 mt-1" />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase">Email (Google)</label>
                <input type="email" name="email" placeholder="juan@gmail.com" required
                  className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 mt-1" />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase">Rol / Permisos</label>
                <select name="role" className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 mt-1 bg-slate-50">
                  <option value="ADMIN">Administrador (Acceso Total)</option>
                  <option value="LIDER">Líder de Jóvenes (Solo Kiosco)</option>
                </select>
              </div>

              <button type="submit" 
                className="w-full bg-slate-900 text-white font-bold py-3 rounded-lg hover:bg-slate-800 transition shadow-lg">
                Autorizar Acceso
              </button>
            </form>
          </div>
        </div>

        {/* LISTA DE USUARIOS */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="font-bold text-slate-700">Usuarios Autorizados ({usuarios.length})</h2>
          
          <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
            {usuarios.length === 0 ? (
              <div className="p-8 text-center text-slate-400">
                No hay usuarios autorizados aún.
              </div>
            ) : (
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-xs uppercase text-slate-500 font-bold">
                  <tr>
                    <th className="p-4">Usuario</th>
                    <th className="p-4">Rol</th>
                    <th className="p-4 text-right">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {usuarios.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50 transition">
                      <td className="p-4">
                        <div className="font-bold text-slate-800">{user.name || "Sin nombre"}</div>
                        <div className="text-xs text-slate-500">{user.email}</div>
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold uppercase
                          ${user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                          <Shield className="w-3 h-3" />
                          {user.role}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <form action={eliminarUsuario.bind(null, user.id)}>
                          <button className="text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </form>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}