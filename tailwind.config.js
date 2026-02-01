/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
  	extend: {
  		colors: {
  			// Migrate SCSS colors
  			'blue-dark': '#213445',
  			'green-primary': '#41b4a5',
  			// Reference landing palette
  			navy: { 800: '#222e3c', 900: '#1a222e' },
  			teal: { 300: '#7ddfc3', 400: '#4cd0a8' },
  			primary: {
  				'50': '#eff6ff',
  				'500': '#3b82f6',
  				'600': '#2563eb',
  				'700': '#1d4ed8',
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		fontFamily: {
  			righteous: ['Righteous', 'cursive'],
  			quando: ['Quando', 'serif'],
  			serif: ['"Playfair Display"', 'serif'],
  			sans: ['"DM Sans"', 'sans-serif'],
  			body: ['"DM Sans"', 'sans-serif']
  		},
  		boxShadow: {
  			'glow': '0 0 20px rgba(76, 208, 168, 0.3)',
  			'glow-lg': '0 0 30px -5px hsl(174 52% 48% / 0.4)',
  			'card': '0 4px 6px -1px rgb(0 0 0 / 0.07), 0 2px 4px -2px rgb(0 0 0 / 0.05)',
  			'card-hover': '0 20px 25px -5px rgb(0 0 0 / 0.08), 0 8px 10px -6px rgb(0 0 0 / 0.05)'
  		},
  		transitionTimingFunction: {
  			'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
  			'bounce-in': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  			'ease-out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)'
  		},
  		animation: {
  			'fade-in': 'fade-in 0.4s ease-out forwards',
  			'fade-in-up': 'fade-in-up 0.5s ease-out-expo forwards',
  			'slide-up': 'slide-up 0.4s ease-out forwards',
  			'scale-in': 'scale-in 0.3s bounce-in forwards'
  		},
  		keyframes: {
  			'fade-in': {
  				'0%': { opacity: '0' },
  				'100%': { opacity: '1' }
  			},
  			'fade-in-up': {
  				'0%': { opacity: '0', transform: 'translateY(12px)' },
  				'100%': { opacity: '1', transform: 'translateY(0)' }
  			},
  			'slide-up': {
  				'0%': { opacity: '0', transform: 'translateY(8px)' },
  				'100%': { opacity: '1', transform: 'translateY(0)' }
  			},
  			'scale-in': {
  				'0%': { opacity: '0', transform: 'scale(0.96)' },
  				'100%': { opacity: '1', transform: 'scale(1)' }
  			}
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
