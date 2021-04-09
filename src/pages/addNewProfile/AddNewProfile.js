import React from "react";
import useStyle from "./styles/styles";
import Header from "../../components/Header";

function ChoicePage() {
  const classes = useStyle();

  return (
    <>
      <Header
        rootLink="Profiles"
        firstChild="Add Profile"
        firstChildRedirectPath="/profiles/add-profile"
        lastChild="New Profile"
        path="/profiles"
      />
      <div className={classes.choiceContainer}>
        Comming soon
      </div>
    </>
  );
}

export default ChoicePage;
