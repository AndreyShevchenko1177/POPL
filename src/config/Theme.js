import { responsiveFontSizes } from "@material-ui/core/styles";
import { unstable_createMuiStrictModeTheme as createMuiTheme } from "@material-ui/core";

let theme = createMuiTheme({
  palette: {
    primary: {
      main: "#212121",
    },
    secondary: {
      main: "#e0e0e0",
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
      "Inter",
      "\"Helvetica Neue\"",
      "Arial",
      "sans-serif",
      "\"Apple Color Emoji\"",
      "\"Segoe UI Emoji\"",
      "\"Segoe UI Symbol\"",
    ].join(","),
  },
  custom: {
    drawerWidth: 270,
    mainBoxShadow: "0px 0px 10px -1px rgb(0 0 0 / 5%), 0px 0px 1px 0px rgb(0 0 0 / 6%), 0px 0px 20px -4px rgb(0 0 0 / 10%)",
    iconBoxShadow: "0px 0px 8px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)",
    // iconBoxShadow: "0px 8px 10px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 3px 20px -4px rgb(0 0 0 / 12%)",
    mainBorderRadius: 10,
    modalOpacityBackground: "#808080",
    modalOpacity: "0.45",
    mainBorderForBigElement: 15,
    mainBorderGreyColor: "#bababa",
  },
  overrides: {
    MuiDrawer: {
      paperAnchorDockedLeft: {
        borderRight: "none",
      },
      paper: {
        // backgroundColor: "#f5f9fa",
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
        fontFamily: "Inter",
        fontSize: "40px !important",
      },
      h2: {
        fontWeight: "700",
        fontFamily: "Inter",
        fontSize: "32px !important",
      },
      h3: {
        fontWeight: "700",
        fontFamily: "Inter",
        fontSize: "28px !important",
      },
      h4: {
        textTransform: "uppercase",
      },
      h5: {
        fontWeight: "700",
        fontFamily: "Inter",
        fontSize: "17px !important",
      },
      h6: {
        fontWeight: "normal",
        fontFamily: "Inter",
        fontSize: "16px !important",
      },
      body1: {
        fontWeight: "200",
        fontFamily: "Inter",
        fontSize: "20px !important",
      },
      body2: {
        fontWeight: "200",
        fontFamily: "Inter",
        fontSize: "20px !important",
      },
      subtitle1: {
        fontWeight: "normal",
        fontFamily: "Inter",
        fontSize: "14px !important",
      },
      subtitle2: {
        fontWeight: "700",
        fontFamily: "Inter",
        fontSize: "24px !important",
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
