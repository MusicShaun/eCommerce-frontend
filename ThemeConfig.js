import { createGlobalStyle } from "styled-components";


export const lightTheme = {
  white: '#fff',
  black: '#000',
  primary: "#003366",
  secondary: "#eee",
  border: "#878787",
  text: "#000",
  background: "#eeeeee",
  indicator: "#ccc",
  headerMiddle: '#525050',
  headerTop: '#2d2d2d'
}

export const darkTheme = {
  primary: "#00bcd4",
  secondary: "#f3f3f3",
  border: "#e0e0e0",
  text: "#fff",
  background: "#212121",
  indicator: "#FFCC00",
}

const globalTheme = {
  dark: {
    color: darkTheme,

  },
  light: {
    color: lightTheme,

  },
};
export default globalTheme;