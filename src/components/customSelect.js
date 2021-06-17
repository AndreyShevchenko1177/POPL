import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import {
  Checkbox, makeStyles, Button,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import AutoComplete from "./autoComplete";
import { restrictEdit } from "../utils";
import { snackBarAction } from "../store/actions";

const useStyles = makeStyles((theme) => ({
  actionContainer: {
    position: "absolute",
    top: 56,
    left: 64,
    minWidth: 150,
    minHeight: 200,
    backgroundColor: "#ffffff",
    borderRadius: theme.custom.mainBorderRadius,
    boxShadow: theme.custom.mainBoxShadow,
    outline: "none",
    zIndex: 101,
  },
  sortContainer: {
    position: "absolute",
    top: 55,
    minWidth: 120,
    minHeight: 60,
    backgroundColor: "#ffffff",
    borderRadius: theme.custom.mainBorderRadius,
    boxShadow: theme.custom.mainBoxShadow,
    outline: "none",
    zIndex: 10,
  },
  filterContainer: {
    position: "absolute",
    top: 55,
    minWidth: 120,
    width: 350,
    minHeight: 60,
    backgroundColor: "#ffffff",
    borderRadius: theme.custom.mainBorderRadius,
    boxShadow: theme.custom.mainBoxShadow,
    outline: "none",
    zIndex: 10,
  },
  countContainer: {
    position: "absolute",
    top: 55,
    minWidth: 120,
    width: 350,
    minHeight: 60,
    backgroundColor: "#ffffff",
    borderRadius: theme.custom.mainBorderRadius,
    boxShadow: theme.custom.mainBoxShadow,
    outline: "none",
    zIndex: 10,
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    padding: "10px 5px",
    justifyContent: "center",
    alignItems: "center",
    "& > div": {
      width: "100%",
    },
  },
  actionItemsWrapper: {
    width: "85%",
  },
  sortItemsWrapper: {
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
  actionBtn: {
    padding: "6px 8px",
  },
  sortBtn: {
    padding: "6px 16px",
    whiteSpace: "nowrap",
    // width: "100%",
  },
  clearInputIcon: {
    position: "absolute",
    right: 5,
    top: 8,
  },
  outlinedInput: {
    height: 40,
  },
}));

function CustomSelect({
  config, events, isOpen, checkProfiles, selectName, autoComleteData, data, customState, filterValue,
}) {
  const classes = useStyles();
  const ref = useRef();
  const userData = useSelector(({ authReducer }) => authReducer.signIn.data);
  const dispatch = useDispatch();

  const onBlurHandler = (event) => {
    // if (event.currentTarget.contains(event.relatedTarget)) return;
    // if (event.relatedTarget?.name === selectName) return;
    // events.hideSelectHandler((h) => ({ ...h, [selectName]: { open: false, component: "select" } }));
  };

  useEffect(() => {
    ref.current?.focus();
  }, [isOpen]);

  return (
    <>
      {isOpen && <div ref={ref} tabIndex={1} onBlur={onBlurHandler} className={classes[`${selectName}Container`]}>
        <div className={classes.wrapper}>
          <div className={classes[`${selectName}ItemsWrapper`]} >
            {config.map(({
              id, label, type, name, checked, active, pseudoname,
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
                    <Button className={classes[`${selectName}Btn`]} name={name} color="primary" onClick={() => {
                      // temporary for restricted edit mode
                      if (id !== 7 && restrictEdit(userData.id)) {
                        return dispatch(snackBarAction({
                          message: "Can not edit demo account",
                          severity: "error",
                          duration: 6000,
                          open: true,
                        }));
                      }
                      events.btnHandler(name, checkProfiles, selectName);
                    }}>
                      {label}
                    </Button>
                  </div>
                );
              } if (type === "input") {
                return (
                  <div className='relative' key={id}>
                    <AutoComplete
                      data={autoComleteData}
                      currentPageData={data}
                      label={label}
                      pseudoname={pseudoname}
                      startFilter={events.handleChange}
                      customOnchange={events.countChange}
                      customState={customState}
                      hideAutoComplete={() => events.hideSelectHandler((h) => ({ ...h, [selectName]: { open: false, component: "select" } }))}
                      filterValue={filterValue}
                    />
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
