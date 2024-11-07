const appTheme = {
  light: {
    direction: "ltr",
    typography: {
      fontFamily: [
        "Comfortaa Variable",
        "Oswald",
        "Cabin Variable",
        "Avenir",
        "Helvetica",
        "Inter",
        "system-ui",
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
    },
    palette: {
      mode: "light",
      background: {
        default: "#dedede",
      },
      text: {
        primary: "rgba(12, 12, 12, 1)",
      },
    },
  },
  dark: {
    direction: "ltr",
    typography: {
      fontFamily: [
        'Comfortaa Variable',
        "Oswald",
        "Cabin Variable",
        "Avenir",
        "Helvetica",
        "Inter",
        "system-ui",
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
    },
    palette: {
      mode: "dark",
      background: {
        default: "#0f0f0f",
      },
      text: {
        primary: "#FAF8FF",
      },
    },
  },
};

export default appTheme;
