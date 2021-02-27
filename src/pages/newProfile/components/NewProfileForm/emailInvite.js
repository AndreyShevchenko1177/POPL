import React, { useState } from "react";
import { TextField, Button, Grid } from "@material-ui/core";
import useStyles from "./styles";

function EmailInvite() {
  const [value, setValue] = useState("");
  const classes = useStyles();

  const handleChange = (event) => setValue(event.target.value);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TextField
          id="standard-multiline-flexible"
          label="Enter Emails separated by commas"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={value}
          onChange={handleChange}
        />
      </Grid>
      <Grid
        item
        xs={12}
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <Button
          className={classes.emailBtn}
          variant="contained"
          color="primary"
        >
          Import Emails
        </Button>
        <Button
          className={classes.emailBtn}
          variant="contained"
          color="primary"
        >
          Send Invites!
        </Button>
      </Grid>
    </Grid>
  );
}

export default EmailInvite;
