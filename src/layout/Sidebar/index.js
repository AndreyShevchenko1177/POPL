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
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import useStyles from "./styles/styles";
import overview from "../../assets/svg/overview.svg";
import profiles from "../../assets/svg/profiles.svg";
import campaigns from "../../assets/svg/campaigns.svg";
import analytics from "../../assets/svg/analytics.svg";
import settings from "../../assets/svg/settings.svg";
import login from "../../assets/svg/login.svg";
import register from "../../assets/svg/register.svg";
import "./styles/styles.css";

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
            <ListItemIcon classes={{ root: classes.listItemIcon }}>
              <img className="side-bar-icons" alt="overview" src={overview} />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.listText }}
              primary="Overview"
            />
          </ListItem>
        </Link>
        <Link to="/profiles">
          <ListItem divider={false} className={classes.ulList} button>
            <ListItemIcon classes={{ root: classes.listItemIcon }}>
              <img className="side-bar-icons" alt="overview" src={profiles} />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.listText }}
              primary="Profiles"
            />
          </ListItem>
        </Link>
        <Link to="/campaigns">
          <ListItem divider={false} className={classes.ulList} button>
            <ListItemIcon classes={{ root: classes.listItemIcon }}>
              <img className="side-bar-icons" alt="overview" src={campaigns} />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.listText }}
              primary="Campaigns"
            />
          </ListItem>
        </Link>
        <ListItem
          className={classes.ulList}
          button
          divider={false}
          onClick={handleAnalyticsClick}
        >
          <ListItemIcon classes={{ root: classes.listItemIcon }}>
            <img className="side-bar-icons" alt="overview" src={analytics} />
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.listText }}
            primary="Analytics"
          />
        </ListItem>
        <Collapse in={analyticsOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Link to="/analytics/real-time">
              <ListItem button className={classes.nested}>
                <ListItemIcon classes={{ root: classes.listItemIcon }}>
                  <TimelineIcon />
                </ListItemIcon>
                <ListItemText
                  classes={{ primary: classes.listText }}
                  primary="Real time"
                />
              </ListItem>
            </Link>
            <Link to="/analytics/locations">
              <ListItem button className={classes.nested}>
                <ListItemIcon classes={{ root: classes.listItemIcon }}>
                  <LocationSearchingIcon />
                </ListItemIcon>
                <ListItemText
                  classes={{ primary: classes.listText }}
                  primary="Locations"
                />
              </ListItem>
            </Link>
            <Link to="/analytics/crm-integrations">
              <ListItem button className={classes.nested}>
                <ListItemIcon classes={{ root: classes.listItemIcon }}>
                  <BallotIcon />
                </ListItemIcon>
                <ListItemText
                  classes={{ primary: classes.listText }}
                  primary="CRM Integrations"
                />
              </ListItem>
            </Link>
          </List>
        </Collapse>
        <Link to="setting">
          <ListItem className={classes.ulList} button>
            <ListItemIcon classes={{ root: classes.listItemIcon }}>
              <img className="side-bar-icons" alt="overview" src={settings} />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.listText }}
              primary="Settings"
            />
          </ListItem>
        </Link>
        <Link to="sign-in">
          <ListItem className={classes.ulList} button>
            <ListItemIcon classes={{ root: classes.listItemIcon }}>
              <img className="side-bar-icons" alt="overview" src={login} />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.listText }}
              primary="Login"
            />
          </ListItem>
        </Link>
        <Link to="sign-up">
          <ListItem className={classes.ulList} button>
            <ListItemIcon classes={{ root: classes.listItemIcon }}>
              <img className="side-bar-icons" alt="overview" src={register} />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.listText }}
              primary="Register"
            />
          </ListItem>
        </Link>
      </List>
      <div className="side-bar-help-center-container">
        <HelpOutlineIcon style={{ cursor: "pointer", fill: "#94a6ab" }} />
        <span>Help Center</span>
      </div>
    </Drawer>
  );
}
