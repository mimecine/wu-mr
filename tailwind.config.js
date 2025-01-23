const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  mode:'jit',
  content: [
    './src/css/tw-safelist.txt',
    './*.html',
    './**/*.liquid',
    './assets/**/*.js',
  ],
  theme: {
    extend: {
      colors:{
        'wu-nav':'var(--nav,#2000CD)',
        'wu-text':'var(--text,#FFFFFF)',
        'wu-red':'var(--red,#DD343B)',
        'wu-wine':'var(--wine,#77255C)',
        'wu-green':'var(--green,#23B085)',
        'wu-blue':'var(--blue,#0A6BFF)',
        'wu-blue-alt':'var(--blue-alt,#2F31B5)',
        'wu-sky':'var(--sky,#9DC1E7)',
        'wu-sky-alt':'var(--sky-alt,#2F31B5)',
        'wu-denim':'var(--denim,#102852)',
        'wu-denim-alt':'var(--denim-alt,#2F31B5)',
        'wu-yellow':'var(--yellow,#FBCC03)',
        'wu-turquoise':'var(--turquoise,#00A0F8)',
        'wu-crimson':'var(--crimson,rgb(124,51,97))',
        'wu-brown':'var(--brown,#D6C8AB)',
        'wu-gray':'var(--gray,#BBBBBB)',
        'wu-white':'var(--white,#FFFFFF)',
        'wu-black':'var(--black,#000000)',
        'wu-orange':'var(--orange,#ea6934)',
      },
      fontFamily:{
        sans:['erbar',...defaultTheme.fontFamily.sans],
        serif:['gt-alpina',...defaultTheme.fontFamily.serif],
      },
      borderRadius:{
        'wu':'4rem'
      },
      transitionProperty:{
        'border-radius': 'border-radius'
      }
    },
  },
  // variants: {
  //     extend: {
  //     transitionProperty:['hover','focus'],
  //   },
  // },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
   // require('tailwindcss-scroll-snap')
  ],
}
