import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        neutral: {
          10: "#FFFFFF",
          20: "#FAFAFA",
          30: "#EDEDED",
          40: "#E0E0E0",
          50: "#C2C2C2",
          60: "#9E9E9E",
          70: "#757575",
          80: "#616161",
          90: "#404040",
          100: "#1D1F20",
        },
        primary: {
          main: "#01959F",
          surface: "#F3FBFC",
          border: "#4DB5BC",
          hover: "#01777F",
          pressed: "#01556F",
          focus: "#01959F20",
        },
        secondary: {
          main: "#FBC037",
          surface: "#FFFCF5",
          border: "#FEEABC",
          hover: "#FAA82F",
          pressed: "#FA9810",
          focus: "#FBC03720",
        },
        danger: {
          main: "#E01428",
          surface: "#FFF8FA",
          border: "#F5B1B7",
          hover: "#BC1121",
          pressed: "#700A14",
          focus: "#E0142820",
        },
        warning: {
          main: "#CA7336",
          surface: "#FCF7F3",
          border: "#FEB17B",
          hover: "#B1652F",
          pressed: "#985628",
          focus: "#CA733620",
        },
        success: {
          main: "#43936C",
          surface: "#F7F9F7",
          border: "#B8DBCA",
          hover: "#367A59",
          pressed: "#20573D",
          focus: "#73917220",
        },
      },
      fontSize: {
        // Text
        "text-xs": ["10px", { lineHeight: "16px" }],
        "text-s": ["12px", { lineHeight: "20px" }],
        "text-m": ["14px", { lineHeight: "24px" }],
        "text-l": ["16px", { lineHeight: "28px" }],
        "text-xl": ["18px", { lineHeight: "28px" }],

        // Headings
        "heading-s": ["20px", { lineHeight: "32px" }],
        "heading-m": ["24px", { lineHeight: "36px" }],
        "heading-l": ["32px", { lineHeight: "44px" }],

        // Display
        display: ["48px", { lineHeight: "64px" }],
      },
      fontWeight: {
        regular: "400",
        bold: "700",
      },
      fontFamily: {
        nunito: ["var(--font-nunito-sans)", "sans-serif"],
      },
      boxShadow: {
        input: "inset 1px 2px 2px 0px #0000001F",
        button: "0px 1px 2px 0px #0000001F",
        modal: "0px 4px 8px 0px #0000001A",
      },
    },
  },
  plugins: [],
};
export default config;
