import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

let theme = createMuiTheme({
  palette: {
    primary: {
      main: "#212121",
    },
    secondary: {
      main: "#fff",
    },
  },
  typography: {
    fontFamily: [
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
  overrides: {
    MuiDrawer: {
      paper: {
        background: "#000000",
      },
    },
    MuiPaper: {
      elevation5: {
        boxShadow: "0px 0px 30px rgba(0,0,0,0.2)",
      },
    },

    MuiTypography: {
      h4: {
        textTransform: "uppercase",
      },
      h5: {
        fontWeight: "700",
      },
    },
    MuiListItemIcon: {
      root: {
        color: "#FFF",
      },
    },
    MuiDivider: {
      root: {
        background: "rgba(255, 255, 255, 0.30) !important",
      },
    },
    ulList: {
      svg: {
        fill: "#ffffff !important",
      },
    },
  },
});

export default theme = responsiveFontSizes(theme);
