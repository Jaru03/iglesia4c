import { XMLParser } from "fast-xml-parser";

export const revalidate = 3600;

export async function GET() {
  const channelId = process.env.NEXT_PUBLIC_CHANNEL_YT_ID;

  if (!channelId) {
    return Response.json({ error: "NEXT_PUBLIC_CHANNEL_YT_ID no configurado" }, { status: 500 });
  }

  const res = await fetch(
    `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`,
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) {
    return Response.json({ error: "No se pudo obtener el feed de YouTube" }, { status: 502 });
  }

  const xml = await res.text();
  const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: "@_" });
  const data = parser.parse(xml);

  const entries: any[] = Array.isArray(data.feed.entry) ? data.feed.entry : [data.feed.entry];

  const videos = entries.filter((v) => v && !String(v.title).includes("#")).map((v) => {
    const id = v["yt:videoId"];
    return {
      title: v.title,
      videoId: id,
      link: `https://www.youtube.com/watch?v=${id}`,
      thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
      published: v.published,
    };
  });

  return Response.json(videos);
}
