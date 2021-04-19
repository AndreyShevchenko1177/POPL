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
    specifyText: {
      main: "#6f829a",
    },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      "\"Segoe UI\"",
      "Roboto",
      "\"Helvetica Neue\"",
      "Arial",
      "sans-serif",
      "\"Apple Color Emoji\"",
      "\"Segoe UI Emoji\"",
      "\"Segoe UI Symbol\"",
    ].join(","),
  },
  custom: {
    drawerWidth: 300,
    mainBoxShadow: "0px 0px 10px 10px rgb(207 207 207 / 50%)",
    iconBoxShadow: "0px 0px 5px 5px rgb(207 207 207 / 50%)",
    mainBorderRadius: 10,
    modalOpacityBackground: "#808080",
    modalOpacity: "0.45",
    mainBorderForBigElement: 15,
    mainBorderGreyColor: "#bababa",
  },
  overrides: {
    MuiDrawer: {
      paper: {
        backgroundColor: "#f5f9fa",
        // background: "rgb(167,163,163)",
        // backgroundImage:
        //   "linear-gradient(110deg, rgba(230,225,225,1) 3%, rgba(208,204,204,1) 50%, rgba(199,195,195,1) 80%)",
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
    MuiTabs: {
      indicator: {
        height: 0,
      },
    },
    MuiTab: {
      root: {
        textTransform: "none",
      },
      wrapper: {
        fontSize: "1rem",
      },
    },
    MuiTypography: {
      h1: {
        fontWeight: "700",
        fontFamily: "dmSans",
        fontSize: "50px !important",
      },
      h2: {
        fontWeight: "700",
        fontFamily: "dmSans",
        fontSize: "32px !important",
      },
      h3: {
        fontWeight: "700",
        fontFamily: "dmSans",
        fontSize: "28px !important",
      },
      h4: {
        textTransform: "uppercase",
      },
      h5: {
        fontWeight: "700",
        fontFamily: "dmSans",
        fontSize: "17px !important",
      },
      h6: {
        fontWeight: "normal",
        fontFamily: "dmSans",
        fontSize: "16px !important",
      },
      body1: {
        fontWeight: "200",
        fontFamily: "dmSans",
        fontSize: "20px !important",
      },
      body2: {
        fontWeight: "700",
        fontFamily: "dmSans",
        fontSize: "20px !important",
      },
      subtitle1: {
        fontWeight: "normal",
        fontFamily: "dmSans",
        fontSize: "14px !important",
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
    MuiAlert: {
      filledInfo: {
        backgroundColor: "rgb(50, 50, 50)",
      },
    },
  },
});

export default theme = responsiveFontSizes(theme);
