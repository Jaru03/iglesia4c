import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";


export async function GET(request:Request, {params}: {params:Promise<{area: string}>}){

    const {area} = await params    
    try{
       const areaInformation = await prisma.area.findUnique({
        where: {
            value: `/${area}`
        }
       })
       return NextResponse.json(areaInformation)
    }catch (error: unknown) {
        // Comprobamos si el error es una instancia de Error
        if (error instanceof Error) {
            return new NextResponse(error.message, { status: 500 });
        } else {
            // Si el error no es un Error, devolvemos un mensaje genérico
            return new NextResponse("Error inesperado", { status: 500 });
        }
    }
}