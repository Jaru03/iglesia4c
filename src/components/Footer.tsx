import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
  Heart,
  Clock,
  Users
} from "lucide-react";

interface FooterContact {
  name: string;
  url: string;
  icon: string;
  value: string;
}

const Footer = () => {
  const footerContact: FooterContact[] = [
    {
      name: "email",
      url: "mailto:secretaria@casadedios.es",
      icon: "/email-icon.png",
      value: "secretaria@casadedios.es",
    },
    {
      name: "phone",
      url: "tel:+34637650111",
      icon: "/phone-icon.png",
      value: "+34 637-650111",
    },
    {
      name: "TikTok",
      url: "https://www.tiktok.com/@casadediosmadrid",
      icon: "/tiktok-icon.png",
      value: "TikTok",
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/casadediosmadrid/",
      icon: "/instagram-icon.svg",
      value: "Instagram",
    },
    {
      name: "YouTube",
      url: "https://www.youtube.com/@casasdediosmadrid",
      icon: "/youtube-icon.svg",
      value: "YouTube",
    },
  ];

  const quickLinks = [
    { name: "Inicio", href: "/" },
    { name: "Nosotros", href: "/nosotros" },
    { name: "Visítanos", href: "/visitanos" },
    { name: "Actividades", href: "/actividades" },
    { name: "Donaciones", href: "/donaciones" },
    { name: "Oración", href: "/oracion" },
  ];

  const serviceInfo = [
    { icon: Clock, text: "Domingos 10:00 AM", label: "Culto Dominical" },
    { icon: MapPin, text: "Plaza Castilla, Madrid", label: "Ubicación" },
    { icon: Users, text: "+200 Miembros", label: "Comunidad" },
  ];

  return (
    <footer className="bg-primary relative overflow-hidden"> 

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <Image
                alt="Casa de Dios"
                className="h-36 w-auto mx-auto"
                src="/logoCCCD-white.jpg"
                width={120}
                height={80}
              />
            </Link>

            <p className="text-white text-lg leading-relaxed mb-6 max-w-md">
              Una comunidad cristiana dedicada a compartir el amor de Cristo,
              fortalecer la fe y servir a nuestra ciudad con compasión y esperanza.
            </p>

            {/* Service Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {serviceInfo.map((info, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <info.icon className="w-6 h-6 text-white mb-2" />
                  <p className="text-white font-semibold text-sm">{info.label}</p>
                  <p className="text-white/80 text-xs">{info.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-xl font-bold mb-6">Enlaces Rápidos</h3>
            <ul className="space-y-3" role="list" aria-label="Enlaces rápidos">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    aria-label={`Ir a ${link.name}`}
                    className="text-white hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <div className="w-1.5 h-1.5 bg-white/40 rounded-full group-hover:bg-white transition-colors"></div>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-white text-xl font-bold mb-6">Conecta Con Nosotros</h3>

            {/* Contact Info */}
            <div className="space-y-4 mb-6">
              <a
                href="mailto:secretaria@casadedios.es"
                aria-label="Enviar email a secretaria@casadedios.es"
                className="flex items-center gap-3 text-white hover:text-white transition-colors group"
              >
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-sm">secretaria@casadedios.es</p>
                </div>
              </a>

              <a
                href="tel:+34637650111"
                aria-label="Llamar al +34 637-650111"
                className="flex items-center gap-3 text-white hover:text-white transition-colors group"
              >
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium">Teléfono</p>
                  <p className="text-sm">+34 637-650111</p>
                </div>
              </a>
            </div>

            {/* Social Media */}
            <div>
              <p className="text-white/80 font-medium mb-3">Síguenos</p>
              <div className="flex gap-3">
                {footerContact
                  .filter((item) => ["TikTok", "Instagram", "YouTube"].includes(item.value))
                  .map((item) => (
                <a
                      key={item.name}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Síguenos en ${item.name}`}
                      className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110 group"
                    >
                      <Image
                        alt={`Icono de ${item.name}`}
                        src={item.icon}
                        width={24}
                        height={24}
                        className="filter brightness-0 invert group-hover:brightness-100"
                      />
                    </a>
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-white/80">
              <p className="text-sm">
                © 2025 Comunidad Cristiana Casa de Dios. Todos los derechos reservados.
              </p>
            </div>

            <div className="flex items-center gap-6">
              <Link
                href="/privacidad"
                className="text-white/80 hover:text-white text-sm transition-colors"
              >
                Política de Privacidad
              </Link>
              <span className="text-white/40">•</span>
              <Link
                href="/nosotros"
                className="text-white/80 hover:text-white text-sm transition-colors"
              >
                Sobre Nosotros
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
