import type { Metadata } from "next";
import "./globals.css";
import { Inter, Montserrat } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HideInAdmin from "@/components/HideInAdmin"; 
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
    <html lang="es">
      <body
        className={inter.className}
      >
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
      </body>
    </html>
  );
}