import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";


export async function GET(){  
    try{
       const departaments = await prisma.area.findMany({
        where:{
            rol: 'departamento'
        }
       })

       if(!departaments){
        return new NextResponse("No hay departamentos disponibles", { status: 404 }); 
       }

       return NextResponse.json(departaments)
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