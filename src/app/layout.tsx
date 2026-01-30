import type { Metadata } from "next";
import "./globals.css";
import { Inter, Montserrat } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HideInAdmin from "@/components/HideInAdmin";
import { ThemeProvider } from "@/components/theme-provider";
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
          {/* 1. Protegemos el Navbar */}
          <HideInAdmin>
            <Navbar/>
          </HideInAdmin>

          <main>
            {children}
          </main>

          {/* 2. Protegemos el Footer */}
          <HideInAdmin>
            <Footer/>
          </HideInAdmin>
        </ThemeProvider>
      </body>
    </html>
  );
}