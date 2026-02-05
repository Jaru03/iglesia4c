import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HideInAdmin from "@/components/HideInAdmin";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ScrollToTop } from "@/components/ScrollToTop";
export const metadata: Metadata = {
  title: "Comunidad Cristiana Casa de Dios Madrid",
  description: "Comunidad Cristiana Casa de Dios Madrid",
};

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={inter.className}
      >
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
      </body>
    </html>
  );
}