
const colors = {
  BLACK: '#000',
  WHITE: '#ffffff',
  DULL_WHITE: '#eeeeee',
  DARK_GREY: '#2d2d2d',
  MEDIUM_GREY: '#525050',
  LIGHT_GREY: '#cdcdcd',
  RED: '#d01345',
  BLUE: '#1e90ff',
  GREEN: '#1aff0f'
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