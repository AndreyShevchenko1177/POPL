import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import { Checkbox, makeStyles, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  actioncontainer: {
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
  sortcontainer: {
    position: "absolute",
    top: 55,
    left: 30,
    minWidth: 150,
    minHeight: 175,
    backgroundColor: "#ffffff",
    borderRadius: theme.custom.mainBorderRadius,
    boxShadow: theme.custom.mainBoxShadow,
    outline: "none",
    zIndex: 10,
    "@media (min-width:1000px)": {
      left: 30,
    },
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    padding: "10px 5px",
    justifyContent: "center",
    alignItems: "center",
  },
  actionitemsWrapper: {
    width: "85%",
  },
  sortitemsWrapper: {
    width: "100%",
  },
  itemContainer: {
    display: "flex",
    alignItems: "center",
    borderRadius: theme.custom.mainBorderRadius,
  },
  activeItemContainer: {
    backgroundColor: "#a6a6a6",
  },
  label: {
    fontSize: 16,
    color: theme.palette.specifyText,
    fontFamily: theme.typography.fontFamily,
  },
}));

function CustomSelect({
  config, events, isOpen, checkProfiles, selectName,
}) {
  const classes = useStyles();
  const ref = useRef();

  const onBlurHandler = (event) => {
    if (event.currentTarget.contains(event.relatedTarget)) return;
    if (event.relatedTarget?.name === selectName) {
      return;
    }
    events.hideSelectHandler((h) => ({ ...h, [selectName]: { open: false } }));
  };

  useEffect(() => {
    ref.current?.focus();
  }, [isOpen]);

  return (
    <>
      {isOpen && <div ref={ref} tabIndex={1} onBlur={onBlurHandler} className={classes[`${selectName}container`]}>
        <div className={classes.wrapper}>
          <div className={classes[`${selectName}itemsWrapper`]} >
            {config.map(({
              id, label, type, name, checked, active,
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
                  <div key={id} className={clsx(classes.itemContainer, { [classes.activeItemContainer]: active })}>
                    <Button name={name} color="primary" onClick={() => events.btnHandler(name, checkProfiles, selectName)}>
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
