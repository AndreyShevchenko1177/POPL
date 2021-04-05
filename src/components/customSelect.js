import React, { useEffect, useRef } from "react";
import { Checkbox, makeStyles, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "absolute",
    top: 80,
    left: 72,
    minWidth: 150,
    minHeight: 200,
    backgroundColor: "#ffffff",
    borderRadius: theme.custom.mainBorderRadius,
    boxShadow: theme.custom.mainBoxShadow,
    outline: "none",
    zIndex: 10,
    "@media (min-width:1000px)": {
      left: 87,
    },
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    padding: "10px 5px",
    justifyContent: "center",
    alignItems: "center",
  },
  itemsWrapper: {
    width: "85%",
  },
  itemContainer: {
    display: "flex",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    color: theme.palette.specifyText,
    fontFamily: theme.typography.fontFamily,
  },
}));

function CustomSelect({
  config, events, isOpen, checkProfiles,
}) {
  const classes = useStyles();
  const ref = useRef();

  const onBlurHandler = (event) => {
    if (event.currentTarget.contains(event.relatedTarget)) return;
    events.hideSelectHandler({ open: false, component: "select" });
  };

  useEffect(() => {
    ref.current?.focus();
  }, [isOpen]);

  return (
    <>
      {isOpen && <div ref={ref} tabIndex={1} onBlur={onBlurHandler} className={classes.container}>
        <div className={classes.wrapper}>
          <div className={classes.itemsWrapper}>
            {config.map(({
              id, label, type, name, checked,
            }) => {
              if (type === "checkbox") {
                return (
                  <div key={id} className={classes.itemContainer}>
                    <Checkbox
                      color="primary"
                      inputProps={{ "aria-label": "primary checkbox" }}
                      style={{ width: "40px", height: "40px" }}
                      onClick={(e) => events.checkHandler(e, name)}
                      name={name}
                      checked={checked}
                    />
                    <span className={classes.label}>{label}</span>
                  </div>
                );
              } if (type === "button") {
                return (
                  <div key={id} className={classes.itemContainer}>
                    <Button name={name} color="primary" onClick={() => events.btnHandler(name, checkProfiles)}>
                      {label}
                    </Button>
                  </div>
                );
              }
              return (
                <div>
                          data
                </div>
              );
            })}
          </div>
        </div>
      </div>}
    </>
  );
}

export default CustomSelect;
