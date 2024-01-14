import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        poorStory: ["Poor Story", "sans-serif"],
        yellowTail: ["Yellowtail", "sans-serif"],
        "Pretendard-Regular": ["Pretendard-Regular"],
        "Pretendard-ExtraBold": ["Pretendard-ExtraBold"],
        "Pretendard-SemiBold": ["Pretendard-SemiBold"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
  darkMode: "class",
};
export default config;
