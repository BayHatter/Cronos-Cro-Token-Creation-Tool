/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"], 
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./assets/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        
        // New Color Scheme
        primary: {
          DEFAULT: 'hsl(var(--primary))', 
          foreground: 'hsl(var(--primary-foreground))', 
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))', 
          foreground: 'hsl(var(--secondary-foreground))', 
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))', 
          foreground: 'hsl(var(--accent-foreground))', 
        },
        card: {
          DEFAULT: 'hsl(var(--card))', 
          foreground: 'hsl(var(--card-foreground))', 
        },
        border: 'hsl(var(--border))', 
        input: 'hsl(var(--input))', 
        ring: 'hsl(var(--ring))', 
        destructive: {
          DEFAULT: 'hsl(var(--destructive))', 
          foreground: 'hsl(var(--destructive-foreground))', 
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))', 
          foreground: 'hsl(var(--muted-foreground))', 
        },

        // New gradients
        gradient: {
          light: 'linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%)', 
          dark: 'linear-gradient(135deg, #9333EA 0%, #6B21A8 100%)', 
        },
        
        // Custom chart colors
        chart: {
          1: 'hsl(var(--chart-1))', 
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
      },

      borderRadius: {
        lg: '12px',  
        md: '8px',  
        sm: '4px',   
      },

      spacing: {
        18: '4.5rem', 
        22: '5.5rem', 
      },

      fontSize: {
        'xxs': '10px',   
        'tiny': '12px',   
        'sm': '14px',     
        'lg': '18px',     
        'xl': '24px',     
        '2xl': '30px',    
        '3xl': '36px',    
        '4xl': '48px',    
      },

      fontFamily: {
        sans: ['Inter', 'sans-serif'], 
        serif: ['Georgia', 'serif'],   
      },

      boxShadow: {
        'card': '0 4px 8px rgba(0, 0, 0, 0.1)', 
        'hover': '0 6px 12px rgba(0, 0, 0, 0.15)', 
        'neon': '0 0 10px rgba(0, 174, 255, 0.75)', 
      },

      // Animations
      animation: {
        fadeIn: 'fadeIn 1s ease-in-out', 
        pulse: 'pulse 2s infinite',      
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        pulse: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
