import React from "react";
import { Paper, Grid, Button, TextField } from "@material-ui/core";
import useStyles from "./styles";
import UserAvatar from "../../../../assets/images/user1.png";

function EditForm({ imgRef }) {
  const classes = useStyles();

  return (
    <Paper elevation={3} className={classes.section}>
      <Grid container spacing={2} justify="center">
        <Grid item xl={3} lg={3} md={3} sm={6} xs={6}>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12} align="center">
            <img
              src={UserAvatar}
              height="128px"
              width="128px"
              alt={"profile"}
            />
          </Grid>
          <input type="file" hidden ref={imgRef} />
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12} align="center">
            <Button onClick={() => imgRef.current.click()}>Change Photo</Button>
          </Grid>
        </Grid>
        <Grid item container spacing={2} xl={6} lg={6} md={6} sm={12} xs={12}>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <TextField fullWidth variant="outlined" label="Profile Name" />
          </Grid>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <TextField
              fullWidth
              label="Bio"
              variant="outlined"
              multiline
              rows={3}
            />
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default EditForm;
