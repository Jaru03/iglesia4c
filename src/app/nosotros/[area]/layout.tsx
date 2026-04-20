import type { Metadata } from "next";

const AREA_META: Record<string, { title: string; description: string }> = {
  jovenes: {
    title: "Jóvenes | Ministerio de Jóvenes - Casa de Dios Madrid",
    description:
      "Ministerio de jóvenes de la iglesia Casa de Dios en Madrid. Encuentros, reuniones y una comunidad de jóvenes cristianos apasionados por Jesús.",
  },
  mujeres: {
    title: "Mujeres | Ministerio de Mujeres - Casa de Dios Madrid",
    description:
      "Ministerio de mujeres de la iglesia Casa de Dios Madrid. Encuentros, discipulado y una comunidad de mujeres que crece en la fe.",
  },
  matrimonios: {
    title: "Matrimonios | Ministerio de Parejas - Casa de Dios Madrid",
    description:
      "Ministerio de matrimonios de la iglesia Casa de Dios en Madrid. Talleres, retiros y apoyo bíblico para parejas.",
  },
  evangelismo: {
    title: "Evangelismo | Misión y Evangelización - Casa de Dios Madrid",
    description:
      "Ministerio de evangelismo de la iglesia Casa de Dios en Madrid. Compartimos el evangelio en Madrid y más allá.",
  },
  alabanza: {
    title: "Alabanza | Ministerio de Música y Adoración - Casa de Dios Madrid",
    description:
      "Ministerio de alabanza y adoración de la iglesia Casa de Dios en Madrid. Música, adoración y conexión con Dios.",
  },
  iglekids: {
    title: "Iglekids | Ministerio Infantil - Casa de Dios Madrid",
    description:
      "Ministerio infantil Iglekids de la iglesia Casa de Dios Madrid. Actividades bíblicas y diversión para niños.",
  },
  misiones: {
    title: "Misiones | Ministerio Misionero - Casa de Dios Madrid",
    description:
      "Ministerio de misiones de la iglesia Casa de Dios en Madrid. Llevamos el evangelio a las naciones.",
  },
};

type Props = {
  params: Promise<{ area: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({
  params,
}: Omit<Props, "children">): Promise<Metadata> {
  const { area } = await params;
  const info = AREA_META[area];

  if (!info) {
    return {
      title: "Ministerios | Casa de Dios Madrid",
      description:
        "Ministerios y áreas de servicio de la iglesia Casa de Dios en Madrid.",
      alternates: { canonical: `/nosotros/${area}` },
    };
  }

  return {
    title: info.title,
    description: info.description,
    alternates: { canonical: `/nosotros/${area}` },
    openGraph: {
      title: info.title,
      description: info.description,
      url: `/nosotros/${area}`,
      type: "website",
    },
  };
}

export default function AreaLayout({ children }: Props) {
  return <>{children}</>;
}
