import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";
import { Area } from "@prisma/client";

export async function GET() {
    const MAX_RETRIES = 3; // Número máximo de reintentos
    let retries = 0; // Contador de reintentos

    while (retries < MAX_RETRIES) {
        try {
            const ministerios: Area[] = await prisma.area.findMany({
                where: {
                    rol: "ministerio",
                },
            });

            // Si el array está vacío, devolvemos un 404
            if (ministerios.length === 0) {
                return new NextResponse("No hay ministerios disponibles", { status: 404 });
            }

            // Si todo salió bien, devolvemos los datos
            return NextResponse.json(ministerios);
        } catch (error: unknown) {
            retries++; // Incrementamos el contador de reintentos
            console.error(`Error al obtener ministerios. Intento ${retries} de ${MAX_RETRIES}:`, error);

            // Si alcanzamos el número máximo de reintentos, devolvemos el error
            if (retries >= MAX_RETRIES) {
                return new NextResponse(
                    error instanceof Error ? error.message : "Error inesperado tras varios reintentos",
                    { status: 500 }
                );
            }
        }
    }
}
