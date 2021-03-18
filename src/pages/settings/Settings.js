import React from "react";
import { Paper } from "@material-ui/core";
import Header from "../../components/Header";
import LinkItem from "./components/settingsLink";
import linksConfig from "./settingsLinksConfig";
import useStyles from "./styles";

function SettingsPage() {
  const classes = useStyles();

  return (
    <>
      <Header
        rootLink="Settings"
      />
      <div className={classes.container}>
        <Paper className={classes.linksContainer}>
          {linksConfig.map(({
            id, name, icon, path,
          }) => <LinkItem key={id} name={name} icon={icon} path={path} />)}
        </Paper>
      </div>
    </>
  );
}

export default SettingsPage;
