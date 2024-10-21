import type { Config } from "tailwindcss";
const {nextui} = require("@nextui-org/react");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui(
    {
      themes: {
        dark: {
          extend: "dark",
          colors: {
            background: "#1A1920",
            white:"#fff",
            primary: {
              DEFAULT: "#9FC131",
              100: "#F6FBD6",
              200: "#ECF8AE",
              300: "#D8EC82",
              400: "#C0D95F",
              500: "#9FC131",
              600: "#84A523",
              700: "#6A8A18",
              800: "#526F0F",
              900: "#405C09",
              thousand: "#23222B",
              lightBlue: "#25A7DE",
              warning: "#E33B54",
              buttonSecondary: "#A1A1AA"
            },
            secondary: {
              DEFAULT: "#848E9C",
              100: "#7A7792",
              200: "#706D88",
              300: "#67647D",
              400: "#5D5B71",
              500: "#545266",
              600: "#4B495B",
              700: "#414050",
              800: "#383645",
              900: "#292731",
              thousand: "#23222B",
              lightBlue: "#25A7DE",
              warning: "#E33B54",
              buttonSecondary: "#A1A1AA"
            },
            focus: "#F182F6",
            content1: "#1A1920",
            content2: "#383645",
            darkLight: "transparent"
          },
          layout: {
            disabledOpacity: "0.3",
            radius: {
              small: "8px",
              medium: "12px",
              large: "16px"
            }
          }
        }
      }
    }
  )],
};
export default config;
