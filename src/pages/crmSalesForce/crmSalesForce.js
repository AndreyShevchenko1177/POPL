/* eslint-disable max-len */
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import Loader from "../../components/Loader";
import { snackBarAction } from "../../store/actions";
import useStyle from "./styles/styles";
import ChoiceCard from "../exportToCrm/components/ExportToCrmCard";
import addLinkIcon from "../../assets/add.png";
import SvgMaker from "../../components/svgMaker";
import { jwtSign } from "./helpers/jwtSign";
import { newParagonJwtAction } from "./store/actions";
import uploadConnections from "./helpers/uploadConnections";

let isMounted = true;

function CrmSalesForce() {
  const classes = useStyle();
  const location = useLocation();
  const dispatch = useDispatch();
  const [isLaunching, setIsLaunching] = useState(false);
  const paragonJwt = useSelector(({ paragonReducer }) => paragonReducer);
  const userId = useSelector(({ authReducer }) => authReducer.signIn.data.id);
  const userName = useSelector(({ authReducer }) => authReducer.signIn.data.name);

  const checkParagonJwt = function (jwt) {
    if (jwt === "") {
      jwt = jwtSign(userId);
      dispatch(newParagonJwtAction(jwt));
    }
    return jwt;
  };

  async function initParagon() {
    let jwtToken = checkParagonJwt(paragonJwt);

    await window.paragon.authenticate(
      process.env.REACT_APP_PARAGON_PROJECT_ID,
      jwtToken,
    );

    if (!isMounted) {
      isMounted = true;
    } else {
      let response = window.paragon.getUser();

      console.log("response", response);

      if (response.integrations.salesforce.enabled) {
        dispatch(snackBarAction({
          message: "Salesforce enabled",
          severity: "success",
          duration: 12000,
          open: true,
        }));
        setIsLaunching(false);
      } else {
        setIsLaunching(false);
        window.paragon.connect("salesforce", {
          onSuccess: () => console.log("success"),
        });
      }
    }
  }

  async function uploadToParagon() {
    let jwtToken = checkParagonJwt(paragonJwt);

    await window.paragon.authenticate(
      process.env.REACT_APP_PARAGON_PROJECT_ID,
      jwtToken,
    );

    if (!isMounted) {
      isMounted = true;
    } else {
      let response = window.paragon.getUser();

      console.log("response", response);

      if (response?.integrations?.salesforce?.enabled) {
        if (response?.integrations?.salesforce?.configuredWorkflows
          && Object.values(response.integrations.salesforce.configuredWorkflows)[0].enabled) {
          console.log("call uploadConnections([])");
          //
          //
          //
          // Should we pass "userName" or "nameBusiness" ???
          //
          //
          //
          uploadConnections(jwtToken, userName, userId, []);
        } else {
          dispatch(snackBarAction({
            message: "Smth wrong...",
            severity: "error",
            duration: 5000,
            open: true,
          }));
        }
      } else {
        setIsLaunching(false);
        window.paragon.connect("salesforce", {
          onSuccess: () => console.log("success"),
        });
      }
    }
  }

  useEffect(() => {
    isMounted = true;
  }, []);

  useEffect(() => () => isMounted = false, []);

  return <div>
    <Header
      firstChild
      path={ location.state?.path || "/" }
    />
    { isLaunching && <Loader styles={ { position: "absolute", top: "calc(50% - 20px)", left: "calc(50% - 170px)" } } /> }

    <div className={ classes.choiceContainer }>
      <div className={ classes.choiceWrapper }>
        <div className={ classes.choiceCardsWrapper }>
          <div className={ classes.choiceCardContainer } onClick={ initParagon }>
            <ChoiceCard
              Icon={ () => <SvgMaker width={ 35 } height={ 35 } name={ "settings" } fill='#000' /> }
              title='Configure Salesforce Integration'
            // description='---'
            />
          </div>

          <div className={ classes.choiceCardContainer } onClick={ uploadToParagon }>
            <ChoiceCard
              Icon={ () => <img className={ classes.addLink } alt='add-icon' src={ addLinkIcon } /> }
              title='Upload Contacts to Salesforce'
            // description='---'
            />
          </div>
        </div>
      </div>
    </div>

  </div>;
}

export default CrmSalesForce;
