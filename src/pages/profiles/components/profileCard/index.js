import React, { useState } from "react";
import { Paper, Typography } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import Avatar from "../../../../components/popl/Avatar";
import useStyles from "./styles/styles";
import SocialPoplsIcons from "../profilelsIcons";
import DragDots from "../../../../components/dragDots";
import userIcon from "../../../../assets/svg/user.svg";
import { imagesExtensions } from "../../../../constants";
import ProfilePanel from "./controlProfilePanel";

export default function Card({
  heading,
  businessLinks,
  socialLinks,
  src,
  name,
  bio,
  handleClickPoplItem,
}) {
  const classes = useStyles();
  const [directOn, setDirectOn] = useState({
    direct: false,
    text: "Direct Off",
  });
  const extension = src.split(".");

  const handleSwitchChanger = (event) => {
    setDirectOn({
      direct: !directOn.direct,
      text: !directOn.direct ? "Direct On" : "Direct Off",
    });
  };

  return (
    <>
      <DragDots position="center" />
      <Paper elevation={3} className={classes.root}>
        <div className={classes.section1}>
          <div className={classes.section1_avatar}>
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
          <div className={classes.section1_title}>
            <Typography variant="h5">{heading}</Typography>
          </div>
          <div className={classes.section3}>
            <div className={classes.section3_text}>
              {bio ||
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"}
            </div>
          </div>
          <div className={classes.section4}>
            <div className={classes.section4_sub_wrapper}>
              <SocialPoplsIcons style={classes.iconItem} data={businessLinks} />
            </div>
            <div className={classes.section4_sub_wrapper}>
              <SocialPoplsIcons style={classes.iconItem} data={socialLinks} />
            </div>
          </div>
        </div>
        <div className={classes.section5}>
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
