/**
 * tailwind.config.ts — Antares Avocats
 * Généré depuis handoff/tokens.json
 *
 * Convention :
 *   - couleurs, polices, espacements identiques aux noms du design system
 *   - les utilitaires d'italique d'accent et de numérotation ⌗ sont des composants, pas des classes
 */
import type { Config } from 'tailwindcss';

export default {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './emails/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '24px', md: '32px', lg: '56px' },
      screens: { '2xl': '1440px' },
    },
    screens: {
      sm: '380px',   // mobile
      md: '768px',   // tablet
      lg: '1100px',  // desktop
      xl: '1440px',  // wide
    },
    extend: {
      colors: {
        bone:         '#F4EFE6',
        'bone-warm':  '#EBE3D4',
        ink: {
          DEFAULT:    '#0B1426',
          soft:       '#1F2A3D',
          line:       '#2A364B',
        },
        antares: {
          DEFAULT:    '#A23B2E',
          deep:       '#7A2A21',
          glow:       '#C45446',
        },
        gold:         '#B8915C',
        muted:        '#5E6573',
        card:         '#FFFFFF',
        success:      '#2D6A4F',
        warning:      '#B8841A',
        line:         'rgba(11, 20, 38, 0.10)',
        'line-strong': 'rgba(11, 20, 38, 0.25)',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        italic:  ['"Instrument Serif"', 'Georgia', 'serif'],
        body:    ['Manrope', 'Arial', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        // Échelle stricte — pas d'inventions
        'display-1':     ['96px', { lineHeight: '0.95', letterSpacing: '-0.035em', fontWeight: '300' }],
        'display-2':     ['64px', { lineHeight: '1.02', letterSpacing: '-0.025em', fontWeight: '300' }],
        'h1':            ['44px', { lineHeight: '1.10', letterSpacing: '-0.020em', fontWeight: '400' }],
        'h2':            ['28px', { lineHeight: '1.20', letterSpacing: '-0.015em', fontWeight: '400' }],
        'h3':            ['20px', { lineHeight: '1.25', letterSpacing: '0',        fontWeight: '500' }],
        'italic-accent': ['44px', { lineHeight: '1.10', letterSpacing: '0',        fontWeight: '400' }],
        'body':          ['15px', { lineHeight: '1.55', letterSpacing: '-0.005em' }],
        'small':         ['13px', { lineHeight: '1.40' }],
        'mono-label':    ['11px', { lineHeight: '1.40', letterSpacing: '0.18em' }],
      },
      spacing: {
        's-1':  '4px',
        's-2':  '8px',
        's-3':  '12px',
        's-4':  '16px',
        's-5':  '24px',
        's-6':  '32px',
        's-7':  '48px',
        's-8':  '64px',
        's-9':  '80px',
        's-10': '120px',
        's-11': '160px',
      },
      borderRadius: {
        DEFAULT: '0',
        sm:    '4px',
        md:    '6px',
        lg:    '8px',
        full:  '9999px',
      },
      boxShadow: {
        'e-0': 'none',
        'e-1': '0 1px 2px rgba(11, 20, 38, 0.06)',
        'e-2': '0 2px 8px rgba(11, 20, 38, 0.08), 0 1px 2px rgba(11, 20, 38, 0.04)',
        'e-3': '0 12px 28px rgba(11, 20, 38, 0.14), 0 4px 8px rgba(11, 20, 38, 0.06)',
      },
      transitionDuration: {
        fast: '120ms',
        base: '150ms',
      },
    },
  },
  plugins: [],
} satisfies Config;
