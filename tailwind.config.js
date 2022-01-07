const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        sm: '320px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      colors: {
        primary: {
          100: '#130032',
          200: '#120037',
          300: '#8A4FC7',
          400: '#53238F',
          500: '#1C0045',
          600: '#15003B',
          700: '#100031',
          800: '#9F99B3',
          900: '#070021',
        },
        secondary: {
          100: '#D6D6FD',
          200: '#ADADFB',
          300: '#8383F4',
          400: '#6262EA',
          500: '#3232DC',
          600: '#2424BD',
          700: '#19199E',
          800: '#0F0F7F',
          900: '#090969',
        },
        modal_header_color1: '#FF97CF',
        modal_header_color2: '#7E0F1A',
        modal_stake_maturity_time: '#3FA54A',
        modal_unstake_header: '#872020',
        pool_title: '#733434',
        staking: '#022BBE',
        gcpurp: {
          200: 'rgba(217,191,245,1)',
        },
        pool_focus_1: '#6398FF',
      },
      width: {
        '3.75rem': '3.75rem',
        '32rem': '32rem',
        '46-6rem': '46.6rem',
        '837px': '837px',
      },
      height: {
        '10v': '10vh',
        '20v': '20vh',
        '30v': '30vh',
        '40v': '40vh',
        '50v': '50vh',
        '60v': '60vh',
        '70v': '70vh',
        '80v': '80vh',
        '90v': '90vh',
        '100v': '100vh',
        '350p': '350px',
        '418p': '418px',
        '600p': '600px',
        '3.75rem': '3.75rem',
      },
      backgroundColor: {
        primary: {
          100: '#200064',
          200: '#120037',
          300: '#6823BF',
          400: '#FF6060',
          500: '#18033e',
          600: '#624E8F',
          700: '#5523BF',
          800: '#9F99B3',
          900: '#ffffff61',
        },
        secondary: {
          100: '#FFA803',
        },
        tx_status: {
          100: '#FFA803',
          200: '#00C48C',
          300: '#D32F2F',
          400: '#FFD960',
          500: '#3390FF',
          600: '#C4C4C4',
        },
      },
      backgroundImage: {
        'hero-banner': "url('/images/Sub-header.png')",
        'game-detail-banner': "url('/images/axie-banner.png')",
        'my-account-banner': "url('/images/My-account.png')",
      },
      fontSize: {
        s16px: ['16px', '16px'],
      },
      letterSpacing: {
        widest2: '0.135em',
      },
      borderColor: {
        primary: {
          100: '#130032',
          200: '#FFA803',
          300: '#9F99B3',
          400: '#120037',
          500: '#6823BF',
          600: '#FF6060',
          700: '#00C48C',
        },
      },
      borderWidth: {
        3: '3px',
      },
      maxHeight: {
        '418p': '418px',
        '600p': '600px',
        '90v': '90vh',
      },
      opacity: {
        15: '0.15',
      },
    },
    fontFamily: {
      sans: ['Kanit', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      serif: ['ui-serif', 'Georgia', 'Cambria', 'Times New Roman', 'Times, serif'],
      mono: [
        'ui-monospace',
        'Menlo',
        'Monaco',
        'Consolas',
        'Liberation Mono',
        'Courier New',
        'monospace',
      ],
    },
    screens: {
      xs: '475px',
      ...defaultTheme.screens,
    },
  },
  variants: {
    extend: {
      visibility: ['group-hover'],
    },
  },
  plugins: [],
};
