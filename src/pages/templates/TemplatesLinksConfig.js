import React from "react";
import SettingsIcon from "@material-ui/icons/Settings";
import PaymentIcon from "@material-ui/icons/Payment";
import SvgMaker from "../../components/svgMaker/SvgMaker";

const templatesConfig = [
  {
    id: 1,
    name: "Add Template",
    icon: <SettingsIcon/>,
    path: "/templates/add-template",
  },
  {
    id: 2,
    name: "My Templates",
    icon: <PaymentIcon />,
    path: "/templates/my-templates",
  },
];

export default templatesConfig;
