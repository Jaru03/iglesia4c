import Button from "@/ui/Button";
import Image from "next/image"

interface Props {
  img: string | null;
  className?: string;
  title: string;
  value: string;
}

const Area = ({ img, className, value, title }: Props) => {
  return (
    <article className={`max-w-[300px] overflow-hidden max-h-[300px] ${className} group`}>
      <div className="w-full h-full  group-hover:translate-y-[-300px] transition-all duration-1000">
        <Image
          src={img ? img : '/logoJovenes.jpeg'}
          width={1000}
          height={1000}
          className=" w-full h-full"
          alt="Area de la iglesia"
        />
        <div className="w-full min-h-[300px] flex flex-col justify-center gap-8 items-center">
          <p className="text-center text-base md:text-base-desktop">¿Quieres saber más sobre el <br /> {title}?</p>
          <Button text="Ver más" variant="primary" className="px-8" url={`/nosotros/${value}`} />
        </div>
      </div>
    </article>
  );
}

export default Area;
