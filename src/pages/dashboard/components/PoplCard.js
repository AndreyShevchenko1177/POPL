import React from "react";
import { Button } from "@material-ui/core";
import LaunchIcon from "@material-ui/icons/Launch";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import user from "../../../assets/svg/user.svg";
import useStyles from "./styles/style";

export default function PoplCard({ name }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.header}>
          <div className={classes.header_icon}>
            <img className={classes.userIcon} alt="user" src={user} />
          </div>
          <div className={classes.header_body}>
            <span>{name}</span>
          </div>
        </div>
        <div className={classes.footer}>
          <Button
            variant="contained"
            color="primary"
            classes={{ root: classes.button, iconSizeMedium: classes.addIcon }}
            startIcon={<LaunchIcon />}
            // onClick={handleOpen}
          >
            Open
          </Button>
          <Button
            variant="contained"
            color="primary"
            classes={{ root: classes.button, iconSizeMedium: classes.addIcon }}
            startIcon={<EqualizerIcon />}
            // onClick={handleOpen}
          >
            Statistics
          </Button>
        </div>
      </div>
    </div>
  );
}
