import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import { Tabs, Tab, Typography } from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import EditScreen from "./components/EditScreen";
import useStyles from "./styles/styles";

function TabPanel(props) {
  const {
    children, value, index, ...other
  } = props;
  const classes = useStyles();

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div className={clsx(classes.linksContainer, { [classes.linksContainerScreenTwo]: value })}>{children}</div>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function header(value, classes, cl) {
  return (
    <Typography className={classes.linkText} variant="h5">
                Edit the link
    </Typography>
  );
}

function EditLinkModal({ isOpen, setEditLinkModal, data }) {
  const classes = useStyles();
  const [value, setValue] = useState({
    key: 0,
    link: {},
  });
  const ref = useRef();

  const handleChange = (event, newValue) => setValue({ ...value, key: newValue });

  const blurHandler = (event) => {
    if (event.currentTarget.contains(event.relatedTarget)) return;
    setEditLinkModal((v) => ({ ...v, open: false }));
  };

  useEffect(() => {
    ref.current?.focus();
  }, [isOpen]);

  return (
    <>
      <div className={classes.opacityBackground}></div>
      <div className={classes.wizardContainer} ref={ref} onBlur={blurHandler} tabIndex={1}>
        <HighlightOffIcon onClick={() => setEditLinkModal((v) => ({ ...v, open: false }))} className={classes.closeIcon} />
        <div>
          <div className={classes.root}>
            <div>
              {header(value.key, classes, () => setValue({ ...value, key: 0 }))}
            </div>
            <div className={classes.tabContainer}>
              <div className={classes.firstElement}></div>
              <Tabs
                className={classes.tabs}
                variant="fullWidth"
                value={value.key}
                onChange={handleChange}
                aria-label="simple tabs example"
              >
                <Tab
                  label="Edit link"
                  {...a11yProps(0)}
                  className={value.key === 0 ? classes.activeTab : classes.tab1}
                />
                <Tab
                  label="Delete link"
                  {...a11yProps(1)}
                  className={value.key === 1 ? classes.activeTab : classes.tab2}
                />
              </Tabs>
              <div className={classes.secondElement}></div>
            </div>
            <TabPanel value={value.key} index={0}>
              <EditScreen
                {...data}
                profileBtnTitle={`Edit ${data.name} link`}
                allProfilesBtnTitle='Edit all profiles links'
              />
            </TabPanel>
            <TabPanel value={value.key} index={1}>
              <EditScreen
                {...data}
                profileBtnTitle={`delete ${data.name} link`}
                allProfilesBtnTitle='delete all profiles links'
                isDeleteTab={value.key}
              />
            </TabPanel>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditLinkModal;
