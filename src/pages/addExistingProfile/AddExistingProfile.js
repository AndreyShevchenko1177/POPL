import React from "react";
import TabsContainer from "./components/TabContainer";
import useStyles from "./styles/styles";
import Header from "../../components/Header";
// import CustomInput from "../../components/customInput";

function AddExistingProfile() {
  const classes = useStyles();

  return (
    <>
      <div>
        <Header
          rootLink="Profiles"
          firstChild="Add Profile"
          firstChildRedirectPath="/profiles/add-profile"
          lastChild="Existing Profile"
          path="/profiles"
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
