/* eslint-disable max-len */
import React, { useEffect } from "react";
import firebase from "../../config/firebase.config";

function CrmSalesForce() {
  useEffect(() => {
    function initParagon() {
      window.paragon.authenticate(
        "d04cc8f3-7368-4dc3-8d12-d96e538dd6b3",
        "eyJhbGciOiJSUzI1NiIsImtpZCI6IjhiMjFkNWE1Y2U2OGM1MjNlZTc0MzI5YjQ3ZDg0NGE3YmZjODRjZmYiLCJ0eXAiOiJKV1QifQ.eyJwcm92aWRlcl9pZCI6ImFub255bW91cyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9wb3BsY28iLCJhdWQiOiJwb3BsY28iLCJhdXRoX3RpbWUiOjE2MjUyMzc1OTYsInVzZXJfaWQiOiI2cjBwdURmNVJiV240eHVsckg0dk8wZk15dGoxIiwic3ViIjoiNnIwcHVEZjVSYlduNHh1bHJINHZPMGZNeXRqMSIsImlhdCI6MTYyNTIzNzU5NiwiZXhwIjoxNjI1MjQxMTk2LCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7fSwic2lnbl9pbl9wcm92aWRlciI6ImFub255bW91cyJ9fQ.O4mz8jRIyWnt9vdNCcVDoqRqzZuNgVwsOkRzA026WUW1Wc_mcgrCKGvXPAvW4ARXWl4JyFuPfrqbKbZZXANCmaQ07CvHE9UArAyN0vSdWpcSjrw71gPaMXppHvAuRXs_X9szfb-hh8LPZ0qA7FnxcxukvcDVpZxqDEXAqicad_KhLiAjC4ZtLa1oguNwJA8lwLSdkva1S-DnNxejoLJ8Wndvck0laP5Y1fiG0Z-oGmRW0t3oSsQ62EQm1qj0fEUv4_OiE3UEzdTvL1egiNQk-aCaLNc18SriZpdsJ2rul0pljwhN3PVX-gQQvzg0o72NveDPePMRDMBQm8amchaHGw",
      )
        .then((value) => {
          let response = window.paragon.getUser();
          // setTimeout(() => {
          console.log(response);
          if (response.integrations.salesforce.enabled) {
            // alert('already auth');
            // document.getElementById("SFloader").style.display = "none";
            // document.getElementById("SFcheck").style.display = "block";
            // document.getElementById("SFtext").style.display = "block";
          } else {
            window.paragon.connect("salesforce");
            // document.getElementById("SFloader").style.display = "none";
            // document.getElementById("SFcheck").style.display = "block";
            // document.getElementById("SFtext").style.display = "block";
          }
          // }, 2000);
        }).catch((error) => {
          console.log(error);
          // document.getElementById("SFloader").style.display = "none";
          // document.getElementById("SFtextLoad").style.display = "block";
        });
    }
    if (window.document.readyState === "loading") {
      window.document.addEventListener("DOMContentLoaded", initParagon);
    } else {
      // initParagon();
    }
  }, []);

  return <div>CRM Integrations</div>;
}

export default CrmSalesForce;
