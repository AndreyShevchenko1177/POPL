import React from "react";
import { Switch, makeStyles } from "@material-ui/core";

const useStyles = (after, before, input) => makeStyles((theme) => ({
  root: {
    width: "100%",
    height: 28,
    padding: 0,
  },
  switchBase: {
    padding: "3px 0 0 5px",
    color: "#646464",
  },
  thumb: {
    width: 20,
    height: 20,
    margin: 2,
    backgroundColor: "#fff",
  },
  track: {
    background: "#646464",
    opacity: "1 !important",
    borderRadius: theme.custom.mainBorderRadius,
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
      content: `\"${before}\"`,
      color: "#646464",
      fontWeight: "600",
      fontSize: 13,
      left: 4,
      opacity: 0,
    },
    "&:after": {
      content: `\"${after}\"`,
      fontWeight: "600",
      fontSize: 13,
      right: 4,
    },
  },
  checked: {
    "&$switchBase": {
      color: "#ffffff",
      transform: "translateX(105px)",
      paddingTop: 2,
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
  input: {
    ...input,
  },
}));

const inputStyles = [
  {
    width: "400%",
    left: "-300%",
  },
  {
    width: "400%",
    left: "10%",
  },
];

const CustomSwitch = ({
  onClick, checked, after, before,
}) => {
  const switchStyles = useStyles(after, before, inputStyles[Number(!checked)])();

  return (
    <div className='full-w'>
      <Switch
        classes={switchStyles}
        checked={checked}
        onClick={onClick}
      />
    </div>
  );
};

export default CustomSwitch;
