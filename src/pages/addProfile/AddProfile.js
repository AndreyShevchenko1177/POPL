import React from "react";
import { useHistory } from "react-router-dom";
import ListIcon from "@material-ui/icons/List";
import FlashOnIcon from "@material-ui/icons/FlashOn";
import useStyle from "./styles/styles";
import ChoiceCard from "./components/AddProfileCard";
import Header from "../../components/Header";

function ChoicePage() {
  const classes = useStyle();
  const history = useHistory();

  return (
    <>
      <Header
        rootLink="Profiles"
        path='/profiles'
        lastChild="Add Profile"
      />
      <div className={classes.choiceContainer}>
        <div className={classes.choiceWrapper}>
          <div className={classes.choiceHeader}>
            <span>
            Do you want to create new Profile?
            </span>
          </div>
          <div className={classes.choiceCardsWrapper}>
            <div onClick={() => history.push("/profiles/new-profile")}>
              <ChoiceCard
                Icon={() => <ListIcon fontSize='large'/>}
                title='Existing Profile'
                description='Add Profile from existing email'
              />
            </div>
            <div onClick={() => history.push("/profiles/add-profile/new")}>
              <ChoiceCard
                Icon={() => <FlashOnIcon fontSize='large'/>}
                title='New Profile'
                description='Add new Profile'
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChoicePage;
