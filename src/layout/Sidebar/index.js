/* eslint-disable prefer-destructuring */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useHistory } from "react-router-dom";
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
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import useStyles from "./styles/styles";
import overview from "../../assets/svg/overview.svg";
import overviewDark from "../../assets/svg/overview-dark.svg";
import logout from "../../assets/svg/logout.svg";
import connect from "../../assets/svg/connect.svg";
import connectDark from "../../assets/svg/connect-dark.svg";
import campaigns from "../../assets/svg/campaigns.svg";
import campaignsDark from "../../assets/svg/campaings-dark.svg";
import analytics from "../../assets/svg/analytics.svg";
import settings from "../../assets/svg/settings.svg";
import settingsDark from "../../assets/svg/settings-dark.svg";
import login from "../../assets/svg/login.svg";
import register from "../../assets/svg/register.svg";
import { logoutAction } from "../../pages/auth/store/actions";
import TierLevel from "./TierLevel";
import SvgMaker from "../../components/svgMaker/SvgMaker";

function PermanentDrawerLeft() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const [highlight, setHighLight] = useState({});
  const profileData = useSelector(({ authReducer }) => authReducer.signIn.data);
  const [collapse, setCollapse] = React.useState({
    analyticsOpen: false,
    profilesIsOpen: false,
    connectionsOpen: false,
    campaignsOpen: false,
  });

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
      // setCollapse({ ...collapse, analyticsOpen: true });
    }
    if (
      ["profiles", "connections", "campaigns"].includes(name)
      && location.pathname.split("/").length > 2
    ) {
      name = location.pathname.split("/")[2];
    }

    if (name === "crm-integrations") {
      setCollapse({ ...collapse, connectionsOpen: true });
    }

    if (name === "pop-branding") {
      setCollapse({ ...collapse, campaignsOpen: true });
    }

    if (name === "new-profile" || name === "popls") {
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
              <div className={classes.sideBarIcons}>
                <SvgMaker
                  name='overview'
                  fill={!highlight.main ? "#fff" : "#000"}
                />
              </div>
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
              <div className={classes.sideBarIcons}>
                <SvgMaker
                  name='profile'
                  fill={!highlight.profiles ? "#fff" : "#000"}
                />
              </div>
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
            {collapse.profilesIsOpen
              ? <ExpandLessIcon
                style={{ fill: !highlight.profiles ? "#fff" : "#000" }}
              />
              : <ExpandMoreIcon
                style={{ fill: !highlight.profiles ? "#fff" : "#000" }}
              />
            }
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
          <List component="div" disablePadding>
            <ListItem
              button
              className={clsx(classes.nested, {
                [classes.ulListHighLight]: highlight.popls,
              })}
              onClick={() => {
                highlightList("popls");
                history.push("/profiles/popls", { disabled: true });
              }}
            >
              <ListItemText
                disableTypography
                classes={{
                  root: clsx(classes.listTextNested, {
                    [classes.listTextHighLight]: highlight.popls,
                  }),
                }}
                primary="Popls"
              />
            </ListItem>
          </List>
        </Collapse>
        {/* <Link to="/connections"> */}
        <ListItem
          divider={false}
          className={clsx(classes.ulList, {
            [classes.ulListHighLight]: highlight.connections,
          })}
          button
          onClick={() => {
            handleCollapseClick("connectionsOpen");
            highlightList("connections");
            history.push("/connections", { disabled: true });
          }}
        >
          <ListItemIcon classes={{ root: classes.listItemIcon }}>
            <div className={classes.sideBarIcons}>
              <SvgMaker
                name='connection'
                fill={!highlight.connections ? "#fff" : "#000"}
              />
            </div>
          </ListItemIcon>
          <ListItemText
            disableTypography
            classes={{
              root: clsx(classes.listText, {
                [classes.listTextHighLight]: highlight.connections,
              }),
            }}
            primary="Connections"
          />
          {collapse.connectionsOpen
            ? <ExpandLessIcon
              style={{ fill: !highlight.connections ? "#fff" : "#000" }}
            />
            : <ExpandMoreIcon
              style={{ fill: !highlight.connections ? "#fff" : "#000" }}
            />
          }
        </ListItem>
        {/* </Link> */}
        <Collapse in={collapse.connectionsOpen} timeout="auto" unmountOnExit>
          <Link to="/connections/crm-integrations">
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
                    [classes.listTextHighLight]: highlight["crm-integrations"],
                  }),
                }}
                primary="CRM Integrations"
              />
            </ListItem>
          </Link>
        </Collapse>
        <Link to="/campaigns">
          <ListItem
            divider={false}
            className={clsx(classes.ulList, {
              [classes.ulListHighLight]: highlight.campaigns,
            })}
            button
            onClick={() => {
              handleCollapseClick("campaignsOpen");
              highlightList("campaigns");
            }}
          >
            <ListItemIcon classes={{ root: classes.listItemIcon }}>
              <div className={classes.sideBarIcons}>
                <SvgMaker
                  name='campaigns'
                  fill={!highlight.campaigns ? "#fff" : "#000"}
                />
              </div>
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
            {collapse.campaignsOpen
              ? <ExpandLessIcon
                style={{ fill: !highlight.campaigns ? "#fff" : "#000" }}
              />
              : <ExpandMoreIcon
                style={{ fill: !highlight.campaigns ? "#fff" : "#000" }}
              />
            }
          </ListItem>
        </Link>
        <Collapse in={collapse.campaignsOpen} timeout="auto" unmountOnExit>
          <Link to="/campaings/pop-branding">
            <ListItem
              divider={false}
              className={clsx(classes.nested, {
                [classes.ulListHighLight]: highlight["pop-branding"],
              })}
              button
              onClick={() => highlightList("pop-branding")}
            >
              <ListItemText
                disableTypography
                classes={{
                  root: clsx(classes.listTextNested, {
                    [classes.listTextHighLight]: highlight["pop-branding"],
                  }),
                }}
                primary="Pop Branding"
              />
            </ListItem>
          </Link>
        </Collapse>
        <Link to="/analytics/real-time">
          <ListItem
            divider={false}
            className={clsx(classes.ulList, {
              [classes.ulListHighLight]: highlight.analytics,
            })}
            button
            onClick={() => {
              handleCollapseClick("analyticsOpen");
              highlightList("real-time");
            }}
          >
            <ListItemIcon classes={{ root: classes.listItemIcon }}>
              <div className={classes.sideBarIcons}>
                <SvgMaker
                  name='analytics'
                  fill='#f9f9f9'
                />
              </div>
            </ListItemIcon>
            <ListItemText
              to="/analytics/locations"
              disableTypography
              classes={{ root: classes.listText }}
              primary="Analytics"
            />
            {collapse.analyticsOpen
              ? <ExpandLessIcon
                style={{ fill: "#fff" }}
              />
              : <ExpandMoreIcon
                style={{ fill: "#fff" }}
              />
            }
          </ListItem>
        </Link>
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
                  primary="Overall"
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
                  primary="Individual"
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
              <div className={classes.sideBarIcons}>
                <SvgMaker
                  name='settings'
                  fill={!highlight.settings ? "#fff" : "#000"}
                />
              </div>
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
                <div className={classes.sideBarIcons}>
                  <SvgMaker
                    name='logout'
                    fill='#f9f9f9'
                  />
                </div>
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
                  <img className={classes.sideBarIcons} alt="overview" src={login} />
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
                    className={classes.sideBarIcons}
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
      <div className={classes.sideBarHelpCenterContainer}>
        <TierLevel used={10} max={30} />
      </div>
    </Drawer>
  );
}

export default PermanentDrawerLeft;
