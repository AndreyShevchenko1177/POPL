import React from "react";
import clsx from "clsx";
import { Paper, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import SvgMaker from "../../../../components/svgMaker";
import useStyles from "./styles";
import WidgetImages from "../widgetImage";

function WidgetsContainer({
  children, heading, layerString, isChart, fullWidth, profilesData,
}) {
  const classes = useStyles();
  const checkboxes = useSelector(({ realTimeAnalytics }) => realTimeAnalytics.checkBoxData);
  const selectedProfiles = Object.keys(checkboxes.profiles).filter((el) => checkboxes.profiles[el]).map((el) => Number(el));

  return (
    <Paper elevation={1} className={fullWidth ? classes.fullWidgetRoot : classes.widgetRoot}>
      <div className={classes.widgetHeadingContainer}>
        <Typography classes={{ subtitle1: classes.widgetHeading }} variant='subtitle1'>{heading}</Typography>
        <div style={{ display: "flex", overflow: "auto", paddingTop: 10 }}>
          <WidgetImages data={profilesData?.filter((el) => selectedProfiles.includes(Number(el.id)))}/>
        </div>
        <div className={classes.infoIcon}>
          <SvgMaker
            name='info'
            width={15}
            height={15}
            fill="#73C6F2"
          />
        </div>
      </div>
      <div className={clsx(classes.widgetChildContainer, { [classes.chart]: isChart })}>
        {children}
      </div>
    </Paper>
  );
}

export default WidgetsContainer;
