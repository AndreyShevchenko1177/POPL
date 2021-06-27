import React from "react";
import { useLocation } from "react-router-dom";
import { Paper } from "@material-ui/core";
import Header from "../../components/Header";
import LinkItem from "./components/TemplatesLink";
import linksConfig from "./TemplatesLinksConfig";
import useStyles from "./styles";

function SettingsPage() {
  const classes = useStyles();
  const location = useLocation();

  return (
    <>
      <Header
        firstChild
        path="/accounts"
      />
      <div className={classes.container}>
        <Paper className={classes.linksContainer}>
          {linksConfig.map(({
            id, ...data
          }) => <LinkItem key={id} {...data} rootPath={location.state.rootPath}/>)}
        </Paper>
      </div>
    </>
  );
}

export default SettingsPage;
