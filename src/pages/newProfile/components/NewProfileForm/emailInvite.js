import React, { useState } from "react";
import { Button, Grid, Icon } from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import useStyles from "./styles";
import { getId } from "../../../../utils/uniqueId";

function EmailInvite() {
  const [value, setValue] = useState("");
  const [email, setEmail] = useState([]);
  const classes = useStyles();
  const regexp = /@/;

  const handleChange = (event) => {
    if (event.target.value.split(",").length > 1) {
      if (regexp.test(event.target.value.split(",")[0])) {
        setEmail((em) => ([...em, { emailString: `${event.target.value.split(",")[0]} `, id: getId(8) }]));
        return setValue("");
      }
    }
    setValue(event.target.value);
  };

  const handleKeyChange = (event) => {
    if (event.code === "Backspace" && !value) {
      setEmail((em) => em.splice(em.length - 1, 1));
    }
  };

  const removeEmail = (id) => {
    setEmail((em) => em.filter((email) => email.id !== id));
  };

  return (
    <Grid container spacing={3}>
      <div className={classes.emailContainer}>
        <div className={classes.emailChipContainer}>
          {email.map(({ emailString, id }) => <div key={id} className={classes.emailChip}>
            <p>
              {emailString}
            </p>
            <HighlightOffIcon className={classes.icon} onClick={() => removeEmail(id)}/>
          </div>)}
          <input placeholder='Enter Emails separated by commas' className={classes.emailInput} onChange={handleChange} onKeyUp={handleKeyChange} value={value}/>
        </div>

      </div>
      {/* <Grid item xs={12}>
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
      </Grid> */}
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
