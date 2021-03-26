/* eslint-disable prefer-destructuring */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
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
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import useStyles from "./styles/styles";
import TierLevel from "./TierLevel";
import SvgMaker from "../../components/svgMaker/SvgMaker";
import { getChildrenIdsRequest } from "../../pages/profiles/store/actions/requests";
import poplIcon from "../../assets/poplIcon.png";
import poplIconWhite from "../../assets/poplIcon_white.png";

function PermanentDrawerLeft() {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const [highlight, setHighLight] = useState({});
  const [collapse, setCollapse] = React.useState({
    analyticsOpen: false,
    profilesIsOpen: false,
    connectionsOpen: false,
    campaignsOpen: false,
  });
  const userData = useSelector(({ authReducer }) => authReducer.signIn.data);
  const [childrenAmount, setChildrenAmount] = useState();

  const handleCollapseClick = (name) => {
    const setRestFalse = {};
    Object.keys(collapse).forEach((key) => {
      setRestFalse[key] = false;
    });
    setCollapse({ ...setRestFalse, [name]: !collapse[name] });
  };

  const highlightList = (name) => {
    setHighLight({ [name]: true });
  };

  useEffect(() => {
    let name = location.pathname.split("/")[1];
    if (name === "analytics") {
      name = location.pathname.split("/")[2];
      // setCollapse({ ...collapse, analyticsOpen: true });
    }
    // if (
    //   ["profiles", "connections", "campaigns"].includes(name)
    //   && location.pathname.split("/").length > 2
    // ) {
    //   name = location.pathname.split("/")[2];
    // }

    if (name === "crm-integrations") {
      setCollapse({
        analyticsOpen: false, profilesIsOpen: false, campaignsOpen: false, connectionsOpen: true,
      });
    }

    if (name === "pop-branding") {
      setCollapse({
        analyticsOpen: false, profilesIsOpen: false, campaignsOpen: true, connectionsOpen: false,
      });
    }

    if (name === "new-profile") {
      setCollapse({
        analyticsOpen: false, profilesIsOpen: true, campaignsOpen: false, connectionsOpen: false,
      });
    }

    if (!name) name += "main";
    highlightList(name);
  }, [location]);

  useEffect(() => {
    if (userData?.id) {
      getChildrenIdsRequest(userData.id)
        .then((res) => {
          if (res.data) setChildrenAmount(JSON.parse(res.data).length + 1);
          else setChildrenAmount(1);
        })
        .catch((err) => console.log(err));
    }
  }, [userData]);

  console.log(highlight);

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
          className={classes.logo}
          src="/assests/logo/popl_logo_black.png"
          alt="logo 5"
        />
      </div>
      <div>
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
                    fill="#7d8286"
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
                    fill="#7d8286"
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
              {/* {collapse.profilesIsOpen
                ? <ExpandLessIcon
                  style={{ fill: "#7d8286" }}
                />
                : <ExpandMoreIcon
                  style={{ fill: "#7d8286" }}
                />
              } */}
            </ListItem>
          </Link>
          {/* <Collapse in={collapse.profilesIsOpen} timeout="auto" unmountOnExit>
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
          </Collapse> */}
          <ListItem
            divider={false}
            className={clsx(classes.ulList, {
              [classes.ulListHighLight]: highlight.popls,
            })}
            button
            onClick={() => {
              highlightList("popls");
              history.push("/popls", { disabled: true });
            }}
          >
            <ListItemIcon classes={{ root: classes.listItemIcon }}>
              <div className={classes.sideBarIcons}>
                {/* <SvgMaker
                  name='popl'
                  fill="#7d8286"
                /> */}
                <img className='white' style={{ width: "100%" }} alt='popl' src={poplIconWhite} />
                <img className='dark' style={{ width: "100%" }} alt='popl' src={poplIcon} />
              </div>
            </ListItemIcon>
            <ListItemText
              disableTypography
              classes={{
                root: clsx(classes.listText, {
                  [classes.listTextHighLight]: highlight.popls,
                }),
              }}
              primary="Popls"
            />
          </ListItem>
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
                  fill="#7d8286"
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
            {/* {collapse.connectionsOpen
              ? <ExpandLessIcon
                style={{ fill: "#7d8286" }}
              />
              : <ExpandMoreIcon
                style={{ fill: "#7d8286" }}
              />
            } */}
          </ListItem>
          {/* <Collapse in={collapse.connectionsOpen} timeout="auto" unmountOnExit>
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
          </Collapse> */}
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
                    fill="#7d8286"
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
              {/* {collapse.campaignsOpen
                ? <ExpandLessIcon
                  style={{ fill: "#7d8286" }}
                />
                : <ExpandMoreIcon
                  style={{ fill: "#7d8286" }}
                />
              } */}
            </ListItem>
          </Link>
          {/* <Collapse in={collapse.campaignsOpen} timeout="auto" unmountOnExit>
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
          </Collapse> */}
          <Link to="/analytics/overall">
            <ListItem
              divider={false}
              className={clsx(classes.ulList, {
                [classes.ulListHighLight]: highlight.analytics,
              })}
              button
              onClick={() => {
                handleCollapseClick("analyticsOpen");
                highlightList("overall");
              }}
            >
              <ListItemIcon classes={{ root: classes.listItemIcon }}>
                <div className={classes.sideBarIcons}>
                  <SvgMaker
                    name='analytics'
                    fill="#7d8286"
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
                  style={{ fill: "#7d8286" }}
                />
                : <ExpandMoreIcon
                  style={{ fill: "#7d8286" }}
                />
              }
            </ListItem>
          </Link>
          <Collapse in={collapse.analyticsOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link to="/analytics/overall">
                <ListItem
                  button
                  className={clsx(classes.nested, {
                    [classes.ulListHighLight]: highlight.overall,
                  })}
                  onClick={() => highlightList("overall")}
                >
                  <ListItemText
                    disableTypography
                    classes={{
                      root: clsx(classes.listTextNested, {
                        [classes.listTextHighLight]: highlight.overall,
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
                    fill="#7d8286"
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
        </List>
      </div>
      <div className={classes.sideBarHelpCenterContainer}>
        <TierLevel used={childrenAmount} max={10} />
      </div>
    </Drawer>
  );
}

export default PermanentDrawerLeft;
