import React from "react";
import clsx from "clsx";
import { Paper, Typography } from "@material-ui/core";
import SvgMaker from "../../../../components/svgMaker";
import useStyles from "./styles";

function WidgetsContainer({
  children, heading, layerString, isChart, fullWidth,
}) {
  const classes = useStyles();

  return (
    <Paper elevation={1} className={fullWidth ? classes.fullWidgetRoot : classes.widgetRoot}>
      <div className={classes.widgetHeadingContainer}>
        <Typography classes={{ subtitle1: classes.widgetHeading }} variant='subtitle1'>{heading}</Typography>
        <div className={classes.layerStringContainer}>
          <Typography classes={{ subtitle1: classes.widgetLayerString }} variant='subtitle1'>{layerString}</Typography>
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
