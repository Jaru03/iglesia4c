"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function ScrollPage({ children, className }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const check = () => {
      setShowArrow(el.scrollHeight > el.clientHeight && el.scrollTop + el.clientHeight < el.scrollHeight - 8);
    };

    check();
    el.addEventListener("scroll", check);
    const ro = new ResizeObserver(check);
    ro.observe(el);

    return () => {
      el.removeEventListener("scroll", check);
      ro.disconnect();
    };
  }, []);

  return (
    <div className="relative h-[100vh] overflow-hidden">
      <div
        ref={scrollRef}
        className={[
          "max-w-7xl mx-auto p-4 pb-16 space-y-4 h-full overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {children}
      </div>
      <div
        className={[
          "pointer-events-none absolute bottom-0 left-0 right-0 flex justify-center pb-4 bg-gradient-to-t from-background via-background/60 to-transparent pt-8 transition-all duration-500",
          showArrow ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
        ].join(" ")}
      >
        <ChevronDown className="h-5 w-5 text-muted-foreground/50 animate-bounce" />
      </div>
    </div>
  );
}
