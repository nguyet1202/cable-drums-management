module.exports = {

    content: ["./src/**/*.{js,jsx,ts,tsx}",],

    theme: {
        colors: {
            "BB": "#4A4A4A",
            "D1": '#222222',
            "D2": '#111111',
            "W1": "#F6F6F6",
            "W2": "#FFFFFF",
            "B1": "#4461F2",
            "B2": "#E3ECF5",
            "G": "#818594",
            "G2": "#D1D1D2",
            "P1": "#F03A76",
            "P2": "#FF90B5",
            "GR": "#78BA6B",
            "YL": "#FFCF2E",
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

