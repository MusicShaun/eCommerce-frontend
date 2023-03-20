
const colors = {
  BLACK: '#000',
  WHITE: '#ffffff',
  DULL_WHITE: '#f8f8f8',
  DARK_GREY: '#2d2d2d',
  MEDIUM_GREY: '#525050',
  LIGHT_GREY: '#cdcdcd',
  RED: '#d01345',
  BLUE: '#1e90ff',
  GREEN: '#1aff0f'
}


export const light = {
  text: colors.BLACK,
  textInvert: colors.WHITE,
  error: colors.RED,
  success: colors.GREEN,

  headerTop: colors.DARK_GREY,
  headerMiddle: colors.MEDIUM_GREY,
  headerBottom: colors.BLACK,

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
  fontS: '8px',
  fontXS: '6px'
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