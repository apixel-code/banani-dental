/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        // Brand palette derived from Banani Clinic logo (medical navy + cobalt + steel grey)
        bg: "#F7FAFC",
        surface: "#FFFFFF",
        // gold tokens kept for backwards compat with existing class names — repurposed as primary brand blue
        gold: {
          DEFAULT: "#1F4E79", // medical navy (primary)
          hover: "#163E63",
          light: "#EAF3FB",
        },
        accent: {
          DEFAULT: "#2C8DCC", // cobalt accent from logo
          soft: "#5DA9DC",
        },
        steel: {
          DEFAULT: "#7C8389",
          light: "#B6BCC2",
        },
        ink: {
          DEFAULT: "#1A2332",
          muted: "#5C6470",
        },
        line: "#E1E8EF",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      fontFamily: {
        bnSerif: ['"Tiro Bangla"', '"Noto Serif Bengali"', "serif"],
        enSerif: ['"Playfair Display"', "serif"],
        bnSans: ['"Hind Siliguri"', '"Noto Serif Bengali"', "system-ui", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 4px)",
        sm: "calc(var(--radius) - 8px)",
      },
      boxShadow: {
        lux: "0 24px 50px -16px rgba(31, 78, 121, 0.18)",
        gold: "0 14px 40px -12px rgba(31, 78, 121, 0.45)",
        glow: "0 0 40px rgba(44, 141, 204, 0.35)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px) translateX(0px)" },
          "50%": { transform: "translateY(-30px) translateX(15px)" },
        },
        "float-fast": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-15px)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "marquee": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float-slow": "float-slow 8s ease-in-out infinite",
        "float-fast": "float-fast 5s ease-in-out infinite",
        "shimmer": "shimmer 3s linear infinite",
        "marquee": "marquee 30s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
