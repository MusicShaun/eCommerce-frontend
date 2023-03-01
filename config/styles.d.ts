import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme<T> {
    text: {
      primary: T,
      secondary:  T,
      error: T,
    },
    background: {
      primary: T,
      secondary: T,
    },
    header: {
      top: T,
      bottom: T,
    },
  }
}