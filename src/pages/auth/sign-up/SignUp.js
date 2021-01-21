import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  makeStyles,
  Input,
  Button,
  Paper,
  Grid,
  InputAdornment,
  InputLabel,
  FormControl,
  IconButton,
  Typography,
  TextField,
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import clsx from "clsx";
import { signUpConfig } from "../validationConfig";
import useValidation from "../../../utils/validation";
import { signUpAction } from "../store/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "98vh",
  },
  Input: {
    // margin: `8px 0`,
  },
  loginBg: {
    maxWidth: "400px",
    minHeight: "60vh",
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
  loginBtn: { margin: `30px 0`, width: "50%" },
  adornment: {
    padding: 12,
    color: `rgba(0,0,0,0.54)`,
  },
  errorMsg: {
    color: "#FF0000",
    textAlign: "left",
  },
}));

function SignUp(props) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const signInResult = useSelector(({ authReducer }) => authReducer.signIn);
  const signUpResult = useSelector(({ authReducer }) => authReducer.signUp);
  const [
    username,
    email,
    password,
    confirmPassword,
    fieldValues,
    changeHandler,
    startValidation,
  ] = useValidation(signUpConfig);

  function handleClickShowPassword() {
    setShowPassword(!showPassword);
  }

  const signUp = ([username, email, password, confirmPassword], error) => {
    console.log(124);
    dispatch(
      signUpAction(error, {
        username: username.value,
        email: email.value,
        password: password.value,
        confirmPassword: confirmPassword.value,
      })
    );
  };

  useEffect(() => {
    if (signUpResult.error) return;
    if (signInResult.error || !signInResult.data) return;
    history.push("/");
  }, [signInResult, signUpResult]);

  return (
    <>
      <Grid
        container
        justify="center"
        spacing={2}
        alignItems="center"
        className={clsx(classes.root)}
      >
        <Paper elevation={3} className={classes.loginBg}>
          <Grid
            container
            item
            spacing={2}
            justify="center"
            alignItems="center"
            className={clsx(classes.loginBox)}
          >
            <Grid
              item
              xl={12}
              lg={12}
              md={12}
              sm={12}
              xs={12}
              align="center"
              style={{ marginBottom: 20 }}
            >
              <Typography variant="h3">Set up your Popl!</Typography>
              <br />
              <Typography variant="body1">
                Enter your information below to set up your Popl
              </Typography>
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <TextField
                fullWidth
                label="Username"
                type="text"
                name="username"
                required
                onChange={changeHandler}
                value={fieldValues.username.value || ""}
                error={!!username.errors}
              />
              <Typography variant="caption" className={classes.errorMsg}>
                {username.errors}
              </Typography>
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                name="email"
                required
                onChange={changeHandler}
                value={fieldValues.email.value || ""}
                error={!!email.errors}
              />
              <Typography variant="caption" className={classes.errorMsg}>
                {email.errors}
              </Typography>
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <FormControl fullWidth>
                <InputLabel>Password</InputLabel>
                <Input
                  type={showPassword ? "text" : "password"}
                  label="Password"
                  name="password"
                  fullWidth
                  className={classes.Input}
                  error={!!password.errors}
                  errortext={password.errors}
                  value={fieldValues.password.value || ""}
                  onChange={changeHandler}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              {/* <label>{confirmPassword.errors}</label> */}
              <TextField
                // variant="outlined"
                type="password"
                label="Confirm Password"
                fullWidth
                required
                name="confirmPassword"
                error={!!confirmPassword.errors}
                errortext={confirmPassword.errors}
                value={fieldValues.confirmPassword.value || ""}
                onChange={changeHandler}
              />
            </Grid>
            <Grid align="center" item xl={12} lg={12} md={12} sm={12} xs={12}>
              <Button
                variant="contained"
                fullWidth
                disabled={
                  !(
                    fieldValues.password.value &&
                    fieldValues.username.value &&
                    fieldValues.email.value &&
                    fieldValues.confirmPassword.value
                  )
                }
                color="primary"
                onClick={() => startValidation(signUp)}
                className={classes.loginBtn}
              >
                Create Profile
              </Button>
            </Grid>
            <Grid align="center" item xl={12} lg={12} md={12} sm={12} xs={12}>
              <Button
                variant="contained"
                fullWidth
                color="primary"
                type="button"
                onClick={() => history.push("/sign-in")}
              >
                Already Set up? Log in here
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </>
  );
}

export default SignUp;
