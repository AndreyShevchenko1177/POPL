import React from "react";
import { useHistory } from "react-router-dom";
import {
  Grid, FormGroup, FormControlLabel, Switch, Button, Typography,
} from "@material-ui/core";
import clsx from "clsx";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import VisibilityIcon from "@material-ui/icons/Visibility";
import connectIcon from "../../../../assets/svg/connect-dark.svg";
import useStyles from "./styles/styles";

function ProfilePanel({
  id,
  handleClickPoplItem,
  handleSwitchChanger,
  directOn,
  personalMode,
  section2,
}) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <div className={clsx(section2, "target-element")}>
          <div>
            <FormGroup onClick={handleClickPoplItem}>
              <FormControlLabel
                control={
                  <Switch
                    size="medium"
                    color="primary"
                    name="dir2"
                    classes={{
                      track: classes.switcherTrack,
                      colorPrimary: classes.switcherColorsChecked,
                      thumb: classes.switcherThumb,
                    }}
                    checked={personalMode.direct}
                    onClick={(event) => handleSwitchChanger(event, "dir2")}
                  />
                }
                onClick={(event) => handleSwitchChanger(event, "dir2")}
                label={<Typography variant='h6'>{personalMode.text}</Typography>}
                labelPlacement="start"
                style={{
                  marginLeft: "0px",
                  fontWeight: "200",
                  display: "flex",
                }}
                classes={{ label: classes.switcherLabel }}
              />
              <FormControlLabel
                control={
                  <Switch
                    size="medium"
                    color="primary"
                    name="dir1"
                    classes={{
                      track: classes.switcherTrack,
                      colorPrimary: classes.switcherColorsChecked,
                    }}
                    checked={directOn.direct}
                    onClick={(event) => handleSwitchChanger(event, "dir1")}
                  />
                }
                onClick={(event) => handleSwitchChanger(event, "dir1")}
                label={<Typography variant='h6'>{directOn.text}</Typography>}
                labelPlacement="start"
                style={{
                  marginLeft: "0px",
                  fontWeight: "500",
                  display: "flex",
                }}
                classes={{ label: classes.switcherLabel }}
              />
            </FormGroup>
          </div>
        </div>
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="outlined"
          size="small"
          color="secondary"
          style={{ color: "#fff", fontWeight: 400, width: "125px" }}
          startIcon={
            <img
              className={classes.connectIcon}
              alt="connections"
              src={connectIcon}
            />
          }
          onClick={() => history.push("/connections", { disabled: false, id })}
        >
          Connections
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="outlined"
          style={{ color: "#fff", fontWeight: 400, width: "125px" }}
          size="small"
          color="secondary"
          className=" "
          startIcon={<EqualizerIcon />}
          onClick={() => console.log("Statistics")}
        >
          Analytics
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="outlined"
          size="small"
          color="secondary"
          style={{ color: "#fff", fontWeight: 400, width: "125px" }}
          className=" "
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
