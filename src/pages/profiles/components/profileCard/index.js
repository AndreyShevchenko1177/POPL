import React, { useState } from "react";
import {
  Paper,
  Typography,
  FormControlLabel,
  IconButton,
  FormGroup,
} from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import EditIcon from "@material-ui/icons/Edit";
import Switch from "@material-ui/core/Switch";
import Checkbox from "@material-ui/core/Checkbox";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import Avatar from "../../../../components/popl/Avatar";
import useStyles from "./styles/styles";
import SocialPoplsIcons from "../poplsIcons";
import DragDots from "../dragDots";
import userIcon from "../../../../assets/svg/user.svg";
import { imagesExtensions } from "../../../../constants";
import ProfilePanel from "./controlProfilePanel";

export default function Card({
  heading,
  types,
  src,
  name,
  bio,
  handleClickPoplItem,
}) {
  const classes = useStyles();
  const [directOn, setDirectOn] = useState(false);
  const extension = src.split(".");

  const handleSwitchChanger = (event) => {
    setDirectOn(!directOn);
  };

  return (
    <>
      <DragDots position="left" />
      <DragDots position="center" />
      <DragDots position="right" />
      <Paper elevation={1} className={classes.root}>
        <div className={classes.section1}>
          <div className={classes.section1_title}>
            <Typography variant="h5">{heading}</Typography>
          </div>
          <div className={classes.section1_avatar}>
            <Avatar
              src={
                imagesExtensions.includes(extension[extension.length - 1])
                  ? src
                  : userIcon
              }
              name={name}
              styles={{ paddingRight: "20px", width: "90px", height: "70px" }}
            />
            <Checkbox
              color="primary"
              inputProps={{ "aria-label": "primary checkbox" }}
              style={{ width: "40px", height: "40px" }}
            />
          </div>
        </div>
        <div className={classes.wrapper}>
          <div className={classes.section2}>
            <div>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      size="medium"
                      color="primary"
                      checked={directOn}
                      onChange={handleSwitchChanger}
                    />
                  }
                  label="Direct Off"
                  labelPlacement="start"
                  style={{ marginLeft: "0px", fontWeight: "500" }}
                />
              </FormGroup>
            </div>
          </div>
          <div className={classes.section3}>
            <div className={classes.section3_text}>{bio}</div>
          </div>
          <div className={classes.section4}>
            <SocialPoplsIcons style={classes.iconItem} mockData={types} />
          </div>
        </div>
        <div className={classes.section5}>
          <div className={classes.buttonsContainer}>
            <ProfilePanel handleClickPoplItem={handleClickPoplItem} />
          </div>
        </div>
      </Paper>
    </>
  );
}
