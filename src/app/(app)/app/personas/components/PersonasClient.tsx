"use client";

import { Users } from "lucide-react";
import { PageLayout } from "@/components/dashboard/PageLayout";
import { ResourceList } from "@/components/dashboard/ResourceList";
import { ListItem } from "@/components/dashboard/ListItem";
import { quitarPersonaDeDepartamento } from "@/actions/lider-actions";
import { eliminarPersona } from "@/actions/personas-actions";
import toast from "react-hot-toast";

interface Person {
  id: number;
  name: string;
  lastname: string;
  email: string | null;
  phone: string | null;
  document: string | null;
  membershipStatus: string | null;
  active: boolean;
}

interface Miembro {
  id: number;
  roleInDept: string | null;
  person: Person;
}

type Role = "ADMIN" | "RESPONSIBLE" | "LEADER";

interface Props {
  personasData: {
    type: "persons";
    data: Person[];
  } | {
    type: "members";
    data: Miembro[];
  };
  role: Role;
  departmentId?: number;
  departmentName?: string;
  churchId?: number;
  churchName?: string;
}

const statusLabel: Record<string, string> = {
  MEMBER: "Miembro",
  VISITOR: "Visitante",
  INACTIVE: "Inactivo",
};

type PersonaItem = {
  id: number;
  name: string;
  lastname: string;
  email: string | null;
  membershipStatus: string | null;
  roleInDept?: string | null;
};

export function PersonasClient({ 
  personasData, 
  role, 
  departmentId, 
  departmentName,
  churchId,
  churchName 
}: Props) {
  const isLeader = role === "LEADER";
  const isAdmin = role === "ADMIN";
  const isResponsable = role === "RESPONSIBLE";
  const canEdit = isAdmin || isResponsable;
  const canDelete = isAdmin || isResponsable;
  
  const subtitle = departmentName || churchName || (isAdmin ? "Todas las personas" : "Personas");

  // Transformar datos según el tipo
  const items: PersonaItem[] = personasData.type === "members"
    ? personasData.data.map((m) => ({
        id: m.person.id,
        name: m.person.name,
        lastname: m.person.lastname,
        email: m.person.email,
        membershipStatus: m.person.membershipStatus,
        roleInDept: m.roleInDept,
      }))
    : personasData.data.map((p) => ({
        id: p.id,
        name: p.name,
        lastname: p.lastname,
        email: p.email,
        membershipStatus: p.membershipStatus,
      }));

  const totalMiembros = items.filter(i => i.membershipStatus === "MEMBER").length;
  const totalVisitantes = items.filter(i => i.membershipStatus === "VISITOR").length;
  const totalLideres = items.filter(i => i.roleInDept === "LEADER").length;

  const handleDelete = async (item: PersonaItem) => {
    const name = `${item.name} ${item.lastname}`;
    
    if (isLeader && departmentId) {
      const formData = new FormData();
      formData.append("departmentId", departmentId.toString());
      formData.append("personId", item.id.toString());
      await quitarPersonaDeDepartamento(formData);
      toast.success(`${name} eliminado del departamento`);
    } else if (canDelete) {
      const formData = new FormData();
      formData.append("id", item.id.toString());
      await eliminarPersona(formData);
      toast.success(`${name} eliminado`);
    }
  };

  return (
    <PageLayout
      title="Personas"
      subtitle={subtitle}
      statsColumns={4}
      stats={[
        { title: "Total personas", value: items.length, icon: Users, colorIndex: 0 },
        { title: "Miembros", value: totalMiembros, icon: Users, colorIndex: 1 },
        { title: "Visitantes", value: totalVisitantes, icon: Users, colorIndex: 2 },
        { title: "Líderes", value: totalLideres, icon: Users, colorIndex: 3 },
      ]}
      listTitle={isLeader ? "Miembros del departamento" : "Personas"}
      fab={
        (isAdmin || isResponsable)
          ? { href: "/app/personas/crear", label: "Nueva persona" }
          : isLeader && departmentId
            ? { href: "/app/personas/agregar", label: "Agregar persona" }
            : undefined
      }
    >
      <ResourceList
        items={items}
        emptyMessage={isLeader ? "No hay personas en este departamento." : "No hay personas."}
        emptyIconName="Users"
        renderItem={(item) => (
          <ListItem
            avatar={{ icon: Users, color: "blue", shape: "circle" }}
            title={`${item.name} ${item.lastname}`}
            meta={item.email ? [{ text: item.email }] : []}
            badges={[
              ...(item.membershipStatus
                ? [{ label: statusLabel[item.membershipStatus] ?? item.membershipStatus, variant: "outline" as const }]
                : []),
              ...(item.roleInDept
                ? [{ label: item.roleInDept === "LEADER" ? "Líder" : item.roleInDept, variant: "secondary" as const }]
                : []),
            ]}
            {...(canDelete && {
              onDelete: () => handleDelete(item),
              deleteTitle: isLeader ? "Quitar del departamento" : "Eliminar persona",
              deleteItemName: `${item.name} ${item.lastname}`,
            })}
            {...(canEdit && {
              editHref: `/app/personas/editar?id=${item.id}`,
            })}
          />
        )}
      />
    </PageLayout>
  );
}
