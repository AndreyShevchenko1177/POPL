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
  Typography,
} from "@material-ui/core";
import useStyles from "./styles/styles";
import TierLevel from "./TierLevel";
import SvgMaker from "../../components/svgMaker/SvgMaker";
import { getSubscriptionInfoAction, fetchingAction } from "../../store/actions";
import poplIcon from "../../assets/sidebar/poplIcon_grey.png";
import poplIconWhite from "../../assets/sidebar/poplIcon_white.png";
import profiles from "../../assets/sidebar/profiles.png";
import profilesWhite from "../../assets/sidebar/profile_white.png";
import connections from "../../assets/sidebar/connections.png";
import connectionsWhite from "../../assets/sidebar/connections_white.png";
import analytics from "../../assets/sidebar/analytics.png";
import analyticsWhite from "../../assets/sidebar/analytics_white.png";
import settings from "../../assets/sidebar/settings.png";
import poplLogo from "../../assets/popl-enterprise.png";
import Loader from "../../components/Loader";
import { getCompanyInfoAction } from "../../pages/generalSettings/store/actions";
import { cleanAction } from "../../pages/overallAnalytics/store/actions";
import { subscriptionConfig } from "../../pages/billing/index";
import useLongPress from "../../components/useLongPressHook";

function PermanentDrawerLeft() {
  const [fadeColor, setFadeColor] = useState("rgba(255,255,255,1)");
  const classes = useStyles({ fadeColor });
  const location = useLocation();
  const history = useHistory();
  const [highlight, setHighLight] = useState({});
  const [collapse, setCollapse] = React.useState({
    analyticsOpen: false,
    profilesIsOpen: false,
    connectionsOpen: false,
    campaignsOpen: false,
  });
  const [greyedLinks, setGreyedLinks] = useState({
    accounts: false,
    analytics: false,
    connections: false,
    devices: false,
    notifications: false,
  });
  const { tierLevelInfo } = useSelector(({ systemReducer }) => systemReducer);
  const poplsSidebar = useSelector(({ systemReducer }) => systemReducer.poplsSidebar.data);
  const poplsFetching = useSelector(({ systemReducer }) => systemReducer.poplsSidebar.isFetching);
  const profilesSidebar = useSelector(({ systemReducer }) => systemReducer.profilesSidebar.data);
  const profilesFetching = useSelector(({ systemReducer }) => systemReducer.profilesSidebar.isFetching);
  const connectionsSidebar = useSelector(({ systemReducer }) => systemReducer.connectionsSidebar.data);
  const connectionsFetching = useSelector(({ systemReducer }) => systemReducer.connectionsSidebar.isFetching);
  const dispatch = useDispatch();
  const profileInfo = useSelector(({ generalSettingsReducer }) => generalSettingsReducer.companyInfo.data);
  const totalProfiles = useSelector(({ systemReducer }) => systemReducer.profilesInfoMainPage);
  const dashboardPlan = useSelector(({ authReducer }) => authReducer.dashboardPlan.data);
  const stripeQuantity = useSelector(({ systemReducer }) => systemReducer.setMeteredSubQuantity);
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
  let timer = null;
  const timeout = (time) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      ["poplsSidebar", "profilesSidebar", "connectionsSidebar"].forEach((name) => {
        dispatch(fetchingAction(false, name));
      });
    }, time);
  };
  const onLongPress = () => {
    history.push("/campaigns");
  };
  const longPressEvent = useLongPress(onLongPress, () => {}, { delay: 2000, shouldPreventDefault: true });
  useEffect(() => {
    let name = location.pathname.split("/")[1];
    if (location.pathname.includes("general-settings")) {
      name = "profileInfo";
    }
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
    if (localStorage.getItem("subscription")) {
      const result = JSON.parse(localStorage.getItem("subscription"));
      dispatch(getSubscriptionInfoAction({ subscriptionName: result.pricingName, maxProfiles: result.unitsRange }));
    }
    dispatch(getCompanyInfoAction());
  }, []);
  useEffect(() => {
    if (dashboardPlan !== null) {
      if (dashboardPlan == 0 || dashboardPlan === "") {
        if (totalProfiles === 1) {
          setGreyedLinks({
            accounts: false,
            analytics: true,
            connections: false,
            devices: true,
            notifications: false,
          });
        } else {
          setGreyedLinks({
            accounts: true,
            analytics: true,
            connections: true,
            devices: true,
            notifications: true,
          });
        }
      } else {
        const subscription = subscriptionConfig.find((sub) => sub.id == dashboardPlan);
        if (dashboardPlan == "10" && stripeQuantity) { // setting actual quantity to unitsRange if subscription is on metered pricing
          subscription.unitsRange = [0, stripeQuantity];
        }
        if (totalProfiles > subscription.unitsRange[1]) {
          setGreyedLinks({
            accounts: true,
            analytics: true,
            connections: true,
            devices: true,
            notifications: true,
          });
        } else {
          setGreyedLinks({
            accounts: false,
            analytics: false,
            connections: false,
            devices: false,
            notifications: false,
          });
        }
      }
    }
  }, [location, totalProfiles, dashboardPlan, stripeQuantity]);
  useEffect(() => {
    timeout(5000);
  }, [poplsFetching, profilesFetching, connectionsFetching]);
  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
      style={{ backgroundColor: profileInfo && profileInfo[1] ? `${profileInfo[1]}0f` : "#ffffff" }} // setting color from company settings with 6% opacity
    >
      <div className={classes.toolbar} />
      <div className={classes.brand} {...longPressEvent}>
        <img
          className={classes.logo}
          src={poplLogo}
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
                    fill="#666666"
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
          <Link to="/accounts">
            <ListItem
              divider={false}
              className={clsx(classes.ulList, {
                [classes.ulListHighLight]: highlight.accounts,
              })}
              button
              onClick={() => {
                handleCollapseClick("profilesIsOpen");
                highlightList("profiles");
              }}
            >
              <ListItemIcon classes={{ root: classes.listItemIcon }}>
                <div style={{ width: 20, height: 20 }} className={classes.sideBarIcons}>
                  {/* <SvgMaker
                    name='profile'
                    fill="#7d8286"
                  /> */}
                  <img className='white' style={{ width: "100%", marginLeft: 3 }} alt='popl' src={profilesWhite} />
                  <img className='dark' style={{ width: "100%", marginLeft: 3 }} alt='popl' src={profiles} />
                </div>
              </ListItemIcon>
              <ListItemText
                disableTypography
                style={greyedLinks.accounts ? { color: "#b8b8b8", position: "relative" } : { position: "relative" }}
                classes={{
                  root: clsx(classes.listText, {
                    [classes.listTextHighLight]: highlight.profiles,
                  }),
                }}
                primary="Accounts"
              />
              { profilesFetching
                ? <Loader styles={ { width: 20, height: 20 } } />
                : <Typography variant='subtitle1'
                  style={greyedLinks.accounts ? { color: "#b8b8b8", position: "relative" } : { position: "relative" }}
                  classes={{
                    root: clsx(classes.listText, {
                      [classes.listTextHighLight]: highlight.profiles,
                    }),
                    subtitle1: classes.fontSize13,
                  }}>{profilesSidebar}</Typography> }
            </ListItem>
          </Link>
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
              <div style={{ width: 20, height: 20 }} className={classes.sideBarIcons}>
                {/* <SvgMaker
                  name='connection'
                  fill="#7d8286"
                /> */}
                <img className='white' style={{ width: "100%" }} alt='popl' src={connectionsWhite} />
                <img className='dark' style={{ width: "100%" }} alt='popl' src={connections} />
              </div>
            </ListItemIcon>
            <ListItemText
              disableTypography
              classes={{
                root: clsx(classes.listText, {
                  [classes.listTextHighLight]: highlight.connections,
                }),
              }}
              style={greyedLinks.connections ? { color: "#b8b8b8", position: "relative" } : { position: "relative" }}
              primary="Connections"
            />
            {connectionsFetching ? <Loader styles={{
              width: 20, height: 20,
            }}/>
              : <Typography variant='subtitle1'
                style={greyedLinks.connections ? { color: "#b8b8b8", position: "relative" } : { position: "relative" }}
                classes={{
                  root: clsx(classes.listText, {
                    [classes.listTextHighLight]: highlight.connections,
                  }),
                  subtitle1: classes.fontSize13,
                }}>{connectionsSidebar}</Typography>}
          </ListItem>
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
              <div style={{ width: 18, height: 18 }} className={classes.sideBarIcons}>
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
              style={greyedLinks.devices ? { color: "#b8b8b8", position: "relative" } : {}}
              primary="Devices"
            />
            {poplsFetching ? <Loader styles={{
              width: 20, height: 20,
            }}/>
              : <Typography variant='subtitle1'
                style={greyedLinks.devices ? { color: "#b8b8b8", position: "relative" } : { position: "relative" }}
                classes={{
                  root: clsx(classes.listText, {
                    [classes.listTextHighLight]: highlight.popls,
                  }),
                  subtitle1: classes.fontSize13,
                }}>{poplsSidebar}</Typography>}
          </ListItem>
          <ListItem
            divider={false}
            className={clsx(classes.ulList, {
              [classes.ulListHighLight]: highlight.analytics,
            })}
            button
            onClick={() => {
              if (location.pathname === "/analytics") return;
              handleCollapseClick("analyticsOpen");
              highlightList("analytics");
              history.push("/analytics", {});
            }}
          >
            <ListItemIcon classes={{ root: classes.listItemIcon }}>
              <div style={{
                width: 25, height: 20, display: "flex", alignItems: "center",
              }} className={classes.sideBarIcons}>
                {/* <SvgMaker
                  name='analytics'
                  fill="#7d8286"
                /> */}
                <img className='white' style={{ width: "100%" }} alt='popl' src={analyticsWhite} />
                <img className='dark' style={{ width: "100%" }} alt='popl' src={analytics} />
              </div>
            </ListItemIcon>
            <ListItemText
              disableTypography
              classes={{ root: classes.listText }}
              primary="Analytics"
              style={greyedLinks.analytics ? { color: "#b8b8b8", position: "relative" } : {}}
            />
          </ListItem>

          <Link to="/notifications">
            <ListItem
              divider={false}
              className={clsx(classes.ulList, {
                [classes.ulListHighLight]: highlight.notifications,
              })}
              button
              onClick={() => {
                highlightList("notifications");
              }}
            >
              <ListItemIcon classes={{ root: classes.listItemIcon }}>
                <div style={{ width: 18, height: 18 }} className={classes.sideBarIcons}>
                  <SvgMaker
                    name='notification'
                    fill="#666666"
                  />
                  {/* <img className='white' style={{ width: "100%" }} alt='popl' src={notificationWhite} />
                  <img className='dark' style={{ width: "100%" }} alt='popl' src={notification} /> */}
                </div>
              </ListItemIcon>
              <ListItemText
                disableTypography
                classes={{
                  root: clsx(classes.listText, {
                    [classes.listTextHighLight]: highlight.notifications,
                  }),
                }}
                style={greyedLinks.notifications ? { color: "#b8b8b8", position: "relative" } : {}}
                primary="Notifications"
              />
            </ListItem>
          </Link>
          {profileInfo && <Link to="/settings/general-settings">
            <ListItem
              button
              className={clsx(classes.ulList, classes.ulListProfileInfo, {
                [classes.ulListHighLight]: highlight.profileInfo,
              })}
              onClick={() => highlightList("profileInfo")}
              style={{ paddingLeft: 28 }}
            >
              <ListItemIcon classes={{ root: classes.listItemIcon }}>
                <div style={{
                  width: 40, height: 40, display: "flex", alignItems: "center",
                }} className={classes.sideBarIcons}>
                  {profileInfo[3] ? <img className={classes.profileImage} alt='avatar' src={`${process.env.REACT_APP_BASE_FIREBASE_LOGOS_URL}${profileInfo[3]}?alt=media`} />
                    : !profileInfo[3] && <div className={classes.profileCircle}>
                      <div className={classes.logoIconWrapper}>
                        <SvgMaker name="uploadCloud" fill="#999a9b" width={20} height={20} />
                        <span>Upload</span>
                      </div>
                    </div>}
                </div>
              </ListItemIcon>
              <ListItemText
                disableTypography
                style={{ paddingLeft: 12 }}
                classes={{
                  root: clsx(classes.listText, {
                    [classes.listTextHighLight]: highlight.profileInfo,
                  }),
                }}
                primary={profileInfo[0] || "Your Company name"}
              />
            </ListItem>
          </Link>}
        </List>
      </div>
      {/* <div>
        <ProfileImage name={profileInfo && profileInfo[0]} image={profileInfo && profileInfo[3]} color={profileInfo && profileInfo[1]}/>
      </div> */}
      <div className={classes.sideBarHelpCenterContainer}>
        <TierLevel {...tierLevelInfo} />
        <div className={classes.settingsContainer}>
          <div style={{
            width: 20, height: 20, display: "flex", alignItems: "center", marginRight: 15,
          }} className={classes.sideBarIcons}>
            <img className='dark' style={{ width: "100%" }} alt='popl' src={settings} />
          </div>
          <span className={classes.settingsText} onClick={() => history.push("/settings")}>
            Settings
          </span>
        </div>

        <a href="mailto:jason@popl.co">
          <div className={classes.settingsContainer}>
            <div style={{
              width: 20, height: 20, display: "flex", alignItems: "center", marginRight: 15,
            }} className={classes.sideBarIcons}>
              {/* <img className='dark' style={{ width: "100%" }} alt='popl' src={settings} /> */}
            </div>
            <span className={classes.settingsText}>
              Support
            </span>
          </div>
        </a>

      </div>
    </Drawer>
  );
}
export default PermanentDrawerLeft;
