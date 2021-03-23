import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Grid } from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { inviteByEmailAction } from "../../store/actions";
import useStyles from "./styles";
import { getId } from "../../../../utils/uniqueId";

function EmailInvite() {
  const [value, setValue] = useState("");
  const [email, setEmail] = useState([]);
  const classes = useStyles();
  const dispatch = useDispatch();
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

  const handleInvite = () => dispatch(inviteByEmailAction(email));

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
          <input placeholder={email.length ? "" : "Enter Emails separated by commas"} className={classes.emailInput} style={email.length ? { minWidth: "10px" } : { width: "35%" }} onChange={handleChange} onKeyUp={handleKeyChange} value={value}/>
        </div>

      </div>
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
          onClick={handleInvite}
          color="primary"
        >
          Send Invites!
        </Button>
      </Grid>
    </Grid>
  );
}

export default EmailInvite;
