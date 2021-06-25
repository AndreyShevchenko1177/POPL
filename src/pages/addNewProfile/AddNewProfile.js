import React from "react";
import { useLocation } from "react-router-dom";
import useStyle from "./styles/styles";
import Header from "../../components/Header";
import TabsContainer from "./components/TabsContainer";

function AddNewProfile() {
  const location = useLocation();
  const classes = useStyle();

  return (
    <>
      <Header
        firstChild
        path={location.state.path}
      />
      <div className={classes.container}>
        <div className={classes.pageWrapper}>
          <TabsContainer />
        </div>
      </div>
    </>
  );
}

export default AddNewProfile;
