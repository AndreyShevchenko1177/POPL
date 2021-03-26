import React from "react";
import { useHistory } from "react-router-dom";
import {
  Grid, FormGroup, Button,
} from "@material-ui/core";
import clsx from "clsx";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import VisibilityIcon from "@material-ui/icons/Visibility";
import connectIcon from "../../../../assets/svg/connect.svg";
import useStyles from "./styles/styles";
import CustomSwitch from "../../../../components/customSwitcher";

function ProfilePanel({
  id,
  social,
  business,
  handleClickPoplItem,
  handleSwitchChanger,
  directOn,
  personalMode,
  section2,
  name,
}) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <div className={clsx(section2, "target-element")}>
          <div className="full-w">
            <FormGroup onClick={handleClickPoplItem}>
              <div className={classes.switcherContainer}>
                <CustomSwitch
                  checked={personalMode.direct}
                  onClick={(event) => handleSwitchChanger(event, "dir2")}
                  after='Personal'
                  before='Business'
                />
              </div>
              <div className={classes.switcherContainer}>
                <CustomSwitch
                  checked={directOn.direct}
                  onClick={(event) => handleSwitchChanger(event, "dir1")}
                  after='Direct Off'
                  before='Direct On'
                />
              </div>
            </FormGroup>
          </div>
        </div>
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="outlined"
          size="small"
          color="primary"
          className={classes.button}
          startIcon={
            <img
              className={classes.connectIcon}
              alt="connections"
              src={connectIcon}
            />
          }
          onClick={() => history.push("/connections", { disabled: false, id, name })}
        >
          Connections
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="outlined"
          className={classes.button}
          size="small"
          color="primary"
          startIcon={<EqualizerIcon />}
          onClick={() => history.push("/analytics/overall", {
            id, name, business, social,
          })}
        >
          Analytics
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="outlined"
          size="small"
          color="primary"
          className={classes.button}
          startIcon={<VisibilityIcon />}
          onClick={(event) => handleClickPoplItem(event, "popl")}
        >
          Popls
        </Button>
      </Grid>
    </Grid>
  );
}

export default ProfilePanel;
