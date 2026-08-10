/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
     colors: {
  "primary": "#2C5A4B",              // deep forest teal (buttons, headings)
  "primary-container": "#3D7A63",     // lighter teal for hover states
  "on-primary": "#FFFFFF",
  "on-primary-container": "#FFFFFF",

  "secondary": "#D9A876",             // warm terracotta/peach accent
  "secondary-container": "#F0DCC4",
  "on-secondary": "#2D3748",
  "on-secondary-container": "#4A3823",

  "background": "#FAF7F1",            // warm cream page background
  "on-background": "#2D3748",

  "surface": "#FFFFFF",
  "surface-container-lowest": "#FFFFFF",
  "surface-container-low": "#FAF7F1",
  "surface-container": "#F5F0E8",
  "surface-container-high": "#EFE8DC",
  "surface-container-highest": "#E8DFCF",
  "surface-variant": "#E8DFCF",
  "surface-dim": "#E8DFCF",
  "surface-bright": "#FFFFFF",
  "on-surface": "#2D3748",
  "on-surface-variant": "#4A5568",

  "outline": "#D4CBB8",
  "outline-variant": "#E5DECF",

  "error": "#BA1A1A",
  "error-container": "#FFDAD6",
  "on-error": "#FFFFFF",
  "on-error-container": "#93000A",

  "tertiary": "#D9A876",
  "tertiary-container": "#F0DCC4",
  "on-tertiary": "#FFFFFF",
  "on-tertiary-container": "#4A3823",

  "text-primary": "#2D3748",
  "text-secondary": "#4A5568",
  "text-muted": "#4A5568",

  "inverse-surface": "#2D3748",
  "inverse-on-surface": "#FAF7F1",
  "inverse-primary": "#A8D5C2",

  "border-subtle": "#EFE8DC",
  "deep-earth": "#100D08",
  "warm-sand": "#DED3CA",
},
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        "full": "9999px"
      },
      spacing: {
        "base": "8px",
        "gutter": "24px",
        "margin-desktop": "64px",
        "max-width": "1280px",
        "margin-mobile": "16px",
        "container-max": "1280px"
      },
      fontFamily: {
        "label-sm": ["Inter", "sans-serif"],
        "headline-lg-mobile": ["Poppins", "sans-serif"],
        "body-md": ["Inter", "sans-serif"],
        "body-sm": ["Inter", "sans-serif"],
        "headline-md": ["Poppins", "sans-serif"],
        "label-md": ["Inter", "sans-serif"],
        "headline-lg": ["Poppins", "sans-serif"],
        "body-lg": ["Inter", "sans-serif"],
        "headline-xl": ["Poppins", "sans-serif"]
      },
      fontSize: {
        "label-sm": ["12px", { lineHeight: "14px", fontWeight: "500" }],
        "headline-lg-mobile": ["28px", { lineHeight: "36px", fontWeight: "600" }],
        "body-md": ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "body-sm": ["14px", { lineHeight: "20px", fontWeight: "400" }],
        "headline-md": ["24px", { lineHeight: "32px", fontWeight: "600" }],
        "label-md": ["14px", { lineHeight: "16px", letterSpacing: "0.05em", fontWeight: "600" }],
        "headline-lg": ["32px", { lineHeight: "40px", letterSpacing: "-0.01em", fontWeight: "600" }],
        "body-lg": ["18px", { lineHeight: "28px", fontWeight: "400" }],
        "headline-xl": ["48px", { lineHeight: "56px", letterSpacing: "-0.02em", fontWeight: "700" }]
      }
    },
  },
  plugins: [],
}