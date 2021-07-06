/* eslint-disable max-len */
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../../components/Header";
import Loader from "../../components/Loader";
import firebase from "../../config/firebase.config";

let isMounted = true;

function CrmSalesForce() {
  const location = useLocation();
  const [isLaunching, setIsLaunching] = useState(false);
  const { isShowParagon } = useSelector(({ systemReducer }) => systemReducer);

  useEffect(() => {
    isMounted = true;

    async function initParagon() {
      // await firebase.auth().signInAnonymously()
      firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
          // console.log(user);
          const token = await user.getIdToken(); // .then((token) => {
          console.log(isShowParagon);
          if (!isMounted) return;
          await window.paragon.authenticate(
            "d04cc8f3-7368-4dc3-8d12-d96e538dd6b3",
            token,
          );

          console.log("isMounted", isShowParagon);
          let response = window.paragon.getUser();

          if (response.integrations.salesforce.enabled) {
            // alert('already auth');
            // document.getElementById("SFloader").style.display = "none";
            // document.getElementById("SFcheck").style.display = "block";
            // document.getElementById("SFtext").style.display = "block";
          } else {
            setIsLaunching(false);
            window.paragon.connect("salesforce");
            // document.getElementById("SFloader").style.display = "none";
            // document.getElementById("SFcheck").style.display = "block";
            // document.getElementById("SFtext").style.display = "block";
          }
          // .then((value) => {
          //   let response = window.paragon.getUser();
          //   console.log("isMounted", isMounted);
          //   if (!isMounted) return;
          //   if (response.integrations.salesforce.enabled) {
          //     // alert('already auth');
          //     // document.getElementById("SFloader").style.display = "none";
          //     // document.getElementById("SFcheck").style.display = "block";
          //     // document.getElementById("SFtext").style.display = "block";
          //   } else {
          //     setIsLaunching(false);
          //     window.paragon.connect("salesforce");
          //     // document.getElementById("SFloader").style.display = "none";
          //     // document.getElementById("SFcheck").style.display = "block";
          //     // document.getElementById("SFtext").style.display = "block";
          //   }
          //   // }, 2000);
          // }).catch((error) => {
          //   console.log(error);
          //   setIsLaunching(false);
          //   // document.getElementById("SFloader").style.display = "none";
          //   // document.getElementById("SFtextLoad").style.display = "block";
          // });
          // });
        } else {
          console.log("user is signed out");
          setIsLaunching(false);
          // User is signed out
          // ...
        }
      });
    }
    if (window.document.readyState === "loading") {
      window.document.addEventListener("DOMContentLoaded", initParagon);
    } else {
      setIsLaunching(true);
      initParagon();
    }
  }, []);

  return <div>
    <Header
      firstChild
      path={location.state.path}
    />
    {isLaunching && <Loader styles={{ position: "absolute", top: "calc(50% - 20px)", left: "calc(50% - 170px)" }} />}
  </div>;
}

export default CrmSalesForce;
