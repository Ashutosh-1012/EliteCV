/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
	theme: {
	  extend: {
		animation: {
		  'up-down': 'up-down 1.5s infinite ease-in-out',
		  'down-up': 'down-up 1.5s infinite ease-in-out',
		},
		keyframes: {
		  'up-down': {
			'0%, 100%': { transform: 'translateY(0)' },
			'50%': { transform: 'translateY(-10px)' },
		  },
		  'down-up': {
			'0%, 100%': { transform: 'translateY(0)' },
			'50%': { transform: 'translateY(10px)' },
		  },
		},
		colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#9f5bff",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
	  },
	},
	plugins: [require("tailwindcss-animate")],
  };
  