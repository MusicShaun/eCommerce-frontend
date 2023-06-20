
export const colors = {
  BLACK: '#000',
  WHITE: '#ffffff',
  DULL_WHITE: '#eeeeee',
  DARK_GREY: '#2d2d2d',
  MEDIUM_GREY: '#525050',
  LIGHT_GREY: '#cdcdcd',
  RED: '#d01345',
  BLUE: '#1e90ff',
  GREEN: '#1aff0f',
  AQUA: 'hsl(177, 100%, 66%)',
  COMPLIMENTARY_RED: 'hsl(357, 100%, 66%)',
  PEACH: 'hsl(20, 76%, 71%)',
  DARK_BLUE: 'hsl(208, 100%, 20%)',
  MID_BLUE: 'hsl(208, 100%, 40%)',
  LIGHT_BLUe: 'hsl(208, 100%, 60%)',


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
  text: colors.BLACK,
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

  background: colors.WHITE,
  backgroundSecondary: colors.DULL_WHITE,

  fontXL: '32px',
  fontL: '24px',
  fontML: '18px',
  fontM: '14px',
  fontMS: '12px',
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