import React from "react";
import { Switch, makeStyles } from "@material-ui/core";

const useStyles = (trackLabel) => makeStyles((theme) => ({
  root: {
    width: 80,
    height: 48,
    padding: 8,
  },
  switchBase: {
    padding: 11,
    color: "#646464",
  },
  thumb: {
    width: 22,
    height: 22,
    margin: 2,
    backgroundColor: "#fff",
  },
  track: {
    background: "#646464",
    opacity: "1 !important",
    borderRadius: 20,
    position: "relative",
    "&:before, &:after": {
      display: "inline-block",
      position: "absolute",
      top: "50%",
      width: "50%",
      transform: "translateY(-50%)",
      color: "#fff",
      textAlign: "center",
    },
    "&:before": {
      content: trackLabel ? "\"On\"" : "",
      color: "#646464",
      left: 4,
      opacity: 0,
    },
    "&:after": {
      content: trackLabel ? "\"Off\"" : "",
      right: 4,
    },
  },
  checked: {
    "&$switchBase": {
      color: "#ffffff",
      transform: "translateX(32px)",
      "&:hover": {
        backgroundColor: "#ffffff33",
      },
    },
    "& $thumb": {
      backgroundColor: "#646464",
    },
    "& + $track": {
      backgroundColor: "#ffffff !important",
      "&:before": {
        opacity: 1,
      },
      "&:after": {
        opacity: 0,
      },
    },
  },
}));

const CustomSwitch = ({ onClick, checked, trackLabel }) => {
  const switchStyles = useStyles(trackLabel)();
  return (
    <div>
      <Switch
        classes={switchStyles}
        checked={checked}
        onClick={onClick}
      />
    </div>
  );
};

export default CustomSwitch;
