/* eslint-disable max-len */
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import jwt from "jsonwebtoken";
import Header from "../../components/Header";
import Loader from "../../components/Loader";
import firebase from "../../config/firebase.config";
import { snackBarAction } from "../../store/actions";

let isMounted = true;

const pem = `-----BEGIN PRIVATE KEY-----
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
9zxYirvxZdrj3AvQpVgsZDKugEqHKaA=
-----END PRIVATE KEY-----`;

function CrmSalesForce() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [isLaunching, setIsLaunching] = useState(false);
  const userId = useSelector(({ authReducer }) => authReducer.signIn.data.id);

  useEffect(() => {
    isMounted = true;
    async function initParagon() {
      await firebase.auth().signInAnonymously();
      const jwtToken = jwt.sign(
        {
          sub: userId,
          iat: Math.floor(new Date().getTime() / 1000),
          exp: Math.floor((new Date().getTime() / 1000) + 3600),
        },
        pem,
        {
          algorithm: "RS256",
          // expiresIn: "1h",
          keyid: "2324kd",
        },
      );

      await window.paragon.authenticate(
        "d04cc8f3-7368-4dc3-8d12-d96e538dd6b3",
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
        // document.getElementById("SFloader").style.display = "none";
        // document.getElementById("SFcheck").style.display = "block";
        // document.getElementById("SFtext").style.display = "block";
        }
      }
      // firebase.auth().onAuthStateChanged(async (user) => {
      //   if (user) {
      //     // console.log(user);
      //     const token = await user.getIdToken(); // .then((token) => {
      //     console.log(token);
      //     await window.paragon.authenticate(
      //       "d04cc8f3-7368-4dc3-8d12-d96e538dd6b3",
      //       token,
      //     );
      //     let response = window.paragon.getUser();
      //     console.log(response);
      //     if (response.integrations.salesforce.enabled) {
      //       dispatch(snackBarAction({
      //         message: "Salesforce enabled",
      //         severity: "success",
      //         duration: 12000,
      //         open: true,
      //       }));
      //       setIsLaunching(false);
      //       // alert('already auth');
      //     } else {
      //       setIsLaunching(false);
      //       if (!isMounted) {
      //         isMounted = true;
      //       } else {
      //         window.paragon.connect("salesforce", {
      //           onSuccess: () => console.log("success"),
      //         });
      //       }
      //     }
      //   } else {
      //     console.log("user is signed out");
      //     setIsLaunching(false);
      //     // User is signed out
      //     // ...
      //   }
      // });
    }
    if (window.document.readyState === "loading") {
      window.document.addEventListener("DOMContentLoaded", initParagon);
    } else {
      setIsLaunching(true);
      initParagon();
    }
  }, []);

  useEffect(() => () => isMounted = false, []);

  return <div>
    <Header
      firstChild
      path={location.state.path}
    />
    {isLaunching && <Loader styles={{ position: "absolute", top: "calc(50% - 20px)", left: "calc(50% - 170px)" }} />}
  </div>;
}

export default CrmSalesForce;
