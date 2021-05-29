import React, { useState } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import useStyles from "./styles";
import EmailInvite from "./EmailInvite";
import LoginTab from "../loginTab";

function TabPanel(props) {
  const {
    children, value, index, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <div>{children}</div>
        </Box>
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

function TabNavigation({ setHeaderValue }) {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setHeaderValue(!newValue ? "Send email invites to existing Popl accounts" : "login to existing popl account");
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <div className={classes.tabContainer}>
        <div className={classes.firstElement}></div>
        <Tabs
          className={classes.tabs}
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab
            label="Email invite"
            {...a11yProps(0)}
            className={value === 0 ? classes.activeTab : classes.tab1}
          />
          <Tab
            label="Login"
            {...a11yProps(1)}
            className={value === 1 ? classes.activeTab : classes.tab2}
          />
        </Tabs>
        <div className={classes.secondElement}></div>
      </div>
      <TabPanel value={value} index={0}>
        <EmailInvite />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <LoginTab />
      </TabPanel>
    </div>
  );
}

export default TabNavigation;
