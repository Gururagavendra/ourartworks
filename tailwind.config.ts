import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary colors
        primary: "#000000",
        white: "#ffffff",
        
        // Text colors
        text: {
          DEFAULT: "#404040",
          light: "#737373",
        },
        
        // Background colors
        background: {
          DEFAULT: "#ffffff",
          secondary: "#fafafa",
          dark: "#000000",
        },
        
        // Border colors
        border: {
          DEFAULT: "#e6e6e6",
          light: "#f5f5f5",
        },
        
        // Frame colors
        frame: {
          black: "#000000",
          white: "#ffffff",
          "natural-wood": "#d4a574",
          "dark-wood": "#654321",
          gray: "#808080",
        },
      },
      
      fontFamily: {
        sans: ['"Segoe UI Symbol"', "system-ui", "sans-serif"],
      },
      
      fontSize: {
        // Headings
        "heading-1": ["54px", { lineHeight: "54px", letterSpacing: "-1.35px" }],
        "heading-2": ["45px", { lineHeight: "45px", letterSpacing: "-1.125px" }],
        "heading-3": ["18px", { lineHeight: "24px", letterSpacing: "-0.45px" }],
        "heading-4": ["13.5px", { lineHeight: "21px", letterSpacing: "-0.3375px" }],
        
        // Body
        body: ["14px", { lineHeight: "21px" }],
        "body-lg": ["15px", { lineHeight: "21px" }],
        small: ["10.5px", { lineHeight: "15px" }],
      },
      
      maxWidth: {
        container: "960px",
      },
      
      spacing: {
        "section": "96px",
        "container-x": "240px",
      },
      
      borderRadius: {
        button: "1.5px",
        card: "3px",
        full: "9999px",
      },
    },
  },
  plugins: [],
};

export default config;
