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
import Avatar from "../../../../components/popl/Avatar";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import useStyles from "./styles/styles";
import SocialPoplsIcons from "../poplsIcons";
import DragDots from "../dragDots";

export default function Card({ heading, types, src, name, mockData, id }) {
  const classes = useStyles();
  const [directOn, setDirectOn] = useState(false);

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
            <Avatar src={src} name={name} styles={{ paddingRight: "20px" }} />
            <Checkbox
              color="primary"
              inputProps={{ "aria-label": "primary checkbox" }}
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
            <div>
              <IconButton aria-label="edit" className={classes.section2_icon}>
                <EditIcon style={{ width: "20px" }} />
              </IconButton>
              <IconButton aria-label="dots" className={classes.section2_icon}>
                <MoreHorizIcon style={{ width: "20px" }} />
              </IconButton>
            </div>
          </div>
          <div className={classes.section3}>
            <div className={classes.section3_text}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut dictum
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut dictum
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut dictum
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut dictum
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut dictum
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut dictum
            </div>
          </div>
          <div className={classes.section4}>
            <SocialPoplsIcons style={classes.iconsItem} mockData={types} />
          </div>
          <div className={classes.section5}>
            <div>
              <span>View more</span>
              <IconButton aria-label="arrow" style={{ padding: "2px" }}>
                <ArrowRightIcon />
              </IconButton>
            </div>
          </div>
        </div>
      </Paper>
    </>
  );
}
