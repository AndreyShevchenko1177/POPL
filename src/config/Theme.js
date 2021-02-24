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
  custom: {
    mainBoxShadow: "0px 0px 10px 10px rgb(207 207 207 / 50%)",
    mainBorderRadius: 10,
    mainBorderForBigElement: 15,
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
    MuiButton: {
      root: {
        borderRadius: 10,
        textTransform: "none",
      },
    },
    MuiFormControlLabel: {
      label: {
        borderRadius: 10,
      },
    },
    MuiTypography: {
      h2: {
        fontWeight: "700",
        fontFamily: "AvenirNextCyr",
        fontSize: "32px !important",
      },
      h3: {
        fontWeight: "700",
        fontFamily: "AvenirNextCyr",
        fontSize: "28px !important",
      },
      h4: {
        textTransform: "uppercase",
      },
      h5: {
        fontWeight: "700",
        fontFamily: "AvenirNextCyr",
        fontSize: "17px !important",
      },
      h6: {
        fontWeight: "normal",
        fontFamily: "AvenirNextCyr",
        fontSize: "16px !important",
      },
      body1: {
        fontWeight: "200",
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
