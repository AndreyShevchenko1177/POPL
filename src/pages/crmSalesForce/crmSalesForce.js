/* eslint-disable max-len */
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import jwt from "jsonwebtoken";
import Header from "../../components/Header";
import Loader from "../../components/Loader";
import { snackBarAction } from "../../store/actions";
import pem from "./jwtSecret";
import useStyle from "./styles/styles";
import ChoiceCard from "./components/crmSalesForceCard";
import addLinkIcon from "../../assets/add.png";
import SvgMaker from "../../components/svgMaker";

let isMounted = true;

function CrmSalesForce() {
  const classes = useStyle();
  const location = useLocation();
  const dispatch = useDispatch();
  const [isLaunching, setIsLaunching] = useState(false);
  const userId = useSelector(({ authReducer }) => authReducer.signIn.data.id);

  async function initParagon() {
    const jwtToken = jwt.sign(
      {
        sub: userId,
        iat: Math.floor(new Date().getTime() / 1000),
        exp: Math.floor((new Date().getTime() / 1000) + 3600),
      },
      pem,
      {
        algorithm: "RS256",
        keyid: "2324kd",
      },
    );

    await window.paragon.authenticate(
      process.env.REACT_APP_PARAGON_PROJECT_ID,
      jwtToken,
    );
    if (!isMounted) {
      isMounted = true;
    } else {
      let response = window.paragon.getUser();

      console.log(response);

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

  useEffect(() => {
    isMounted = true;
  }, []);

  useEffect(() => () => isMounted = false, []);

  return <div>
    <Header
      firstChild
      path={location.state?.path || "/"}
    />
    {isLaunching && <Loader styles={{ position: "absolute", top: "calc(50% - 20px)", left: "calc(50% - 170px)" }} />}

    <div className={classes.choiceContainer}>
      <div className={classes.choiceWrapper}>
        <div className={classes.choiceCardsWrapper}>
          <div className={classes.choiceCardContainer} onClick={() => { }}>
            <ChoiceCard
              Icon={() => <SvgMaker width={30} height={30} name={"settings"} fill='#000' />}
              title='Configure Salesforce Integration'
            // description='---'
            />
          </div>

          <div className={classes.choiceCardContainer} onClick={() => { }}>
            <ChoiceCard
              Icon={() => <img className={classes.addLink} alt='add-icon' src={addLinkIcon} />}
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
