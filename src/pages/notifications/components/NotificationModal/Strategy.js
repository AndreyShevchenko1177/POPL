import React from "react";
import { Typography } from "@material-ui/core";

function Strategy({
  icon, title, description, activeTab, onClick,
}) {
  return (
    <div style={{ border: activeTab ? "2px solid #57abe6" : "2px solid #c7c7c7" }} onClick={onClick}>
      <div>
        {icon}
      </div>
      <div>
        <Typography variant='h5'>{title}</Typography>
      </div>
      <div>
        <Typography style={{ color: "grey" }} variant='subtitle1'>{description}</Typography>
      </div>
    </div>
  );
}

export default Strategy;
