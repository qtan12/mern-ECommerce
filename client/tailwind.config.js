/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./public/index.html",
  ],
  theme: {
    fontFamily: {
      main: ['Poppins', 'sans-serif;']
    },
    listStyleType:{
      square: 'square',
      roman: 'uper-roman'
    },
    extend: {
      width: {
        main: '1220px'
      },
      flex: {
        '2' : '2 2 0%',
        '3' : '3 3 0%',
        '4' : '4 4 0%',
        '5' : '5 5 0%',
        '6' : '6 6 0%',
        '7' : '7 7 0%',
        '8' : '8 8 0%',
      },
      
      //animation
      keyframes:{
        'slide-top': {
          '0%': {
            '-webkit-transform': 'translateY(30px);',

            transform: 'translateY(30px);'
          },
          '100%': {
            '-webkit-transform': 'translateY(0px);',
            transform: 'translateY(0px);'
          }
        },
        'slide-top-small': {
          '0%': {
            '-webkit-transform': 'translateY(6px);',
            transform: 'translateY(6px);'
          },
          '100%': {
            '-webkit-transform': 'translateY(0px);',
            transform: 'translateY(0px);'
          }
        },
        'slide-right': {
          '0%': {
            '-webkit-transform': 'translateX(-1000px);',
            transform: 'translateX(-1000px);'
          },
          '100%': {
            '-webkit-transform': 'translateX(0px);',
            transform: 'translateX(0px);'
          }
        }
      },
      
      animation: {
        'slide-top' : ' slide-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
        'slide-top-small' : ' slide-top-small 0.3s linear both;',
        'slide-right': 'slide-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;'

      }
    },
  },
  
  plugins: [
    require("@tailwindcss/line-clamp"),
    
  ],
}
