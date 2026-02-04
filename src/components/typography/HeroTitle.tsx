interface HeroTitleProps {
  title: string;
  size?: "large" | "medium";
}

export function HeroTitle({ title, size = "medium" }: HeroTitleProps) {
  if (size === "large") {
    return (
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-4 mb-6">
          <h1 className="text-4xl xs:text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-tight text-balance">
            {title}
          </h1>
        </div>
      </div>
    );
  }

  return (
    <h2 className="text-3xl md:text-4xl font-bold text-white z-10 text-center">
      {title}
    </h2>
  );
}
