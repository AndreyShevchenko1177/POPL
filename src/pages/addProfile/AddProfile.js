import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import ListIcon from "@material-ui/icons/List";
import useStyle from "./styles/styles";
import ChoiceCard from "./components/AddProfileCard";
import Header from "../../components/Header";
import addLinkIcon from "../../assets/add.png";

function ChoicePage() {
  const classes = useStyle();
  const history = useHistory();
  const location = useLocation();
  return (
    <>
      <Header
        firstChild
        path={location.pathname === location.state.path ? location.state.rootPath : location.state.path}
      />
      <div className={classes.choiceContainer}>
        <div className={classes.choiceWrapper}>
          <div className={classes.choiceHeader}>
            <span>
            Select method for adding accounts
            </span>
          </div>
          <div className={classes.choiceCardsWrapper}>
            <div onClick={() => history.push("/accounts/new-account", { path: "/accounts/add-account", rootPath: location.state.rootPath })}>
              <ChoiceCard
                Icon={() => <ListIcon fontSize='large'/>}
                title='Existing Account'
                description='Add existing Popl accounts'
              />
            </div>
            <div onClick={() => history.push("/accounts/add-account/new", { path: "/accounts/add-account", rootPath: location.state.rootPath })}>
              <ChoiceCard
                Icon={() => <img className={classes.addLink} alt='add-icon' src={addLinkIcon}/>}
                title='New Account'
                description='Create new Popl accounts'
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChoicePage;
