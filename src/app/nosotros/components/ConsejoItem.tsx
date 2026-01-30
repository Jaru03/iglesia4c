import Image from "next/image";

interface Props {
  item: ConsejoType
  
}

interface ConsejoType{
  src: string;
  title: string;
  name: string;
}

const ConsejoItem = ({item}:Props) => {
  return (
    <article className="flex flex-col items-center py-4">
      <Image src={item?.src} alt={item?.title} width={900} height={900} className=" object-contain consejo__image grayscale hover:grayscale-0 hover:scale-105 transition-all mb-4 " suppressHydrationWarning></Image>
      <h3 className="text-base md:text-lg font-medium">{item?.title}</h3>
      <p className="text-base">{item?.name}</p>
    </article>
  );
};

export default ConsejoItem;
