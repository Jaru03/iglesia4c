import Image from "next/image";
import Link from "next/link";

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

  return (
    <footer className="bg-primary">
      <div className="p-4 md:p-0 max-w-7xl mx-auto text-white text-base md:text-base-desktop">
        <ul className="grid p-4 gap-8 md:gap-0 md:grid-cols-[repeat(4,_auto)] items-center justify-items-center">
          <li>
            <Link href={'/'}>
            <Image alt="" className="aspect-auto" src={"/logoCCCD-white.jpg"} width={120} height={80} />
            </Link>
          </li>
          {footerContact
            .filter(
              (social) =>
                !(
                  social.value === "TikTok" ||
                  social.value === "Instagram" ||
                  social.value === "YouTube"
                )
            )
            .map((item) => (
              <li className="" key={item.name}>
                <Link href={item.url} className={`flex items-center gap-2`}>
                  <Image
                    alt={item.name}
                    src={item.icon}
                    width={20}
                    height={20}
                  />
                  {item.value}
                </Link>
              </li>
            ))}

          <li className="flex gap-4">
            {footerContact
              .filter(
                (item) =>
                  item.value === "TikTok" ||
                  item.value === "YouTube" ||
                  item.value === "Instagram"
              )
              .map((item) => (
                <span key={item.name}>
                  <Link
                    href={item.url}
                    target="_blank"
                    className={` ${
                      item.value === "TikTok" ||
                      item.value === "Instagram" ||
                      item.value === "YouTube"
                        ? "inline"
                        : ""
                    }`}
                  >
                    <Image
                      alt={item.name}
                      src={item.icon}
                      width={25}
                      className="hover:scale-125 transition-all cursor-pointer filter invert"
                      height={25}
                    />
                  </Link>
                </span>
              ))}
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
