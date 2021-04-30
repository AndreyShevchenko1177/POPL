import React, { useState } from "react";
import clsx from "clsx";
import { Typography } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ScreenOne from "./ScreenOne";
import ScreenTwo from "./ScreenTwo";
import useStyles from "../styles/styles";

function TabPanel(props) {
  const {
    children, isSreenTwo, value, index, ...other
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
        <div className={clsx(classes.linksContainer, { [classes.linksContainerScreenTwo]: isSreenTwo })}>{children}</div>
      )}
    </div>
  );
}

const header = (value, classes, cl) => {
  if (!value) {
    return (
      <Typography className={classes.linkText} variant="h5">
            Select a link
      </Typography>
    );
  }
  return (
    <div className={classes.rootLinkContainer} onClick={cl}>
      <ArrowBackIosIcon className={classes.arrowIcon} />
      <Typography
        className={classes.rootLink}
        variant="body1"
      >
            Back
      </Typography>

    </div>
  );
};

export default function WizardPanel({
  data, closeWizard, profileData, disabled,
}) {
  const classes = useStyles();
  const [value, setValue] = useState({
    key: 0,
    link: {},
  });

  return (
    <div className={classes.root}>
      <div>
        {header(value.key, classes, () => setValue({ ...value, key: 0 }))}
      </div>
      <TabPanel value={value.key} index={0}>
        <ScreenOne data={data} onClick={(link) => setValue({ ...value, key: 1, link })}/>
      </TabPanel>
      <TabPanel value={value.key} index={1} isSreenTwo>
        <ScreenTwo {...value.link} closeWizard={closeWizard} profileData={profileData} disabled={disabled}/>
      </TabPanel>
    </div>
  );
}
