import { createGlobalStyle, DefaultTheme } from "styled-components"




const colors = {
  BLACK: '#000',
  WHITE: '#ddd',
  DULL_WHITE: '#f8f8f8',
  GREY: '#2d2d2d',
  LIGHT_GREY: '#525050',
  RED: '#d01345',
}


export const light = {
  text: colors.BLACK,
  textInvert: colors.WHITE,
  error: colors.RED,
  headerTop: colors.GREY,
  headerMiddle: colors.LIGHT_GREY,
  headerBottom: colors.BLACK,
  white: colors.WHITE,
  black: colors.BLACK,
  background: colors.WHITE,



} as const
// background: {
//   primary: colors.WHITE,
//   secondary: colors.DULL_WHITE,
// },
// header: {
//   top: colors.GREY,
//   bottom: colors.LIGHT_GREY,
// },

export const dark = { 
  text: colors.WHITE,
  textInvert: colors.GREY,
  error: colors.RED,

  backgroundPrimary: colors.WHITE,
  backgroundSecondary: colors.DULL_WHITE,

  headerTop: colors.GREY,
  headerBottom: colors.LIGHT_GREY,

}

export const theme = {
  light,
  dark
}