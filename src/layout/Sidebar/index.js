/* eslint-disable prefer-destructuring */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useHistory, withRouter } from "react-router-dom";
import clsx from "clsx";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@material-ui/core";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
// import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import useStyles from "./styles/styles";
import overview from "../../assets/svg/overview.svg";
import overviewDark from "../../assets/svg/overview-dark.svg";
import logout from "../../assets/svg/logout.svg";
import profiles from "../../assets/svg/profiles.svg";
import profileDark from "../../assets/svg/profiles-dark.svg";
import campaigns from "../../assets/svg/campaigns.svg";
import campaignsDark from "../../assets/svg/campaings-dark.svg";
import analytics from "../../assets/svg/analytics.svg";
import settings from "../../assets/svg/settings.svg";
import settingsDark from "../../assets/svg/settings-dark.svg";
import login from "../../assets/svg/login.svg";
import register from "../../assets/svg/register.svg";
import { logoutAction } from "../../pages/auth/store/actions";
import "./styles/styles.css";

function PermanentDrawerLeft({ location, history }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [highlight, setHighLight] = useState({});
  const profileData = useSelector(({ authReducer }) => authReducer.signIn.data);
  const [collapse, setCollapse] = React.useState({
    analyticsOpen: false,
    profilesIsOpen: false,
  });

  // console.log(props);

  const handleCollapseClick = (name) => {
    setCollapse({ ...collapse, [name]: !collapse[name] });
  };

  const highlightList = (name) => {
    setHighLight({ [name]: true });
  };

  const handleLogout = () => dispatch(logoutAction());

  useEffect(() => {
    let name = location.pathname.split("/")[1];
    if (name === "analytics") {
      name = location.pathname.split("/")[2];
      setCollapse({ ...collapse, analyticsOpen: true });
    }
    if (name === "profiles" && location.pathname.split("/").length > 2) {
      name = location.pathname.split("/")[2];
    }

    if (name === "new-profile") {
      setCollapse({ ...collapse, profilesIsOpen: true });
    }

    if (!name) name += "main";
    highlightList(name);
  }, [location]);

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
        <img
          style={{ width: 150 }}
          src="/assests/logo/popl_logo.png"
          alt="logo 5"
        />
      </div>
      <List className={classes.ulMenu}>
        <Link to="/">
          <ListItem
            divider={false}
            className={clsx(classes.ulList, {
              [classes.ulListHighLight]: highlight.main,
            })}
            button
            onClick={() => highlightList("main")}
          >
            <ListItemIcon classes={{ root: classes.listItemIcon }}>
              <img
                className="side-bar-icons"
                alt="overview"
                src={!highlight.main ? overview : overviewDark}
              />
            </ListItemIcon>
            <ListItemText
              disableTypography
              classes={{
                root: clsx(classes.listText, {
                  [classes.listTextHighLight]: highlight.main,
                }),
              }}
              primary="Overview"
            />
          </ListItem>
        </Link>
        <Link to="/profiles">
          <ListItem
            divider={false}
            className={clsx(classes.ulList, {
              [classes.ulListHighLight]: highlight.profiles,
            })}
            button
            onClick={() => {
              handleCollapseClick("profilesIsOpen");
              highlightList("profiles");
            }}
          >
            <ListItemIcon classes={{ root: classes.listItemIcon }}>
              <img
                className="side-bar-icons"
                alt="overview"
                src={!highlight.profiles ? profiles : profileDark}
              />
            </ListItemIcon>
            <ListItemText
              disableTypography
              classes={{
                root: clsx(classes.listText, {
                  [classes.listTextHighLight]: highlight.profiles,
                }),
              }}
              primary="Profiles"
            />
            <ExpandMoreIcon
              style={{ fill: !highlight.profiles ? "#fff" : "#000" }}
            />
          </ListItem>
        </Link>
        <Collapse in={collapse.profilesIsOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Link to="/profiles/new-profile">
              <ListItem
                button
                className={clsx(classes.nested, {
                  [classes.ulListHighLight]: highlight["new-profile"],
                })}
                onClick={() => highlightList("new-profile")}
              >
                <ListItemText
                  disableTypography
                  classes={{
                    root: clsx(classes.listTextNested, {
                      [classes.listTextHighLight]: highlight["new-profile"],
                    }),
                  }}
                  primary="Add profile"
                />
              </ListItem>
            </Link>
          </List>
        </Collapse>
        <Link to="/campaigns">
          <ListItem
            divider={false}
            className={clsx(classes.ulList, {
              [classes.ulListHighLight]: highlight.campaigns,
            })}
            button
            onClick={() => highlightList("campaigns")}
          >
            <ListItemIcon classes={{ root: classes.listItemIcon }}>
              <img
                className="side-bar-icons"
                alt="overview"
                src={!highlight.campaigns ? campaigns : campaignsDark}
              />
            </ListItemIcon>
            <ListItemText
              disableTypography
              classes={{
                root: clsx(classes.listText, {
                  [classes.listTextHighLight]: highlight.campaigns,
                }),
              }}
              primary="Campaigns"
            />
          </ListItem>
        </Link>
        <ListItem
          className={classes.ulList}
          button
          divider={false}
          onClick={() => handleCollapseClick("analyticsOpen")}
        >
          <ListItemIcon classes={{ root: classes.listItemIcon }}>
            <img className="side-bar-icons" alt="overview" src={analytics} />
          </ListItemIcon>
          <ListItemText
            disableTypography
            classes={{ root: classes.listText }}
            primary="Analytics"
          />
          <ExpandMoreIcon />
        </ListItem>
        <Collapse in={collapse.analyticsOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Link to="/analytics/real-time">
              <ListItem
                button
                className={clsx(classes.nested, {
                  [classes.ulListHighLight]: highlight["real-time"],
                })}
                onClick={() => highlightList("real-time")}
              >
                <ListItemText
                  disableTypography
                  classes={{
                    root: clsx(classes.listTextNested, {
                      [classes.listTextHighLight]: highlight["real-time"],
                    }),
                  }}
                  primary="Real time"
                />
              </ListItem>
            </Link>
            <Link to="/analytics/locations">
              <ListItem
                button
                className={clsx(classes.nested, {
                  [classes.ulListHighLight]: highlight.locations,
                })}
                onClick={() => highlightList("locations")}
              >
                <ListItemText
                  disableTypography
                  classes={{
                    root: clsx(classes.listTextNested, {
                      [classes.listTextHighLight]: highlight.locations,
                    }),
                  }}
                  primary="Locations"
                />
              </ListItem>
            </Link>
            <Link to="/analytics/crm-integrations">
              <ListItem
                button
                className={clsx(classes.nested, {
                  [classes.ulListHighLight]: highlight["crm-integrations"],
                })}
                onClick={() => highlightList("crm-integrations")}
              >
                <ListItemText
                  disableTypography
                  classes={{
                    root: clsx(classes.listTextNested, {
                      [classes.listTextHighLight]:
                        highlight["crm-integrations"],
                    }),
                  }}
                  primary="CRM Integrations"
                />
              </ListItem>
            </Link>
          </List>
        </Collapse>
        <Link to="/settings">
          <ListItem
            button
            className={clsx(classes.ulList, {
              [classes.ulListHighLight]: highlight.settings,
            })}
            onClick={() => highlightList("settings")}
          >
            <ListItemIcon classes={{ root: classes.listItemIcon }}>
              <img
                className="side-bar-icons"
                alt="overview"
                src={!highlight.settings ? settings : settingsDark}
              />
            </ListItemIcon>
            <ListItemText
              disableTypography
              classes={{
                root: clsx(classes.listText, {
                  [classes.listTextHighLight]: highlight.settings,
                }),
              }}
              primary="Settings"
            />
          </ListItem>
        </Link>
        {profileData?.id ? (
          <Link to="/sign-in">
            <ListItem className={classes.ulList} button onClick={handleLogout}>
              <ListItemIcon classes={{ root: classes.listItemIcon }}>
                <img className="side-bar-icons" alt="overview" src={logout} />
              </ListItemIcon>
              <ListItemText
                disableTypography
                classes={{ root: classes.listText }}
                primary="Logout"
              />
            </ListItem>
          </Link>
        ) : (
          <>
            <Link to="/sign-in">
              <ListItem className={classes.ulList} button>
                <ListItemIcon classes={{ root: classes.listItemIcon }}>
                  <img className="side-bar-icons" alt="overview" src={login} />
                </ListItemIcon>
                <ListItemText
                  disableTypography
                  classes={{ root: classes.listText }}
                  primary="Login"
                />
              </ListItem>
            </Link>
            <Link to="/sign-up">
              <ListItem className={classes.ulList} button>
                <ListItemIcon classes={{ root: classes.listItemIcon }}>
                  <img
                    className="side-bar-icons"
                    alt="overview"
                    src={register}
                  />
                </ListItemIcon>
                <ListItemText
                  disableTypography
                  classes={{ root: classes.listText }}
                  primary="Register"
                />
              </ListItem>
            </Link>
          </>
        )}
      </List>
      <div className="side-bar-help-center-container">
        <HelpOutlineIcon style={{ cursor: "pointer", fill: "#94a6ab" }} />
        <span>Help Center</span>
      </div>
    </Drawer>
  );
}

export default withRouter(PermanentDrawerLeft);
