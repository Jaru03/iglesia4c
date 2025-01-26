import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";
import { Area } from "@prisma/client"; // Asegúrate de tener el tipo generado por Prisma

export async function GET() {
    try {
        const ministerios: Area[] = await prisma.area.findMany({
            where: {
                rol: "ministerio",
            },
        });

        // Comprobamos si el array está vacío
        if (ministerios.length === 0) {
            return new NextResponse("No hay ministerios disponibles", { status: 404 });
        }

        return NextResponse.json(ministerios);
    } catch (error: unknown) {
        // Registrar el error en el servidor
        console.error("Error al obtener ministerios:", error);

        // Devolver un mensaje de error genérico
        return new NextResponse(
            error instanceof Error ? error.message : "Error inesperado",
            { status: 500 }
        );
    }
}
