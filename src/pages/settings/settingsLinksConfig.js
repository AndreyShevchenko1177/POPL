import React from "react";
import SettingsIcon from "@material-ui/icons/Settings";
import PaymentIcon from "@material-ui/icons/Payment";
import SvgMaker from "../../components/svgMaker/SvgMaker";

const linksConfig = [
  {
    id: 1,
    name: "General Settings",
    icon: <SettingsIcon/>,
    path: "/settings/general-settings",
  },
  {
    id: 2,
    name: "Subscribe",
    icon: <PaymentIcon />,
    path: "/settings/billing",
  },
  {
    id: 3,
    name: "Logout",
    icon: <SvgMaker name='logout' width={20} height={20} fill='#000000'/>,
  },
];

export default linksConfig;
