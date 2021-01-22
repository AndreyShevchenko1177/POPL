import React from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import VisibilityIcon from "@material-ui/icons/VisibilityOutlined";
import FilterTiltShiftIcon from "@material-ui/icons/FilterTiltShiftOutlined";
import ApartmentOutlinedIcon from "@material-ui/icons/ApartmentOutlined";
import AssessmentOutlinedIcon from "@material-ui/icons/AssessmentOutlined";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import TimelineIcon from "@material-ui/icons/Timeline";
import LocationSearchingIcon from "@material-ui/icons/LocationSearching";
import BallotIcon from "@material-ui/icons/Ballot";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  nested: {
    paddingLeft: theme.spacing(4),
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#fff",
      color: "#000",
      "& svg": {
        fill: "#000 !important",
      },
    },
  },
  brand: {
    padding: "30px 0px 30px 0px",
    borderBottom: "1px solid #ffffff57",
    width: "100%",
    textAlign: "center",
    margin: 0,
    paddingBottom: 20,
    background: "black",
  },
  ulMenu: { paddingTop: "0px" },
  ulList: {
    background: "#000",
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#fff",
      color: "#000",
      "& svg": {
        fill: "#000 !important",
      },
    },
  },
}));

export default function PermanentDrawerLeft() {
  const classes = useStyles();
  const [analyticsOpen, setAnalyticsOpen] = React.useState(false);

  const handleAnalyticsClick = () => {
    setAnalyticsOpen(!analyticsOpen);
  };

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <div className={classes.toolbar} />
      <div className={classes.brand}>
        <img src="/assests/logo/logo.png" alt="logo 5" />
      </div>
      <List className={classes.ulMenu}>
        <Link to="/">
          <ListItem className={classes.ulList} button>
            <ListItemIcon>
              <VisibilityIcon />
            </ListItemIcon>
            <ListItemText primary="Overview" />
          </ListItem>
        </Link>
        <Divider />
        <Link to="/profiles">
          <ListItem className={classes.ulList} button>
            <ListItemIcon>
              <FilterTiltShiftIcon />
            </ListItemIcon>
            <ListItemText primary="Profiles" />
          </ListItem>
        </Link>
        <Divider />
        <Link to="/campaigns">
          <ListItem className={classes.ulList} button>
            <ListItemIcon>
              <ApartmentOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Campaigns" />
          </ListItem>
        </Link>
        <Divider />
        <ListItem
          className={classes.ulList}
          button
          onClick={handleAnalyticsClick}
        >
          <ListItemIcon>
            <AssessmentOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Analytics" />
          {analyticsOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={analyticsOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Link to="/analytics/real-time">
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <TimelineIcon />
                </ListItemIcon>
                <ListItemText primary="Real time" />
              </ListItem>
            </Link>
            <Link to="/analytics/locations">
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <LocationSearchingIcon />
                </ListItemIcon>
                <ListItemText primary="Locations" />
              </ListItem>
            </Link>
            <Link to="/analytics/crm-integrations">
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <BallotIcon />
                </ListItemIcon>
                <ListItemText primary="CRM Integrations" />
              </ListItem>
            </Link>
          </List>
        </Collapse>
        <Divider />
        <Link to="setting">
          <ListItem className={classes.ulList} button>
            <ListItemIcon>
              <SettingsOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Setting" />
          </ListItem>
        </Link>
        <Divider />
        <Link to="login">
          <ListItem className={classes.ulList} button>
            <ListItemIcon>
              <SettingsOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Login" />
          </ListItem>
        </Link>
        <Divider />
        <Link to="register">
          <ListItem className={classes.ulList} button>
            <ListItemIcon>
              <SettingsOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Register" />
          </ListItem>
        </Link>
      </List>
    </Drawer>
  );
}
