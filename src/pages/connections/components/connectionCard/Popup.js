import React, { useEffect, useRef } from "react";
import { Paper } from "@material-ui/core";
import useStyles from "./styles/styles";

function Popup({ config, isOpen, handleClose }) {
  const ref = useRef();
  const classes = useStyles();

  const onBlurHandler = (event) => {
    if (event.currentTarget.contains(event.relatedTarget)) return;
    handleClose();
  };

  useEffect(() => {
    ref.current?.focus();
  }, [isOpen]);

  return (
    <>
      {isOpen && <Paper ref={ref} tabIndex={1} className={classes.popupWrapper} onBlur={onBlurHandler}>
        {config.map((element) => (
          <div key={element.id} onClick={element.onClick}>{element.name}</div>
        ))}
      </Paper>}
    </>
  );
}

export default Popup;
