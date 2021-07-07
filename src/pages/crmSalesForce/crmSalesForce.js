/* eslint-disable max-len */
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import jwt from "jsonwebtoken";
import Header from "../../components/Header";
import Loader from "../../components/Loader";
import firebase from "../../config/firebase.config";
import { snackBarAction } from "../../store/actions";

let isMounted = true;

const pem = `-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEA5lLG7Lz9aIDU/zPqPSqJtU2PZJjM/sOJ34+uDzKdpOM0lMZh
3h9gQ+KOPfNsLohhVFWiPIa22jzOrbBDvc+15Y+1n+vwLFZTmriu5xJFVyZIgwcF
eXkCBtMss2XmiyjWcaqmtvpVMzrZ1kaqiXgVqp0Tc+tth4qLkKaPETdokTX3sI9T
dPpvEJnAwQyhIp5RXl4JdnRh27x51HrNcaa+6v/tUec+P6DL+LtxMC5sS6AbwO1s
1fWBgieEn69udnNZvFrQZcAr9xFozf5KEvjWd9SbpxJADvRzk5QjtYe6X0PeBj/k
BhWXhFNIUkq8GiyxM5UqaQv6U+t5GQ6soxXuGwIDAQABAoIBAQCZq7UJkvbIWNzE
ARFSCiWjD8KSbdioSjKdNLH/ddf0gZs9gDcgCnMiF/CrqNQPH/NAX3pFQ+SQK24C
OM6ZwBIuvfmCX9r42ggh/QLFLU2SXfqXYYHnkDMn9pGmiGCPjIm3gRKGlvNtoOBi
tPdnjPV3xiGKgBOuEWQY+OgPppZf+wvSPUQLzNKaFeiPudC6G1uguhX0iTPjNnXJ
ObKQPM4vfsU69HviAVL6GRRImGQYY6/0cJvoq0iIei7HhDfyTy27ZYjUygLKwMz5
ahr5R534GWq3IRwZjKd9yc9jpV5vIq7m2DW4ANwCcpsU4N8QdVSmGaUrsoACBbl5
RhUOPKYxAoGBAPhTJ6VbuHiac+OEv/rFu/UV6Cr4hV9Xh4D8eeV16XF4XtLy7AWj
gyERaTHbV94NVjpB9ldB0k0lIW6FcWuW37lM2XineAVAaaVSBfmm6OWNk/PoKpue
l0s1C5CyM7l8c6LAEQO2SCMxbj0lY2KXX1b17vfBUPVBnT6LDgrRck53AoGBAO1x
L/Q1JOLg1wKXHUh9b352QdE+vlr0Rj/EyqiH+Tdovbdb5EoZwtg7zaw0yS36DFW4
tkh4rxmY7Jx93uNfTn6voSrQGTMP8+MiGE03pef+hmEWtrm49/7AfFfHaEWR1lH1
MfnTM2Izr5TzJ2BXZL88l/mxgn03peYo+janWNJ9AoGAZ4OKWETWrfd8bZAt0uRQ
SIb8Q8VbG3ZKNvuH+J3hVPqfVIIM3wDdLZCrcCwGAbs/gYNzo8X9W0kqGX8o23eG
BSFC2ie9QTsrjs2VTg9EsEQHM7pI4JwIZ0JSctvF8gEt1t8HeKuogHsff/+w4S1G
geJ83exIyiOy35ppnRrX8lsCgYAVkzpbQ1T1tJ504sxLYPJ3mEFExSHA2/9iHfyY
MbrIeSD7/0KQJSUaRtzab/Vz0wu54k3V6flnJwkg8yMEoA1e35CSdlRD2og7tEZn
Bc5ydSM6wTibSZ5nLJBf3YOxBp5l1hTTcYhyvOWQcEO8slQ6OERK8QE9ZYgSkNij
jLM6dQKBgAar9U4fTP0CZsi5nosC10qazuCnbB1y9SQ+r8S7JtMOaF/OUHPL19zh
mYF6TCpz+NNpTwxxa5B8ZJ8VOioIgXWX+6gjKQQDm8glGr2e2fIWjHNEUnvsuFGC
yUuo7APNAgMhvlHz4JiIw5kxc3m5Zlq1OvWoHSvJ+3qHbV1jcm36
-----END RSA PRIVATE KEY-----`;

function CrmSalesForce() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [isLaunching, setIsLaunching] = useState(false);

  useEffect(() => {
    isMounted = true;
    async function initParagon() {
      await firebase.auth().signInAnonymously();
      // const jwtToken = jwt.sign(
      //   {
      //     sub: "243104",
      //     iat: Math.floor(new Date().getTime() / 1000),
      //     exp: Math.floor((new Date().getTime() / 1000) + 3600),
      //   },
      //   pem,
      //   {
      //     algorithm: "RS256",
      //     // expiresIn: "1h",
      //     keyid: "2324kd",
      //   },
      // );

      // const verified = jwt.decode(jwtToken);
      // console.log(jwtToken, verified);

      // await window.paragon.authenticate(
      //   "d04cc8f3-7368-4dc3-8d12-d96e538dd6b3",
      //   "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjIzMjRrZCJ9.eyJzdWIiOiIyNDMxMDQiLCJpYXQiOjE2MjU1NjQxMTgsImV4cCI6MTYyNTU2NzcxOH0.HqE8FEUq8lWSG-E13ET3ns8MwZqdnl1Q6GZRcqCv93nCk1-Ci_dKx6LYnkhfc9B-bIL37HAUAQkW-GuvavVAF3Cb1rae44ukyD3OADpv3IqPVwgrzsb4YrFAhBt-LKowk6dKhPA9cYHAInrYACtyoCR7r-s8DzyT4t1_JrBVr6OcpfpnNXyCMsv-JJ2pGmWpmcOt0My3LhTiR9IYcxwEWFbQSGJ3Wf84zpt11zr-P6H1DOvMq_vsxq59GOKOZ6DDziDLDVIuPABuPXxSJ1KVfohQIsajIgs8M0qdK0AaEZe5jv9nOoRZl9QAnOldzm_DQd02B-1h43J1xcyJmZ8WoQ",
      // );
      // if (!isMounted) {
      //   isMounted = true;
      // } else {
      //   let response = window.paragon.getUser();

      //   if (response.integrations.salesforce.enabled) {
      //   // alert('already auth');
      //   // document.getElementById("SFloader").style.display = "none";
      //   // document.getElementById("SFcheck").style.display = "block";
      //   // document.getElementById("SFtext").style.display = "block";
      //   } else {
      //     setIsLaunching(false);
      //     window.paragon.connect("salesforce");
      //   // document.getElementById("SFloader").style.display = "none";
      //   // document.getElementById("SFcheck").style.display = "block";
      //   // document.getElementById("SFtext").style.display = "block";
      //   }
      // }
      firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
          // console.log(user);
          const token = await user.getIdToken(); // .then((token) => {
          console.log(token);
          await window.paragon.authenticate(
            "d04cc8f3-7368-4dc3-8d12-d96e538dd6b3",
            token,
          );
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
            // alert('already auth');
          } else {
            setIsLaunching(false);
            if (!isMounted) {
              isMounted = true;
            } else {
              window.paragon.connect("salesforce", {
                onSuccess: () => console.log("success"),
              });
            }
          }
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
