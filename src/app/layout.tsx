import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HideInAdmin from "@/components/HideInAdmin";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Providers } from "@/components/Providers";
import { OrganizationJsonLd } from "@/components/seo/OrganizationJsonLd";
import { GoogleTagManager, GoogleAnalytics } from "@next/third-parties/google";

const SITE_URL = "https://casadedios.es";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Casa de Dios Madrid | Iglesia Cristiana en Madrid",
    template: "%s | Casa de Dios Madrid",
  },
  description:
    "Comunidad Cristiana Casa de Dios: iglesia evangélica en Madrid con sedes en Plaza de Castilla, Estrecho, Lucero, Getafe, Pinto, Parla y Tarancón. Cultos, oración, actividades y una familia de fe que te espera.",
  applicationName: "Casa de Dios Madrid",
  keywords: [
    "iglesia en Madrid",
    "iglesias en Madrid",
    "iglesia Madrid",
    "iglesia cristiana Madrid",
    "iglesia evangélica Madrid",
    "Casa de Dios",
    "Casa de Dios Madrid",
    "Comunidad Cristiana Casa de Dios",
    "iglesia Plaza de Castilla",
    "iglesia Tetuán",
    "iglesia Estrecho",
    "iglesia Lucero",
    "iglesia Getafe",
    "iglesia Pinto",
    "iglesia Parla",
    "iglesia Tarancón",
    "cultos Madrid",
    "oración Madrid",
    "iglesia cerca de mí",
    "casadedios.es",
  ],
  authors: [{ name: "Comunidad Cristiana Casa de Dios", url: SITE_URL }],
  creator: "Comunidad Cristiana Casa de Dios",
  publisher: "Comunidad Cristiana Casa de Dios",
  category: "religion",
  alternates: {
    canonical: "/",
    languages: {
      "es-ES": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: SITE_URL,
    siteName: "Comunidad Cristiana Casa de Dios Madrid",
    title: "Casa de Dios Madrid | Iglesia Cristiana en Madrid",
    description:
      "Iglesia evangélica en Madrid. Únete a nuestros cultos, actividades y familia de fe. Sedes en Plaza de Castilla, Estrecho, Lucero, Getafe, Pinto, Parla y Tarancón.",
    images: [
      {
        url: "/cdd-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Comunidad Cristiana Casa de Dios Madrid",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Casa de Dios Madrid | Iglesia Cristiana en Madrid",
    description:
      "Iglesia evangélica en Madrid. Cultos, oración y una familia de fe que te espera.",
    images: ["/cdd-banner.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/logoCCCD.jpg", type: "image/jpeg" },
    ],
    apple: [{ url: "/logoCCCD.jpg" }],
  },
  verification: {
    // Añade aquí el código de Google Search Console cuando lo tengas:
    // google: "xxxxxxxxxxxxxxxxxxxxxxxx",
  },
};

export const viewport: Viewport = {
  themeColor: "#060735",
  width: "device-width",
  initialScale: 1,
};

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="es-ES" suppressHydrationWarning>
      {gtmId && <GoogleTagManager gtmId={gtmId} />}
      {gaId && <GoogleAnalytics gaId={gaId} />}
      <body className={inter.className}>
        <OrganizationJsonLd />

        <Providers>
            
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
              <TooltipProvider delayDuration={300}>
                <a href="#main-content" className="skip-link">
                  Saltar al contenido principal
                </a>
                
                <HideInAdmin>
                  <Navbar/>
                </HideInAdmin>

                <main id="main-content" tabIndex={-1}>
                  {children}
                </main>

                <HideInAdmin>
                  <Footer/>
                </HideInAdmin>
                
                <ScrollToTop />
              </TooltipProvider>
            </ThemeProvider>

        </Providers>

      </body>
    </html>
  );
}