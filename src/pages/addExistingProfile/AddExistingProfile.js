import React from "react";
import InviteByEmail from "./components/inviteByEmail";
import useStyles from "./styles/styles";
import Header from "../../components/Header";
// import CustomInput from "../../components/customInput";

function NewProfile() {
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
          <InviteByEmail />
        </div>
        {/* <CustomInput/> */}
      </div>
    </>
  );
}

export default NewProfile;
