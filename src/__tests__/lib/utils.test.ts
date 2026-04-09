import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils";

describe("cn()", () => {
  it("combina clases simples", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("omite valores falsy", () => {
    expect(cn("foo", undefined, null, false, "bar")).toBe("foo bar");
  });

  it("fusiona conflictos de Tailwind (tailwind-merge)", () => {
    // tailwind-merge debe resolver conflicto de padding
    expect(cn("p-4", "p-8")).toBe("p-8");
  });

  it("acepta objetos condicionales (clsx)", () => {
    expect(cn({ "text-red-500": true, "text-blue-500": false })).toBe("text-red-500");
  });

  it("devuelve string vacío sin argumentos", () => {
    expect(cn()).toBe("");
  });
});
