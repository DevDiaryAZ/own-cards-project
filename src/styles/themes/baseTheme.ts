export const baseTheme = {
  colors: {
    //#5d3571 - color
    //#fdbfae - background
    //#f4e9e9
    primaryAlpha01: 'rgba(115,152,206,0.2)',
    primaryLightest: '#ececec',
    // primaryLightest: "#f4e9e9",
    // primaryLighter: "#fde9e2",
    primaryLighter: '#fde9e2',
    primary: '#fdbfae',
    primaryDark: '#E69993',
    textOnPrimary: '#5d3571',

    secondary: '#fbe4e2',
    secondaryLight: '#FFFFFF',
    secondaryLightAlpha07: 'rgba(236,236,236,0.7)',
    textOnSecondary: '#000',

    severity: {
      error: '#ce5252',
      success: '#74b460',
      notification: '#608ab4',
    },
    input: {
      background: 'rgb(255, 255, 255)',
      default: 'rgba(76,85,154,0.09)',
      onSecondary: 'rgba(76,85,154,0.09)',
    },
    button: {
      success: '#7398CE',
      successShadow: 'rgba(54, 110, 255, 0.35)',
      error: '#e16f6f',
      errorShadow: 'rgba(255,54,54,0.35)',
      neutral: '#99a5b9',
      neutralShadow: '#99a5b9',
    },
    cards: {
      default: ['#7398CE', 'rgba(115,152,206,0.62)'],
      text: '#fff',
      skeleton: 'rgba(115,152,206,0.06)',
      shadow: 'rgba(115,152,206,0.8)',
    },
    loader: {
      alphaBg: 'rgba(255, 255, 255, 0.4)',
    },
  },
  sizes: {
    headerHeight: 68,
  },
  media: {
    extraLarge: 1140,
    large: 960,
    medium: 720,
    small: 540,
  },
  //z-index
  orders: {
    inputErrors: 2,
    modal: 10,
    notifications: 15,
    dropdown: 5,
  },
}
