import React, { useState } from "react";
import { Paper, Typography } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import clsx from "clsx";
import Avatar from "../../../../components/popl/Avatar";
import useStyles from "./styles/styles";
import SocialPoplsIcons from "../profilelsIcons";
import DragDots from "../../../../components/dragDots";
import userIcon from "../../../../assets/svg/user.svg";
import { imagesExtensions } from "../../../../constants";
import ProfilePanel from "./controlProfilePanel";
import CButton from "../../../../components/CButton";

export default function Card({
  heading,
  businessLinks,
  socialLinks,
  src,
  name,
  bio,
  handleClickPoplItem,
  profileLink,
}) {
  const classes = useStyles();
  const [directOn, setDirectOn] = useState({
    dir1: {
      direct: false,
      text: "Direct Off",
    },
    dir2: {
      direct: false,
      text: "Biz",
    },
  });
  const extension = src.split(".");

  const setBio = () => {
    const result = directOn.dir2.direct ? bio.personal : bio.business;
    return (
      result ||
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
    );
  };

  const handleSwitchChanger = (event, name) => {
    if (name === "dir2") {
      return setDirectOn({
        ...directOn,
        [name]: {
          direct: !directOn[name].direct,
          text: !directOn[name].direct ? "Person" : "Biz",
        },
      });
    }
    return setDirectOn({
      ...directOn,
      [name]: {
        direct: !directOn[name].direct,
        text: !directOn[name].direct ? "Direct On" : "Direct Off",
      },
    });
  };

  return (
    <>
      <DragDots position="center" />
      <Paper
        elevation={3}
        className={classes.root}
        onClick={handleClickPoplItem}
      >
        <div className={clsx(classes.section1, "target-element")}>
          <div className={clsx(classes.section1_avatar, "target-element")}>
            <Avatar
              src={
                imagesExtensions.includes(extension[extension.length - 1])
                  ? src
                  : userIcon
              }
              name={name}
              styles={{ width: "70px", height: "70px", borderRadius: "50%" }}
            />
            <Checkbox
              color="primary"
              inputProps={{ "aria-label": "primary checkbox" }}
              style={{ width: "40px", height: "40px" }}
            />
          </div>
        </div>
        <div className={classes.wrapper}>
          <div className={clsx(classes.section1_title, "target-element")}>
            <Typography className="cursor-default" variant="h5">
              {heading}
            </Typography>
          </div>
          <div className={clsx(classes.section3, "target-element")}>
            <div className={classes.section3_text}>{setBio()}</div>
          </div>
          <div className={clsx(classes.section4, "target-element")}>
            <SocialPoplsIcons
              handleClick={handleClickPoplItem}
              style={classes.iconItem}
              data={directOn.dir2.direct ? socialLinks : businessLinks}
            />
          </div>
          <div className={clsx(classes.section6, "target-element")}>
            <CButton
              variant="text"
              size="small"
              color="primary"
              startIcon={<ArrowDropDownIcon />}
              cb={() => profileLink && window.open(profileLink)}
            >
              View Profile
            </CButton>
          </div>
        </div>
        <div className={clsx(classes.section5, "target-element")}>
          <div className={classes.buttonsContainer}>
            <ProfilePanel
              handleClickPoplItem={handleClickPoplItem}
              handleSwitchChanger={handleSwitchChanger}
              directOn={directOn}
              section2={classes.section2}
            />
          </div>
        </div>
      </Paper>
    </>
  );
}
