/* eslint-disable max-len */
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import Loader from "../../components/Loader";
import { snackBarAction } from "../../store/actions";
import { generateJwt, salesForceOnSuccess } from "./helpers";
import useStyle from "./styles/styles";
import ChoiceCard from "../exportToCrm/components/ExportToCrmCard";
import addLinkIcon from "../../assets/add.png";
import SvgMaker from "../../components/svgMaker";
import { saveJwtTokenAction } from "./store/actions";

let isMounted = true;

function CrmSalesForce() {
  const classes = useStyle();
  const location = useLocation();
  const dispatch = useDispatch();
  const [isLaunching, setIsLaunching] = useState(false);
  const { id: userId, name } = useSelector(({ authReducer }) => authReducer.signIn.data);
  const { jwtToken } = useSelector(({ salesForceReducer }) => salesForceReducer);
  const allConnections = useSelector(({ connectionsReducer }) => connectionsReducer.connections.data?.allConnections);

  async function initParagon() {
    setIsLaunching(true);
    let token = jwtToken;
    if (!token) {
      token = generateJwt(userId);
      dispatch(saveJwtTokenAction(token));
    }
    await window.paragon.authenticate(
      process.env.REACT_APP_PARAGON_PROJECT_ID,
      token,
    );

    let response = window.paragon.getUser();

    console.log(response);

    if (!isMounted) {
      isMounted = true;
    } else {
      setIsLaunching(false);
      window.paragon.connect("salesforce", {
        onSuccess: () => console.log("success"),
      });
    }
  }

  async function uploadContacts() {
    // checking does connections exists
    if (!allConnections.length) {
      return dispatch(snackBarAction({
        message: "You haven't any contacts to upload",
        severity: "error",
        duration: 12000,
        open: true,
      }));
    }
    setIsLaunching(true);
    let token = jwtToken;
    if (!token) {
      token = generateJwt(userId);
      dispatch(saveJwtTokenAction(token));
    }
    await window.paragon.authenticate(
      process.env.REACT_APP_PARAGON_PROJECT_ID,
      token,
    );

    let response = window.paragon.getUser();

    console.log(response);

    if (!isMounted) {
      isMounted = true;
    } else {
      // checking does salesforce enabled
      if (!response.integrations.salesforce.enabled) {
        setIsLaunching(false);
        return dispatch(snackBarAction({
          message: "Salesforce not enabled",
          severity: "error",
          duration: 12000,
          open: true,
        }));
      }

      // checking does upload contacts in configuration switch on
      if (Object.values(response.integrations.salesforce.configuredWorkflows).map(({ enabled }) => enabled).includes(false)) {
        setIsLaunching(false);
        return dispatch(snackBarAction({
          message: "Enable contacts upload in salseforce configuration",
          severity: "error",
          duration: 12000,
          open: true,
        }));
      }
      salesForceOnSuccess(token, name, userId, allConnections)
        .then(() => {
          setIsLaunching(false);
          dispatch(snackBarAction({
            message: "Contacts uploading",
            severity: "success",
            duration: 12000,
            open: true,
          }));
        })
        .catch((err) => {
          setIsLaunching(false);
          dispatch(snackBarAction({
            message: "Something went wrong. Try again later",
            severity: "error",
            duration: 12000,
            open: true,
          }));
        });
    }
  }

  useEffect(() => {
    isMounted = true;
  }, []);

  useEffect(() => () => isMounted = false, []);

  return <div>
    <Header
      firstChild
      path={location.state?.path || "/"}
    />
    {isLaunching
      ? <Loader styles={{ position: "absolute", top: "calc(50% - 20px)", left: "calc(50% - 170px)" }} />
      : <div className={classes.choiceContainer}>
        <div className={classes.choiceWrapper}>
          <div className={classes.choiceCardsWrapper}>
            <div className={classes.choiceCardContainer} onClick={() => { }}>
              <ChoiceCard
                Icon={() => <SvgMaker width={35} height={35} name={"settings"} fill='#000' />}
                title='Configure Salesforce Integration'
                onClick={initParagon}
              />
            </div>

            <div className={classes.choiceCardContainer} onClick={() => { }}>
              <ChoiceCard
                Icon={() => <img className={classes.addLink} alt='add-icon' src={addLinkIcon} />}
                title='Upload Contacts to Salesforce'
                onClick={uploadContacts}
              />
            </div>
          </div>
        </div>
      </div>
    }

  </div>;
}

export default CrmSalesForce;
