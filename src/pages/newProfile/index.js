import React from "react";
import NewProfileForm from "../profiles/components/addEditProfile";
import useStyles from "./styles/styles";
import Header from "../../components/Header";

function NewProfile() {
  const classes = useStyles();

  return (
    <>
      <div>
        <Header
          rootLink="Profiles"
          firstChild={"New profile page"}
          path="/profiles"
        />
      </div>
      <div className={classes.container}>
        <div className={classes.pageWrapper}>
          <NewProfileForm />
        </div>
      </div>
    </>
  );
}

export default NewProfile;
