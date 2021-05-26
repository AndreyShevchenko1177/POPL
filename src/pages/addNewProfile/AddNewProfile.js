import React from "react";
import useStyle from "./styles/styles";
import Header from "../../components/Header";
import TabsContainer from "./components/TabsContainer";

function AddNewProfile() {
  const classes = useStyle();

  return (
    <>
      <Header
        rootLink="Account"
        firstChild="Add Account"
        firstChildRedirectPath="/profiles/add-profile"
        lastChild="New Account"
        path="/profiles"
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
