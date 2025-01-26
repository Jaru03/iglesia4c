import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";
import { Area } from "@prisma/client";

export async function GET() {
    try {
        const departaments: Area[] = await prisma.area.findMany({
            where: {
                rol: "departamento",
            },
        });

        if (departaments.length === 0) {
            return new NextResponse("No hay departamentos disponibles", { status: 404 });
        }

        return NextResponse.json(departaments);
    } catch (error: unknown) {
        console.error("Error en el servidor:", error);
        return new NextResponse(
            error instanceof Error ? error.message : "Error inesperado",
            { status: 500 }
        );
    }
}
