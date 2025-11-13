"use client";
import { churches } from "../../mocks/churchues";
import { InfoChurch } from "@/types/InfoChurch";
import dynamic from "next/dynamic";

// Importa ChurchLocation deshabilitando SSR
const ChurchLocation = dynamic(
  () => import("@/pages/Visitanos/ChurchLocation"),
  {
    ssr: false,
  }
);

const page = () => {
  return (
    <section>
      <div className="bg-[url(../../public/visitanos-banner.jpg)] h-screen bg-no-repeat bg-center bg-cover before:absolute before:inset-0 before:bg-black/50 before:content-[''] flex flex-col justify-center items-center">
        <h2 className="text-white text-3xl md:text-3xl-desktop z-[5] text-center">
          Visitanos
        </h2>
      </div>
      <div className="p-6 overflow-hidden">
        <h2 className="text-primary-2 text-xl md:text-xl-desktop text-center col-span-full">
          Ubicaciones
        </h2>
        <div className="flex flex-col gap-y-10">
          {churches?.map((church) => (
            <ChurchLocation info={church as InfoChurch} key={church.index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default page;
