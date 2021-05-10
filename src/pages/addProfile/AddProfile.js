import React from "react";
import { useHistory } from "react-router-dom";
import ListIcon from "@material-ui/icons/List";
import useStyle from "./styles/styles";
import ChoiceCard from "./components/AddProfileCard";
import Header from "../../components/Header";
import addLinkIcon from "../../assets/add.png";

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
              What type of profiles do you want to add?
            </span>
          </div>
          <div className={classes.choiceCardsWrapper}>
            <div onClick={() => history.push("/profiles/new-profile")}>
              <ChoiceCard
                Icon={() => <ListIcon fontSize='large'/>}
                title='Existing Profile'
                description='add profiles from existing popl accounts'
              />
            </div>
            <div onClick={() => history.push("/profiles/add-profile/new")}>
              <ChoiceCard
                Icon={() => <img className={classes.addLink} alt='add-icon' src={addLinkIcon}/>}
                title='New Profile'
                description='create new popl profiles to add'
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChoicePage;
