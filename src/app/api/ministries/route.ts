import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";


export async function GET(){  
    try{
       const ministerios = await prisma.area.findMany({
        where:{
            rol: 'ministerio'
        }
       })

       if(!ministerios){
        return new NextResponse("No hay ministerios disponibles", { status: 404 }); 
       }

       return NextResponse.json(ministerios)
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