import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  Button,
  TextField,
  Typography,
} from "@material-ui/core";
import { useLocation } from "react-router-dom";
import { addNewProfileWithRandomEmailAction, clearAction } from "./store/actions";
import { snackBarAction } from "../../store/actions";
import Loader from "../../components/Loader";
import useStyles from "./styles";
import Header from "../../components/Header";

function CreateNewAccount() {
  const classes = useStyles();
  const location = useLocation();
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const { isFetching } = useSelector(({ createNewAccountReducer }) => createNewAccountReducer);
  const isAddProfileSuccess = useSelector(({ createNewAccountReducer }) => createNewAccountReducer.addProfileByRandomEmailSuccess);

  const handleChange = (event) => {
    // if (isNaN(Number(event.target.value))) return;
    setValue(event.target.value);
  };

  const create = () => {
    dispatch(addNewProfileWithRandomEmailAction(Number(value)), (isError, errorMessage) => {
      if (isError) {
        return dispatch(snackBarAction({
          message: errorMessage,
          severity: "error",
          duration: 6000,
          open: true,
        }));
      }
    });
  };

  useEffect(() => {
    if (isAddProfileSuccess) {
      setValue("");
      dispatch(clearAction("addProfileByRandomEmailSuccess"));
      dispatch(snackBarAction({
        message: "Accounts created successfully",
        severity: "success",
        duration: 6000,
        open: true,
      }));
    }
  }, [isAddProfileSuccess]);

  return (
    <React.Fragment>
      <Header
        firstChild
        path={location.pathname === location.state.path ? location.state.rootPath : location.state.path}
      />
      <div className={classes.root}>
        <Grid className={classes.loginInputsContainer} container spacing={3}>
          {isFetching && <Loader styles={{ position: "absolute", top: "calc(50% - 20px)", left: "calc(50% - 20px)" }} />}
          <Typography classes={{ subtitle1: classes.inputHeading }} variant='subtitle1'>Enter number of accounts you’d like to create below:</Typography>
          <Grid className={classes.loginInput} item xs={2}>
            <TextField
              type="number"
              variant='outlined'
              size='small'
              autoComplete="off"
              disabled={isFetching}
              name="profilesNumber"
              fullWidth
              autoFocus
              onChange={handleChange}
              value={value}
            />
          </Grid>
          <Grid item xs={12} classes={{ item: classes.gridWithoutPadding }}>
            <Typography classes={{ subtitle1: classes.textBelowInput }} variant='subtitle1'>These accounts will be created with randomly generated emails that can be changed later </Typography>
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={create}
              disabled={isFetching}
              fullWidth
            >
                Create accounts
            </Button>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
}

export default CreateNewAccount;