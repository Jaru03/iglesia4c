import { uploadCloudinary } from "@/utils/cloudinary";
import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const data = await request.formData();
    const image = data.get("image") as File;
    const title = data.get("title") as string
    const description = data.get("description") as string

    if (!image) {
        return NextResponse.json("No se ha subido ninguna imagen", { status: 400 });
    }

    try {
        // Subir la imagen a Cloudinary y esperar la respuesta
        const response = await uploadCloudinary(image);

        // Acceder a la URL segura de la imagen subida a Cloudinary
        const secureUrl = response.secure_url;

        await prisma.preachs.create({
            data: {
                title,
                description,
                img: secureUrl,
            }
        })

        return NextResponse.json({ message: "Predicacion creada", url: secureUrl, title: title, description: description });

    } catch (error: unknown) {
        // Verificación de tipo del error
        if (error instanceof Error) {
            console.error("Error al subir la imagen:", error.message);
            return NextResponse.json({ message: "Error al subir la imagen", error: error.message }, { status: 500 });
        } else {
            // Si el error no es un Error estándar, manejamos el caso
            console.error("Error desconocido:", error);
            return NextResponse.json({ message: "Error desconocido al subir la imagen" }, { status: 500 });
        }
    }
}

export async function GET() {
    const preachings = await prisma.preachs.findMany()
    if (!preachings) {
        return new NextResponse("No hay ministerios disponibles", { status: 404 });
    }
    return NextResponse.json(preachings)
}
