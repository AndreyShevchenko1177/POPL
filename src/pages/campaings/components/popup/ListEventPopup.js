import React from "react";
import Popover from "@material-ui/core/Popover";
import useStyles from "./styles";

export default function ListEventPopup({ children, onModalHandler, event }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <div onClick={handleClick}>
        {children}
      </div>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <div className={classes.wrapperEventListPopup}>
          <div onClick={() => {
            handleClose();
            onModalHandler(event, true);
          }}>
            {"Edit"}
          </div>

          <div onClick={() => {
            event?.event?.deleteThisEvent();
            handleClose();
          }}>
            {"Delete"}
          </div>

        </div>

      </Popover>
    </div >
  );
}
