import React from "react";
import { useHistory } from "react-router-dom";
import {
  Grid, FormGroup, FormControlLabel, Switch, Button,
} from "@material-ui/core";
import clsx from "clsx";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import VisibilityIcon from "@material-ui/icons/Visibility";
import connectIcon from "../../../../assets/svg/connect-dark.svg";
import useStyles from "./styles/styles";

function ProfilePanel({
  handleClickPoplItem,
  handleSwitchChanger,
  directOn,
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
                    checked={directOn.dir2.direct}
                    onClick={(event) => handleSwitchChanger(event, "dir2")}
                  />
                }
                onClick={(event) => handleSwitchChanger(event, "dir2")}
                label={directOn.dir2.text}
                labelPlacement="start"
                style={{
                  marginLeft: "0px",
                  fontWeight: "500",
                  display: "flex",
                  flexDirection: "column-reverse",
                }}
              />
              <FormControlLabel
                control={
                  <Switch
                    size="medium"
                    color="primary"
                    name="dir1"
                    checked={directOn.dir1.direct}
                    onClick={(event) => handleSwitchChanger(event, "dir1")}
                  />
                }
                onClick={(event) => handleSwitchChanger(event, "dir1")}
                label={directOn.dir1.text}
                labelPlacement="start"
                style={{
                  marginLeft: "0px",
                  fontWeight: "500",
                  display: "flex",
                  flexDirection: "column-reverse",
                }}
              />
            </FormGroup>
          </div>
        </div>
      </Grid>
      <Grid item xs={12}>
        <Button
          fullWidth
          variant="outlined"
          size="small"
          startIcon={
            <img
              className={classes.connectIcon}
              alt="connections"
              src={connectIcon}
            />
          }
          onClick={() => history.push("/connections")}
        >
          Connections
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Button
          fullWidth
          variant="outlined"
          size="small"
          color="primary"
          className=" "
          startIcon={<EqualizerIcon />}
          onClick={() => console.log("Statistics")}
        >
          Analytics
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Button
          fullWidth
          variant="outlined"
          size="small"
          color="primary"
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
