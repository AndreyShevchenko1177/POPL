import React from "react";
import SettingsIcon from "@material-ui/icons/Settings";
import PaymentIcon from "@material-ui/icons/Payment";
import SvgMaker from "../../components/svgMaker/SvgMaker";

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
  {
    id: 3,
    name: "Logout",
    // icon: <PaymentIcon />,
    // icon: <SvgMaker name='logout' width={30} height={30} fill='#000000'/>,
    path: "settings/billing",
  },
];

export default linksConfig;
