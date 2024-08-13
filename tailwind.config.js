/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#f8fafd',
          DEFAULT: '#f1f5fc',
          dark: '#e4ecf7',
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#f1f5fc",
          "primary-focus": "#d3e3f8",
          "primary-content": "#1e3a5f",
          
          "secondary": "#edf2f7",
          "secondary-focus": "#d9e2ed",
          "secondary-content": "#2d3748",
          
          "accent": "#3182ce",
          "accent-focus": "#2c5282",
          "accent-content": "#ffffff",
          
          "neutral": "#4a5568",
          "neutral-focus": "#2d3748",
          "neutral-content": "#ffffff",
          
          "base-100": "#ffffff",
          "base-200": "#f7fafc",
          "base-300": "#e2e8f0",
          "base-content": "#1a202c",
          
          "info": "#63b3ed",
          "success": "#48bb78",
          "warning": "#ed8936",
          "error": "#f56565",

          "--rounded-box": "0.5rem",
          "--rounded-btn": "0.3rem",
          "--rounded-badge": "0.3rem",
          "--animation-btn": "0.3s",
          "--animation-input": "0.2s",
          "--btn-text-case": "uppercase",
          "--btn-focus-scale": "0.95",
          "--border-btn": "1px",
          "--tab-border": "1px",
          "--tab-radius": "0.3rem",
        },
      },
    ],
  },
}