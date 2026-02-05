import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  try {
    const channelId = process.env.CHANNEL_YT_ID;
    const apiKey = process.env.YT_API_KEY;

    if (!channelId || !apiKey) {
      console.error("Faltan variables de entorno:", { channelId: !!channelId, apiKey: !!apiKey });
      return NextResponse.json(
        { error: "Configuración de YouTube incompleta" },
        { status: 500 }
      );
    }

    console.log("Consultando YouTube API...");

    const url = `https://youtube.googleapis.com/youtube/v3/search?channelId=${channelId}&part=snippet&type=video&eventType=completed&order=date&maxResults=1&key=${apiKey}`;

    const { data } = await axios.get(url);

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("YouTube API error:", error.response?.data || error.message);
    return NextResponse.json(
      { error: "Error al obtener datos de YouTube" },
      { status: 500 }
    );
  }
}
