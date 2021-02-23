import React from "react";
import { Grid, FormGroup, FormControlLabel, Switch } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import VisibilityIcon from "@material-ui/icons/Visibility";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import CButton from "../../../../components/CButton";

function ProfilePanel({
  handleClickPoplItem,
  handleSwitchChanger,
  directOn,
  section2,
}) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <div className={section2}>
          <div>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    size="medium"
                    color="primary"
                    checked={directOn.dir2.direct}
                    onChange={(event) => handleSwitchChanger(event, "dir2")}
                  />
                }
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
                    checked={directOn.dir1.direct}
                    onChange={(event) => handleSwitchChanger(event, "dir1")}
                  />
                }
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
        <CButton
          fullWidth
          variant="outlined"
          size="small"
          startIcon={<EditIcon />}
          // className={classes.button}
          cb={() => console.log("edit")}
        >
          Edit
        </CButton>
      </Grid>
      <Grid item xs={12}>
        <CButton
          fullWidth
          variant="outlined"
          size="small"
          color="primary"
          startIcon={<EqualizerIcon />}
          cb={() => console.log("Statistics")}
        >
          Analytics
        </CButton>
      </Grid>
      {/* <Grid item xs={12}>
        <CButton
          fullWidth
          variant="outlined"
          size="small"
          color="primary"
          startIcon={<VisibilityIcon />}
          cb={handleClickPoplItem}
        >
          Popls
        </CButton>
      </Grid> */}
      {/* <Grid item xs={12}>
        <CButton
          fullWidth
          variant="outlined"
          size="small"
          color="primary"
          startIcon={<ArrowRightIcon />}
          cb={() => console.log("View More")}
        >
          View More
        </CButton>
      </Grid> */}
    </Grid>
  );
}

export default ProfilePanel;
