import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate"

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/nosotros/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '320px',
      },
      boxShadow: {
        'form': '0px 20px 20px #00000025'
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#060735",
        'primary-2': "#152766",
        "primary-3": "#3B63A8",
        "primary-4": "#2F67C7",
        'secondary': "#F4F2F0",
        "secondary-2": "#5C6972",
        "secondary-3": "#A9ADB0",
        "secondary-4": "#BBBBBB",
        "primary-3-hover":"#325488",
      },
    },
  },
  plugins: [animate],
} satisfies Config;
