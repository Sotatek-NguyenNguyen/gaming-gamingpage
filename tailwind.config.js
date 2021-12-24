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
        interpurp: {
          DEFAULT: '#BE0269',
        },
        primary: {
          100: '#130032',
          200: '#BF8DEC',
          300: '#8A4FC7',
          400: '#53238F',
          500: '#1C0045',
          600: '#15003B',
          700: '#100031',
          800: '#0B0028',
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
        fuchsia: {
          800: '#35184D',
        },
        stake_level_1: '#C0B290',
        stake_level_2: '#789173',
        stake_level_3: '#73AA8B',
        stake_level_4: '#6DC2A3',
        stake_level_5: '#62F3D4',
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
        '32rem': '32rem',
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
        '418p': '418px',
      },
      backgroundColor: {
        primary: {
          100: '#130032',
          200: '#14084B',
          300: '#4A2184',
          400: '#2B067A',
          500: '#18033e',
          600: '#624E8F',
          900: '#000000',
        },
        secondary: {
          100: '#FFA803',
        },
      },
      backgroundImage: {
        'hero-banner': "url('/images/Sub-header.png')",
        'game-detail-banner': "url('/images/axie-banner.png')",
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
        },
      },
      borderWidth: {
        3: '3px',
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
