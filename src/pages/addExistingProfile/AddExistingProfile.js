import React from "react";
import { useLocation } from "react-router-dom";
import TabsContainer from "./components/TabContainer";
import useStyles from "./styles/styles";
import Header from "../../components/Header";

function AddExistingProfile() {
  const location = useLocation();
  const classes = useStyles();

  return (
    <>
      <div>
        <Header
          firstChild
          path={location.state.path}
        />
      </div>
      <div className={classes.container}>
        <div className={classes.pageWrapper}>
          <TabsContainer />
        </div>
      </div>
    </>
  );
}

export default AddExistingProfile;
