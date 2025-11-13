import type { Metadata } from "next";
import "./globals.css";
import { Montserrat } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Comunidad Cristiana Casa de Dios Madrid",
  description: "Comunidad Cristiana Casa de Dios Madrid",
};

const montserrat = Montserrat({ subsets: ['latin'] })
 

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={montserrat.className}
      >
        <Navbar/>
        <main>
        {children}
        </main>
        <Footer/>
      </body>
    </html>
  );
}
