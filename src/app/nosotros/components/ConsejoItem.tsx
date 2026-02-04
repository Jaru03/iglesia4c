import Image from "next/image"

interface Props {
  item: {
    src: string;
    title: string;
    name: string;
  }
}

const ConsejoItem = ({ item }: Props) => {
  return (
    <article className="flex flex-col items-center text-center">
      <div className="relative w-32 h-32 md:w-40 md:h-40 mb-4">
        <Image
          src={item.src}
          alt={item.title}
          fill
          className="object-cover rounded-full border-4 border-gray-100 grayscale hover:grayscale-0 transition-all duration-300"
          suppressHydrationWarning
        />
      </div>
      <h3 className="text-sm font-semibold text-primary-3 uppercase tracking-wide">
        {item.title}
      </h3>
      <p className="text-gray-700 text-sm mt-1">
        {item.name}
      </p>
    </article>
  );
}

export default ConsejoItem;
