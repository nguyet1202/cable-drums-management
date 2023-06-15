/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    screens: {
      'xxs': '320px',
      'xs': '480px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    colors: {
      "BB": "#4A4A4A",
      "D1":'#222222',
      "D2":'#111111',
      "W":"#F6F6F6",
      "W2":"#FFFFFF",
      "B1":"#4461F2",
      "B2":"#E3ECF5",
      "G":"#818594",
      "G2":"#D1D1D2",
      "P":"#F03A76",
      "P2":"#FF90B5",
    },

    fontWeight: {
      "thin": '100',
      "extralight": '200',
      "light": '300',
      "normal": '400',
      "medium": '500',
      "semibold": '600',
      "bold": '700',
      "extrabold": '800',
      "black": '900',

    },
    extend: {
      fontFamily: {
        sansA: ['poppins', 'sans-serif'],
        sansB: ['pangolin', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

