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
import { getChildrenIdsRequest } from "../../pages/profiles/store/actions/requests";
import { profileCountTierLevelAction, getSubscriptionInfoAction } from "../../store/actions";
import ProfileImage from "./ProfileImage";
import poplIcon from "../../assets/poplIcon_black.png";
import poplIconWhite from "../../assets/poplIcon_white.png";
import profiles from "../../assets/profiles.png";
import profilesWhite from "../../assets/profile_white.png";
import connections from "../../assets/connections.png";
import connectionsWhite from "../../assets/connections_white.png";
import analytics from "../../assets/analytics.png";
import analyticsWhite from "../../assets/analytics_white.png";
import settings from "../../assets/settings.png";
import settingsWhite from "../../assets/settings_white.png";
import Loader from "../../components/Loader";
import { getCompanyInfoAction } from "../../pages/generalSettings/store/actions";

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
  const { tierLevelInfo } = useSelector(({ systemReducer }) => systemReducer);
  const { result: profileInfoSideBar, isFetching } = useSelector(({ systemReducer }) => systemReducer.profileInfoSideBar);
  const dispatch = useDispatch();
  const profileInfo = useSelector(({ generalSettingsReducer }) => generalSettingsReducer.companyInfo.data);

  const handleCollapseClick = (name) => {
    const setRestFalse = {};
    Object.keys(collapse).forEach((key) => {
      setRestFalse[key] = false;
    });
    setCollapse({ ...setRestFalse, [name]: !collapse[name] });
  };

  console.log(highlight);

  const highlightList = (name) => {
    setHighLight({ [name]: true });
  };

  useEffect(() => {
    let name = location.pathname.split("/")[1];
    console.log(location);
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
    if (userData?.id) {
      getChildrenIdsRequest(userData.id)
        .then((res) => {
          if (res.data && res.data !== "null") dispatch(profileCountTierLevelAction(JSON.parse(res.data).length + 1));
          else dispatch(profileCountTierLevelAction(1));
        })
        .catch((err) => console.log(err));
    }
  }, [userData]);

  useEffect(() => {
    if (localStorage.getItem("subscription")) {
      const result = JSON.parse(localStorage.getItem("subscription"));
      dispatch(getSubscriptionInfoAction({ subscriptionName: result.pricingName, maxProfiles: result.unitsRange }));
    }
    dispatch(getCompanyInfoAction());
  }, []);

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
                    fill="#000000"
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
                <div style={{ width: 25, height: 25 }} className={classes.sideBarIcons}>
                  {/* <SvgMaker
                    name='profile'
                    fill="#7d8286"
                  /> */}
                  <img className='white' style={{ width: "100%" }} alt='popl' src={profilesWhite} />
                  <img className='dark' style={{ width: "100%" }} alt='popl' src={profiles} />
                </div>
              </ListItemIcon>
              <ListItemText
                disableTypography
                classes={{
                  root: clsx(classes.listText, {
                    [classes.listTextHighLight]: highlight.profiles,
                  }),
                }}
                style={{ position: "relative" }}
                primary="Profiles"
              />
              {isFetching ? <Loader styles={{
                width: 20, height: 20,
              }}/>
                : <Typography variant='subtitle1' classes={{
                  root: clsx(classes.listText, {
                    [classes.listTextHighLight]: highlight.profiles,
                  }),
                }}>{profileInfoSideBar.totalProfiles}</Typography> }
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
              <div className={classes.sideBarIcons}>
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
              primary="Connections"
            />
            {isFetching ? <Loader styles={{
              width: 20, height: 20,
            }}/>
              : <Typography variant='subtitle1' classes={{
                root: clsx(classes.listText, {
                  [classes.listTextHighLight]: highlight.connections,
                }),
              }}>{profileInfoSideBar.connections}</Typography>}
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
            {isFetching ? <Loader styles={{
              width: 20, height: 20,
            }}/>
              : <Typography variant='subtitle1' classes={{
                root: clsx(classes.listText, {
                  [classes.listTextHighLight]: highlight.popls,
                }),
              }}>{profileInfoSideBar.totalPopls}</Typography>}
          </ListItem>
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
                    fill="#000000"
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
            </ListItem>
          </Link>
          <ListItem
            divider={false}
            className={clsx(classes.ulList, {
              [classes.ulListHighLight]: highlight.analytics,
            })}
            button
            onClick={() => {
              handleCollapseClick("analyticsOpen");
              highlightList("analytics");
              history.push("/analytics", {});
            }}
          >
            <ListItemIcon classes={{ root: classes.listItemIcon }}>
              <div style={{
                width: 30, height: 30, display: "flex", alignItems: "center",
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
            />
          </ListItem>
          <Link to="/settings">
            <ListItem
              button
              className={clsx(classes.ulList, {
                [classes.ulListHighLight]: highlight.settings,
              })}
              onClick={() => highlightList("settings")}
            >
              <ListItemIcon classes={{ root: classes.listItemIcon }}>
                <div style={{
                  width: 25, height: 25, display: "flex", alignItems: "center",
                }} className={classes.sideBarIcons}>
                  {/* <SvgMaker
                    name='settings'
                    fill="#7d8286"
                  /> */}
                  <img className='white' style={{ width: "100%" }} alt='popl' src={settingsWhite} />
                  <img className='dark' style={{ width: "100%" }} alt='popl' src={settings} />
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
          {profileInfo && <Link to="/settings/general-settings">
            <ListItem
              button
              className={clsx(classes.ulList, {
                [classes.ulListHighLight]: highlight.profileInfo,
              })}
              onClick={() => highlightList("profileInfo")}
            >
              <ListItemIcon classes={{ root: classes.listItemIcon }}>
                <div style={{
                  width: 25, height: 25, display: "flex", alignItems: "center",
                }} className={classes.sideBarIcons}>
                  {profileInfo[3] && <img className={classes.profileImage} alt='avatar' src={`${process.env.REACT_APP_BASE_FIREBASE_CUSTOM_ICON}${profileInfo[3]}?alt=media`} />}
                  {profileInfo[1] && !profileInfo[3] && <div className={classes.profileCircle} style={{ backgroundColor: profileInfo[1] }}></div>}
                </div>
              </ListItemIcon>
              <ListItemText
                disableTypography
                classes={{
                  root: clsx(classes.listText, {
                    [classes.listTextHighLight]: highlight.profileInfo,
                  }),
                }}
                primary={profileInfo[0]}
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
      </div>
    </Drawer>
  );
}

export default PermanentDrawerLeft;
