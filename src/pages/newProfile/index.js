import React from "react";
import NewProfileForm from "./components/NewProfileForm";
import useStyles from "./styles/styles";
import Header from "../../components/Header";
// import CustomInput from "../../components/customInput";

function NewProfile() {
  const classes = useStyles();

  return (
    <>
      <div>
        <Header rootLink="Profiles" firstChild="Add Profile" path="/profiles" />
      </div>
      <div className={classes.container}>
        <div className={classes.pageWrapper}>
          <NewProfileForm />
        </div>
        {/* <CustomInput/> */}
      </div>
    </>
  );
}

export default NewProfile;
