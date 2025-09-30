/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--color-background))',
        foreground: 'hsl(var(--color-foreground))',
        primary: 'hsl(var(--color-primary))',
        border: 'hsl(var(--color-border))',
        transparent: 'transparent',
      },
      fontFamily: {
        heading: ['var(--font-heading)'],
        body: ['var(--font-body)'],
        mono: ['var(--font-mono)'],
      },
      keyframes: {
        collapse: {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
        expand: {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        scrollLeft: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        scrollRight: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        collapse: 'collapse 500ms cubic-bezier(.85, 0, 0.25, 1)',
        expand: 'expand 500ms cubic-bezier(.85, 0, 0.25, 1)',
        scrollLeft: 'scrollLeft var(--marquee-duration) linear infinite',
        scrollRight: 'scrollRight var(--marquee-duration) linear infinite',
      },
    },
  },

  plugins: [require('@tailwindcss/container-queries'), require('tailwindcss-animate')],
}
