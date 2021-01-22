import React from "react";
import { Link } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/VisibilityOutlined";
import FilterTiltShiftIcon from "@material-ui/icons/FilterTiltShiftOutlined";
import ApartmentOutlinedIcon from "@material-ui/icons/ApartmentOutlined";
import AssessmentOutlinedIcon from "@material-ui/icons/AssessmentOutlined";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import TimelineIcon from "@material-ui/icons/Timeline";
import LocationSearchingIcon from "@material-ui/icons/LocationSearching";
import BallotIcon from "@material-ui/icons/Ballot";
import useStyles from "./styles/styles";

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
          <ListItem divider={false} className={classes.ulList} button>
            <ListItemIcon>
              <VisibilityIcon />
            </ListItemIcon>
            <ListItemText primary="Overview" />
          </ListItem>
        </Link>
        <Link to="/profiles">
          <ListItem divider={false} className={classes.ulList} button>
            <ListItemIcon>
              <FilterTiltShiftIcon />
            </ListItemIcon>
            <ListItemText primary="Profiles" />
          </ListItem>
        </Link>
        <Link to="/campaigns">
          <ListItem divider={false} className={classes.ulList} button>
            <ListItemIcon>
              <ApartmentOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Campaigns" />
          </ListItem>
        </Link>
        <ListItem
          className={classes.ulList}
          button
          divider={false}
          onClick={handleAnalyticsClick}
        >
          <ListItemIcon>
            <AssessmentOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Analytics" />
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
        <Link to="setting">
          <ListItem className={classes.ulList} button>
            <ListItemIcon>
              <SettingsOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Setting" />
          </ListItem>
        </Link>
        <Link to="sign-in">
          <ListItem className={classes.ulList} button>
            <ListItemIcon>
              <SettingsOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Login" />
          </ListItem>
        </Link>
        <Link to="sign-up">
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
