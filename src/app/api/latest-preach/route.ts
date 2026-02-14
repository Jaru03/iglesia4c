import { NextResponse } from "next/server";
export const revalidate = 3600;

export async function GET() {
  try {
    // 1. Usamos los nombres EXACTOS que tienes en tu archivo .env
    const channelId = process.env.NEXT_PUBLIC_CHANNEL_YT_ID;
    const apiKey = process.env.NEXT_PUBLIC_YT_API_KEY;

    if (!channelId || !apiKey) {
      console.error(" Faltan las API Keys de YouTube en el .env");
      return NextResponse.json(
        { error: "Configuración de YouTube incompleta" },
        { status: 500 }
      );
    }

    // 2. Construimos la URL
    // Quitamos 'eventType=completed' para que traiga TANTO videos subidos COMO directos pasados.
    const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=1&type=video`;

    // 3. Usamos fetch nativo (mejor para Next.js que axios)
    const response = await fetch(url, {
      next: { revalidate: 3600 } // Doble seguridad de caché
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error("YouTube API Error:", errorData);
        throw new Error("Error conectando con YouTube");
    }

    const data = await response.json();

    return NextResponse.json(data);
    
  } catch (error: any) {
    console.error("Server Error:", error.message);
    return NextResponse.json(
      { error: "Error interno al obtener datos" },
      { status: 500 }
    );
  }
}