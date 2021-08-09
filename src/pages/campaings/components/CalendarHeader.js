import React from "react";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import {
  Button, IconButton, Typography, Box,
} from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import useStyles from "../styles/styles";

function CalendarHeader({
  dateLabel, dateLabelToolTip, onChangeDateHandler, onTodayHandler,
}) {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.headerContainer}>
        <div className={classes.todayButtonContainer}>
          <Tooltip title={dateLabelToolTip}>
            <Button variant='outlined' onClick={onTodayHandler}>Today</Button>
          </Tooltip>
        </div>
        <div className={classes.todayButtonContainer}>
          <Tooltip title='Previous month'>
            <IconButton classes={{ root: classes.headerButtonRoot }} data-direction='left' aria-label="left" onClick={onChangeDateHandler}>
              <NavigateBeforeIcon data-direction='left'/>
            </IconButton>
          </Tooltip>
          <Tooltip title='Next month'>
            <IconButton classes={{ root: classes.headerButtonRoot }} data-direction='right' aria-label="right" onClick={onChangeDateHandler}>
              <NavigateNextIcon data-direction='right'/>
            </IconButton>
          </Tooltip>
        </div>
        <div>
          <Typography>
            {dateLabel}
          </Typography>
        </div>
        <div className={ classes.headerTitleContainer }>
          <Box fontSize={ 20 } fontWeight="fontWeightBold">
              Select a date to create campaign
          </Box>
        </div>
      </div>
    </div>
  );
}

export default CalendarHeader;
