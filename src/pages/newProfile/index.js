import React from "react";
import { useLocation } from "react-router-dom";
import PoplForm from "../profiles/components/addEditPopl";
import useStyles from "./styles/styles";
import Header from "../../components/Header";

function NewProfile() {
  const classes = useStyles();
  const location = useLocation();

  return (
    <>
      <div>
        <Header
          rootLink={location.state.page}
          firstChild={"New profile page"}
          path={location.state.path}
        />
      </div>
      <div className={classes.container}>
        <div className={classes.pageWrapper}>
          <PoplForm />
        </div>
      </div>
    </>
  );
}

export default NewProfile;
