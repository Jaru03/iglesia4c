import type { Config } from "tailwindcss";

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
      fontSize: {
        base: '14px',
        'button': ['20px', {
          fontWeight: 'semi-bold',
        }],
        xl: ['25px', {
          fontWeight: 'bold',
        }],
        '2xl': ['30px', {
          fontWeight: 'bold',
        }],
        '3xl': ['40px', {
          fontWeight: 'bold',
        }],
        'base-desktop': '16px',
        'button-desktop': ['24px', {
          fontWeight: 'semi-bold',
        }],
        'xl-desktop': ['30px', {
          fontWeight: 'bold',
        }],
        '2xl-desktop': ['40px', {
          fontWeight: 'bold',
        }],
        '3xl-desktop': ['55px', {
          fontWeight: 'bold',
        }],
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
  plugins: [],
} satisfies Config;
