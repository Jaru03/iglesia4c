"use client";

import { useRouter } from "next/navigation";
import { Pencil, Plus, Users } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageLayout } from "@/components/dashboard/PageLayout";
import { ResourceList } from "@/components/dashboard/ResourceList";
import { ListItem } from "@/components/dashboard/ListItem";
import { FloatingActionButton } from "@/components/admin/FloatingActionButton";
import toast from "react-hot-toast";

export interface DeptMember {
  personId: number;
  name: string;
  lastname: string;
  email: string | null;
}

export interface DeptInfo {
  id: number;
  name: string;
  description: string | null;
  memberCount: number;
  activityCount: number;
}

export interface DepartamentoViewProps {
  dept: DeptInfo;
  members: DeptMember[];

  // Multi-dept tabs
  allDepts?: { id: number; name: string }[];
  activeDeptId?: number;

  // Permissions
  canEdit?: boolean;
  canAddMembers?: boolean;
  canRemoveMembers?: boolean;
  disableAddMember?: boolean;

  // Hrefs
  editHref?: string;
  addMemberHref?: string;

  // Server action to remove a member
  onRemoveMember?: (personId: number, deptId: number) => Promise<{ error?: string } | void>;
}

export function DepartamentoView({
  dept,
  members,
  allDepts = [],
  activeDeptId,
  canEdit = false,
  canAddMembers = false,
  canRemoveMembers = false,
  disableAddMember = false,
  editHref,
  addMemberHref,
  onRemoveMember,
}: DepartamentoViewProps) {
  const router = useRouter();

  const tabs =
    allDepts.length > 1 ? (
      <Tabs
        value={(activeDeptId ?? dept.id).toString()}
        onValueChange={(id) => router.push(`?dept=${id}`)}
      >
        <TabsList>
          {allDepts.map((d) => (
            <TabsTrigger key={d.id} value={d.id.toString()}>
              {d.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    ) : undefined;

  return (
    <>
      <PageLayout
        title={dept.name}
        subtitle={dept.description ?? undefined}
        tabs={tabs}
        stats={[
          { title: "Miembros", value: dept.memberCount, icon: Users, colorIndex: 0 },
          { title: "Actividades", value: dept.activityCount, icon: Users, colorIndex: 1 },
        ]}
        listTitle="Miembros del departamento"
      >
        <ResourceList
          items={members.map((m) => ({ ...m, id: m.personId }))}
          emptyMessage="No hay miembros en este departamento."
          emptyIconName="Users"
          renderItem={(member) => (
            <ListItem
              key={member.personId}
              avatar={{ icon: Users, color: "blue", shape: "circle" }}
              title={`${member.name} ${member.lastname}`}
              meta={member.email ? [{ text: member.email }] : []}
              {...(canRemoveMembers && onRemoveMember
                ? {
                    deleteTitle: "Quitar del departamento",
                    deleteItemName: `${member.name} ${member.lastname}`,
                    onDelete: async () => {
                      const res = await onRemoveMember(member.personId, dept.id);
                      if (res && "error" in res && res.error) {
                        toast.error(res.error);
                        return res;
                      }
                      toast.success("Persona removida del departamento");
                    },
                  }
                : {})}
            />
          )}
        />
      </PageLayout>

      {canEdit && editHref && (
        <FloatingActionButton
          href={editHref}
          label={disableAddMember ? "Gestionar departamento" : "Editar departamento"}
          icon={Pencil}
          bottomClass={disableAddMember ? "bottom-6" : "bottom-24"}
          size={disableAddMember ? "lg" : "default"}
          variant="secondary"
        />
      )}
      {canAddMembers && addMemberHref && !disableAddMember && (
        <FloatingActionButton href={addMemberHref} label="Agregar persona" icon={Plus} />
      )}
    </>
  );
}
