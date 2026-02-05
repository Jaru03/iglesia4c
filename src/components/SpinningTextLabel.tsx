"use client";

import { SpinningText } from "@/components/ui/spinning-text";

export function SpinningTextLabel() {
  return (
    <SpinningText
      className="hidden md:block absolute bottom-30 right-30 text-sm md:text-xl text-white/60 font-bold tracking-widest"
      duration={20}
      radius={4.7}
      reverse={true}
    >
      Excelencia • Excelencia • Excelencia •
    </SpinningText>
  );
}
