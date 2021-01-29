import { responsiveFontSizes } from "@material-ui/core/styles";
import { unstable_createMuiStrictModeTheme as createMuiTheme } from "@material-ui/core";

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
        background: "rgb(58,58,58)",
        backgroundImage:
          "linear-gradient(110deg, rgba(58,58,58,1) 3%, rgba(11,11,11,1) 50%, rgba(0,0,0,1) 80%)",
      },
    },
    MuiPaper: {
      elevation5: {
        boxShadow: "0px 0px 30px rgba(0,0,0,0.2)",
      },
    },

    MuiListItemText: {
      primary: {
        color: "#f9f9f9",
      },
    },

    MuiTypography: {
      h4: {
        textTransform: "uppercase",
      },
      h5: {
        fontWeight: "700",
        fontFamily: "AvenirNextCyr",
        fontSize: "20px !important",
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
        // fill: "#ffffff !important",
      },
    },
  },
});

export default theme = responsiveFontSizes(theme);
