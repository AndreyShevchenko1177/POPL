import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Grid,
  Button,
  TextField,
} from "@material-ui/core";
// import { addChildProfileAction, signInChildAction, clearStateAction } from "../../store/actions";
// import { clearStateAction as clearProfilesState } from "../../../profiles/store/actions";
import useStyles from "./styles";

function LoginTab() {
  const classes = useStyles();
  const history = useHistory();
  const [value, setValue] = useState("");
  const signInData = useSelector(({ addProfilesReducer }) => addProfilesReducer.childSignIn.data);
  const userData = useSelector(({ authReducer }) => authReducer.signIn.data);
  const addChildProfile = useSelector(({ addProfilesReducer }) => addProfilesReducer.addChildProfile.data);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    // if (isNaN(Number(event.target.value))) return;
    setValue(event.target.value);
  };

  const create = (values) => {
    // dispatch(signInChildAction(values));
  };

  useEffect(() => {
    // if (signInData) dispatch(addChildProfileAction(userData.id, signInData.id));
  }, [signInData]);

  useEffect(() => {
    if (addChildProfile) {
      // dispatch(clearStateAction("addChildProfile"));
      // dispatch(clearStateAction("childSignIn"));
      // dispatch(clearProfilesState("dataProfiles"));
      history.push("/profiles");
    }
  }, [addChildProfile]);

  return (
    <div>
      <Grid className={classes.loginInputsContainer} container spacing={3}>
        <Grid className={classes.loginInput} item xs={9}>
          <TextField
            type="number"
            autoComplete="off"
            label="enter the number of profiles you’d like to create below"
            name="profilesNumber"
            fullWidth
            autoFocus
            onChange={handleChange}
            value={value}
          />
        </Grid>
        <Grid item xs={3}>
          <Button
            variant="contained"
            color="primary"
            onClick={create}
            fullWidth
          >
                Create profiles
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default LoginTab;
