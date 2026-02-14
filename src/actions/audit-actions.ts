"use server";

import prisma from "@/utils/prisma";

type AuditPayload = {
  module: string;
  action: string;
  entity: string;
  entityId?: string;
  description?: string;
  actorEmail?: string;
};

export async function logAudit(payload: AuditPayload) {
  try {
    const auditLog = (prisma as any).auditLog;
    if (!auditLog) return;

    await auditLog.create({
      data: {
        module: payload.module,
        action: payload.action,
        entity: payload.entity,
        entityId: payload.entityId,
        description: payload.description,
        actorEmail: payload.actorEmail || "sistema",
      },
    });
  } catch (error) {
    console.error("No se pudo guardar auditoría:", error);
  }
}
