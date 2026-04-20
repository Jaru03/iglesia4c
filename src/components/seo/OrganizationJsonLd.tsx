import { churches } from "@/mocks/churchues";

const SITE_URL = "https://casadedios.es";

const DAY_MAP: Record<string, string> = {
  Lunes: "Monday",
  Martes: "Tuesday",
  Miércoles: "Wednesday",
  Miercoles: "Wednesday",
  Jueves: "Thursday",
  Viernes: "Friday",
  Sábado: "Saturday",
  Sabado: "Saturday",
  Domingo: "Sunday",
};

type Horario = { dia: string; horario: string | string[] };

function parseAddress(place: string) {
  const parts = place.split(",").map((s) => s.trim());
  const last = parts[parts.length - 1] ?? "";
  const match = last.match(/(\d{5})\s*(.*)/);
  const postalCode = match?.[1];
  const locality = match?.[2]?.trim() || parts[parts.length - 1] || "Madrid";
  const streetAddress = match
    ? parts.slice(0, -1).join(", ")
    : parts.slice(0, -1).join(", ") || place;
  return {
    streetAddress: streetAddress || place,
    postalCode: postalCode || undefined,
    addressLocality: locality || "Madrid",
    addressRegion: "Comunidad de Madrid",
    addressCountry: "ES",
  };
}

function buildOpeningHours(horario: Horario[]) {
  return horario.flatMap((h) => {
    const dayOfWeek = DAY_MAP[h.dia];
    if (!dayOfWeek) return [];
    const times = Array.isArray(h.horario) ? h.horario : [h.horario];
    return times.map((t) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek,
      opens: t,
      closes: t,
    }));
  });
}

export function OrganizationJsonLd() {
  const subOrganizations = churches.map((c) => {
    const addr = parseAddress(c.place);
    const telefono = c.socialLinks.find((s) => s.name === "Teléfono");
    const email = c.socialLinks.find((s) => s.name === "Email");
    const sameAs = c.socialLinks
      .filter((s) => s.url.startsWith("http"))
      .map((s) => s.url);

    return {
      "@type": ["Church", "LocalBusiness"],
      "@id": `${SITE_URL}/visitanos#${c.title.replace(/\s+/g, "-").toLowerCase()}`,
      name: c.title,
      description: c.description,
      url: `${SITE_URL}/visitanos`,
      image: `${SITE_URL}/cdd-banner.jpg`,
      telephone: telefono?.value,
      email: email?.value,
      address: {
        "@type": "PostalAddress",
        ...addr,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: c.coords[0],
        longitude: c.coords[1],
      },
      openingHoursSpecification: buildOpeningHours(c.horario as Horario[]),
      sameAs,
    };
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Church", "Organization"],
        "@id": `${SITE_URL}/#organization`,
        name: "Comunidad Cristiana Casa de Dios",
        alternateName: ["Casa de Dios Madrid", "Casa de Dios", "CCCD"],
        url: SITE_URL,
        logo: `${SITE_URL}/logoCCCD.jpg`,
        image: `${SITE_URL}/cdd-banner.jpg`,
        description:
          "Iglesia cristiana evangélica en Madrid con varias sedes. Cultos, oración, actividades y una familia de fe que te espera.",
        areaServed: [
          { "@type": "City", name: "Madrid" },
          { "@type": "AdministrativeArea", name: "Comunidad de Madrid" },
        ],
        sameAs: [
          "https://www.instagram.com/casadediosmadrid/",
          "https://www.tiktok.com/@casadediosmadrid",
          "https://www.youtube.com/@casadediosmadrid",
        ],
        subOrganization: subOrganizations,
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Casa de Dios Madrid",
        inLanguage: "es-ES",
        publisher: { "@id": `${SITE_URL}/#organization` },
        potentialAction: {
          "@type": "SearchAction",
          target: `${SITE_URL}/actividades?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
