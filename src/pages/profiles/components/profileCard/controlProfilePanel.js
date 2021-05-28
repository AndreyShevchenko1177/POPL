import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Grid, FormGroup, Button,
} from "@material-ui/core";
import clsx from "clsx";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import connectIcon from "../../../../assets/svg/connect.svg";
import useStyles from "./styles/styles";
import CustomSwitch from "../../../../components/customSwitcher";
import { isSafari } from "../../../../constants";
import poplIcon from "../../../../assets/sidebar/poplIcon_black.png";

function ProfilePanel({
  id,
  social,
  url,
  business,
  handleClickPoplItem,
  handleSwitchChanger,
  directOn,
  personalMode,
  section2,
  name,
  connectionNumber,
  poplsNumber,
}) {
  const classes = useStyles();
  const history = useHistory();
  const isFetching = useSelector(({ profilesReducer }) => profilesReducer.setProfilesSettings.isFetching);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <div className={clsx(section2, "target-element")}>
          <div className="full-w">
            <FormGroup onClick={handleClickPoplItem}>
              <div className={classes.switcherContainer}>
                {<CustomSwitch
                  checked={personalMode.direct}
                  onClick={(event) => !isFetching && handleSwitchChanger(event, "dir2")}
                  after='Personal'
                  before='Business'
                  disabled={isFetching}
                />}
              </div>
              <div className={classes.switcherContainer}>
                <CustomSwitch
                  checked={directOn.direct}
                  onClick={(event) => !isFetching && handleSwitchChanger(event, "dir1")}
                  after='Direct Off'
                  before='Direct On'
                  disabled={isFetching}
                />
              </div>
            </FormGroup>
          </div>
        </div>
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="outlined"
          fullWidth
          size="small"
          color="primary"
          className={clsx(classes.button, isSafari ? classes.buttonAbsolute : classes.buttonRelative)}
          classes={{ endIcon: isSafari ? classes.buttonStaisticsSafari : classes.buttonStaistics }}
          endIcon={<div>{connectionNumber || 0}</div>}
          startIcon={
            <img
              className={classes.connectIcon}
              alt="connections"
              src={connectIcon}
            />
          }
          onClick={() => history.push("/connections", {
            disabled: false, id, name, url,
          })}
        >
          Connections
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="outlined"
          fullWidth
          size="small"
          color="primary"
          className={clsx(classes.button, isSafari ? classes.buttonAbsolute : classes.buttonRelative)}
          endIcon={<div>{poplsNumber || 0}</div>}
          classes={{ endIcon: isSafari ? classes.buttonStaisticsSafariForPopls : classes.buttonStaistics }}
          startIcon={<img className='white' style={{ width: "15px", height: "15px" }} alt='popl' src={poplIcon} />}
          onClick={(event) => handleClickPoplItem(event, "popl")}
        >
          Devices
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="outlined"
          fullWidth
          size="small"
          color="primary"
          startIcon={<EqualizerIcon />}
          className={clsx(classes.button, isSafari ? classes.buttonAbsolute : classes.buttonRelative)}
          onClick={() => history.push("/analytics", {
            id, name, business, social, personalMode, profileName: name, url, poplsCount: poplsNumber,
          })}
        >
          Analytics
        </Button>
      </Grid>
    </Grid>
  );
}

export default ProfilePanel;
