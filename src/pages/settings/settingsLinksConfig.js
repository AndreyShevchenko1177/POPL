import React from "react";
import SettingsIcon from "@material-ui/icons/Settings";
import PaymentIcon from "@material-ui/icons/Payment";

const linksConfig = [
  {
    id: 1,
    name: "General Settings",
    icon: <SettingsIcon/>,
    path: "settings/general-settings",
  },
  {
    id: 2,
    name: "Billing",
    icon: <PaymentIcon />,
    path: "settings/billing",
  },
];

export default linksConfig;
