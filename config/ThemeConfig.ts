export const colors = {
  BLACK: '#000',
  WHITE: '#ffffff',
  DULL_WHITE: '#eeeeee',
  DARK_GREY: '#2d2d2d',
  MEDIUM_GREY: '#525050',
  LIGHT_GREY: '#e7e7e6',
  RED: '#d01345',
  BLUE: '#1e90ff',
  GREEN: '#1aff0f',
  AQUA: 'hsl(177, 100%, 66%)',
  COMPLIMENTARY_RED: 'hsl(357, 100%, 66%)',
  PEACH: 'hsl(20, 76%, 71%)',
  DARK_BLUE: 'hsl(208, 100%, 20%)',
  DARKEST_BLUE: 'hsl(208, 100%, 14%)',
  MID_BLUE: 'hsl(208, 100%, 40%)',
  LIGHT_BLUE: 'hsl(208, 100%, 70%)',
  PINK: 'hsl(359, 60%, 76%)',

  BANNER_1: `linear-gradient(to bottom,
      hsl(20, 77%, 71%) 0%,
      hsl(20, 77%, 71%) 25%,
      hsl(356.64, 42.9%, 67.86%) 25%,
      hsl(356.64, 42.9%, 67.86%) 50%,
      hsl(258.97, 33.4%, 62.36%) 50%,
      hsl(258.97, 33.4%, 62.36%) 75%,
      hsl(208, 100%, 60%) 75%,
      hsl(208, 100%, 60%) 100%
    )`,
  BANNER_2: `linear-gradient(340deg, 
    rgba(255,255,255,0.8) 0%,
    rgba(255,255,255,0) 81%,
    hsla(208, 100%, 70%, 15%) 83%,
    rgba(241,241,241,0.1) 100%)`,
  
  BANNER_3: `linear-gradient(180deg, 
    rgba(255,255,255,0.8) 0%,
    rgba(255,255,255,0) 81%,
    hsla(208, 100%, 70%, 15%) 83%,
    rgba(241,241,241,0.1) 100%)`,
  
  BANNER_4: `linear-gradient(to top,
    hsl(20, 77%, 71%) 0%,
    hsl(20, 77%, 71%) 25%,
    hsl(356.64, 42.9%, 67.86%) 25%,
    hsl(356.64, 42.9%, 67.86%) 50%,
    hsl(258.97, 33.4%, 62.36%) 50%,
    hsl(258.97, 33.4%, 62.36%) 75%,
    hsl(208, 100%, 60%) 75%,
    hsl(208, 100%, 60%) 100%
  )`,
  BANNER_5: `linear-gradient(0deg, 
    rgba(255,255,255,0.6) 0%,
    rgba(255,255,255,0) 81%,
    hsla(208, 100%, 70%, 15%) 83%,
    rgba(241,241,241,0.1) 100%)`,
  
  SMOOTH_BANNER: `linear-gradient(to bottom,
    hsl(20, 77%, 71%) 0%,
    hsl(356.64, 42.9%, 67.86%) 25%,
    hsl(258.97, 33.4%, 62.36%) 50%,
    hsl(208, 100%, 60%) 75%,
    hsl(208, 100%, 60%) 100%
  )
  `
}
const sizes = {
  mobileS: '415px',
  mobileL: '768px',
  tablet: '1024px',
  laptop: '1440px',
  laptopL: '2560px',
  desktop: '2560px',
};


export const light = {
  text: colors.DARK_GREY,
  textInvert: colors.WHITE,
  error: colors.RED,
  success: colors.GREEN,

  headerTop: colors.DARK_BLUE,
  headerMiddle: colors.MID_BLUE,
  headerBottom: colors.PEACH,

  white: colors.WHITE,
  black: colors.BLACK,
  blue: colors.BLUE,
  lightGrey: colors.LIGHT_GREY,
  mediumGrey: colors.MEDIUM_GREY,
  darkGrey: colors.DARK_GREY,

  lightBlue: colors.LIGHT_BLUE,
  darkestBlue: colors.DARKEST_BLUE,

  background: colors.WHITE,
  backgroundSecondary: colors.DULL_WHITE,

  fontXL: '32px',
  fontL: '20px',
  fontML: '15px',
  fontM: '12px',
  fontMS: '10px',
  fontS: '8px',
  fontXS: '6px',

  mobileS: `(max-width: ${sizes.mobileS})`,
  mobileL: `(max-width: ${sizes.mobileL})`,
  tablet: `(max-width: ${sizes.tablet})`,
  laptop: `(max-width: ${sizes.laptop})`,
  laptopL: `(max-width: ${sizes.laptopL})`,
  desktop: `(min-width: ${sizes.desktop})`,

} as const


export const dark = { 
  text: colors.WHITE,
  textInvert: colors.DARK_GREY,
  error: colors.RED,

  backgroundPrimary: colors.WHITE,
  backgroundSecondary: colors.DULL_WHITE,

  headerTop: colors.DARK_GREY,
  headerBottom: colors.MEDIUM_GREY,

}

export const theme = {
  light,
  dark
}