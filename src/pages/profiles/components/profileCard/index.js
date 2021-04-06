import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Paper, Typography, Button } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import clsx from "clsx";
import Avatar from "../../../../components/popl/Avatar";
import useStyles from "./styles/styles";
import SocialPoplsIcons from "../profilelsIcons";
import DragDots from "../../../../components/dragDots";
import userIcon from "../../../../assets/svg/user.svg";
import { imagesExtensions } from "../../../../constants";
import { setDirectAction, setProfileStatusAction } from "../../store/actions";
import ProfilePanel from "./controlProfilePanel";

export default function Card({
  handleClickPoplItem,
  profilesCheck,
  checkboxes,
  customId,
  name,
  url,
  image,
  business,
  social,
  activeProfile,
  bio,
  bioBusiness,
  direct,
  id,
  profileOff,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [directOn, setDirectOn] = useState({
    direct: false,
    text: "Direct",
  });
  const [personalMode, setPersonalMode] = useState({
    direct: false,
    text: "Personal",
  });
  const extension = image.split(".");

  const setBio = () => {
    const result = personalMode.direct ? bioBusiness || bio : bio || "";
    return result;
  };

  const handleSwitchChanger = (event, name) => {
    if (name === "dir2") {
      dispatch(setProfileStatusAction([id], personalMode.direct ? "1" : "2"));
      return setPersonalMode({
        direct: !personalMode.direct,
        text: !personalMode.direct ? "Business" : "Personal",
      });
    }
    dispatch(setDirectAction([id], directOn.direct ? "0" : "1"));
    return setDirectOn({
      direct: !directOn.direct,
      text: "Direct",
    });
  };

  useEffect(() => {
    if (activeProfile === "2") setPersonalMode({ direct: true, text: "Business" });
  }, [activeProfile]);

  useEffect(() => {
    if (direct === "1") setDirectOn({ direct: true, text: "Direct On" });
  }, [direct]);

  return (
    <>
      <DragDots position="center" />
      <Paper
        elevation={checkboxes[customId]?.checked ? 20 : 0}
        className={clsx(classes.root, profileOff === "1" ? classes.rootProfileOffBackground : (personalMode.direct && classes.rootBusinessModeBackground))}
        onClick={handleClickPoplItem}
      >
        <div className={classes.mainContent}>
          {profileOff === "1" && <span className={classes.profileOff}>OFF</span>}
          <div className={clsx(classes.section1, "target-element")}>
            <div className={clsx(classes.section1_avatar, "target-element")}>
              <Avatar
                src={
                  imagesExtensions.includes(extension[extension.length - 1])
                    ? `${process.env.REACT_APP_BASE_IMAGE_URL}${image}`
                    : userIcon
                }
                name={name}
                styles={{ width: "100px", height: "60px", borderRadius: "10px" }}
              />
              <Checkbox
                color="primary"
                inputProps={{ "aria-label": "primary checkbox" }}
                onClick={profilesCheck}
                name={customId}
                style={{ padding: "8px" }}
                classes={{ root: "custom-checkbox-root" }}
                checked={checkboxes[customId]?.checked || false}
              />
            </div>
            <div className='full-w'>
              <div className={clsx(classes.section1_title, "target-element")}>
                <Typography className="cursor-default" variant="h5">
                  {name}
                </Typography>
              </div>
              <div className={clsx(classes.section3, "target-element")}>
                <div className={classes.section3_text}>{setBio()}</div>
              </div>
            </div>
          </div>
          <div className={classes.wrapper}>
            <div className={clsx(classes.section4, "target-element")}>
              <SocialPoplsIcons
                handleClick={handleClickPoplItem}
                data={personalMode.direct ? business?.sort((a, b) => b.clicks - a.clicks).slice(0, 8) : social?.sort((a, b) => b.clicks - a.clicks).slice(0, 8)}
                style={classes.linkImage}
              />
            </div>
            <div className={clsx(classes.section6, "target-element")}>
              <Button
                variant="text"
                size="small"
                color="primary"
                startIcon={<ArrowDropDownIcon />}
                onClick={() => url && window.open(`${process.env.REACT_APP_BASE_PROFILE_URL}${url}`)}
              >
                  View Profile
              </Button>
            </div>
          </div>
        </div>

        <div className={clsx(classes.section5, "target-element")}>
          <div className={classes.buttonsContainer}>
            <ProfilePanel
              id={id}
              business={business}
              social={social}
              name={name}
              handleClickPoplItem={handleClickPoplItem}
              handleSwitchChanger={handleSwitchChanger}
              directOn={directOn}
              personalMode={personalMode}
              section2={classes.section2}
            />
          </div>
        </div>
      </Paper>
    </>
  );
}
