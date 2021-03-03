import React from "react";
import Header from "../../components/Header";

function GeneralSettings() {
  return (
    <>
      <Header
        rootLink="Settings"
        firstChild="Billing"
        path="/settings"
      />
    </>
  );
}

export default GeneralSettings;
