import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "auth-pattern": "url('/shapesGroupe.png')",
      },
      colors: {
        customGreen: "#156347",
        link: "#0066FF",
        lightGray: "#B1B1B1",
        inputBlue: "#F3F8FF",
        inputText: "#6A6A6A",
        inputBorder: "#9ACA3C66",
        buttonGreen: "#04AE5C",
        primary: "#156347",
        ratings: "#D1C900",
        detail: "#3C3939",
        button2: "#DE7230",
        Green2: "#04AE5C",
        lightGreen: "#A7E3C6",
        lighterGreen: "#F0FFF0",
        orangeLight: "#FFEDE2",
        Red: "#FF2F63",
        starColor: "#D1C600",
        starColor2: "#D2A400",
        inputText2: "#898484",
        newGreen: "#00572D",
        inputGray: "#C9C9C9",
      },
    },
  },
  plugins: [],
};
export default config;
