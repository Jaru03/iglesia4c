import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";
import { Area } from "@prisma/client";

// Función para retrasar entre reintentos
function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function GET() {
    const MAX_RETRIES = 3; // Número máximo de reintentos
    let retries = 0; // Contador de reintentos

    while (retries < MAX_RETRIES) {
        try {
            // Consulta para obtener los departamentos
            const departaments: Area[] = await prisma.area.findMany({
                where: {
                    rol: "departamento",
                },
            });

            // Comprobamos si no hay resultados
            if (departaments.length === 0) {
                return new NextResponse("No hay departamentos disponibles", { status: 404 });
            }

            // Si la consulta fue exitosa, devolvemos los datos
            return NextResponse.json(departaments);
        } catch (error: unknown) {
            retries++; // Incrementamos el contador de intentos
            console.error(`Error al obtener departamentos. Intento ${retries} de ${MAX_RETRIES}:`, error);

            // Si alcanzamos el límite de intentos, devolvemos un error 500
            if (retries >= MAX_RETRIES) {
                return new NextResponse(
                    error instanceof Error ? error.message : "Error inesperado tras varios reintentos",
                    { status: 500 }
                );
            }

            // Esperar 1 segundo antes de intentar nuevamente
            await sleep(1000);
        }
    }
}
