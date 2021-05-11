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
  FormHelperText,
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import Mail from "@material-ui/icons/Mail";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import clsx from "clsx";
import { signUpConfig } from "../validationConfig";
import { signUpAction, cleanAction } from "../store/actions";
import { snackBarAction } from "../../../store/actions";
import { ValidationProvider } from "../../../utils";

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
  loginBtn: { margin: "30px 0", width: "80%" },
  adornment: {
    padding: 12,
    color: "rgba(0,0,0,0.54)",
  },
  errorMsg: {
    color: "#FF0000",
    textAlign: "left",
  },
  haveAccountLink: {
    fontWeight: "bold !important",
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

function SignUp(props) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const signUpResult = useSelector(({ authReducer }) => authReducer.signUp);

  function handleClickShowPassword(name) {
    setShowPassword({ ...showPassword, [name]: !showPassword[name] });
  }

  const signUp = (values) => {
    dispatch(
      signUpAction({
        username: values.username,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
      }),
    );
  };

  useEffect(() => {
    if (signUpResult.data) history.push("/sign-in");
    if (signUpResult.error !== null) {
      dispatch(snackBarAction({
        message: signUpResult.error.message,
        severity: "error",
        duration: 6000,
        open: true,
      }));
    }
  }, [signUpResult]);

  useEffect(() => () => dispatch(cleanAction("signUp")), []);

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
          <ValidationProvider config={signUpConfig}>
            {(events, values, errors) => (
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
                  <Typography variant="h3">Set up your Profile!</Typography>
                  <br />
                  <Typography variant="body1">
                    Enter your information below to set up your Profile
                  </Typography>
                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Name</InputLabel>
                    <Input
                      type="text"
                      label="Name"
                      name="username"
                      fullWidth
                      error={!!errors.username || signUpResult.error?.success}
                      value={values.username}
                      onChange={events.onChange}
                      onKeyDown={(event) => events.onKeyDown(event, signUp, "Enter")
                      }
                      endAdornment={
                        <InputAdornment position="end">
                          <Mail />
                        </InputAdornment>
                      }
                      autoFocus
                    />
                    <FormHelperText
                      id="outlined-weight-helper-text"
                      error={true}
                    >
                      {signUpResult.error?.success
                        ? "Some field is incorrect"
                        : errors.username}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Email</InputLabel>
                    <Input
                      type="text"
                      label="Email"
                      name="email"
                      fullWidth
                      error={!!errors.email || signUpResult.error?.success}
                      value={values.email}
                      onChange={events.onChange}
                      onKeyDown={(event) => events.onKeyDown(event, signUp, "Enter")
                      }
                      endAdornment={
                        <InputAdornment position="end">
                          <Mail />
                        </InputAdornment>
                      }
                      autoFocus
                    />
                    <FormHelperText
                      id="outlined-weight-helper-text"
                      error={true}
                    >
                      {signUpResult.error?.success
                        ? "Some field is incorrect"
                        : errors.email}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Password</InputLabel>
                    <Input
                      type={showPassword.password ? "text" : "password"}
                      label="Password"
                      name="password"
                      fullWidth
                      error={!!errors.password || signUpResult.error?.success}
                      value={values.password}
                      onChange={events.onChange}
                      onKeyDown={(event) => events.onKeyDown(event, signUp, "Enter")
                      }
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => handleClickShowPassword("password")}
                          >
                            {showPassword.password ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    <FormHelperText
                      id="outlined-weight-helper-text"
                      error={true}
                    >
                      {signUpResult.error?.success
                        ? "Some field is incorrect"
                        : errors.password}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Confirm password</InputLabel>
                    <Input
                      type={showPassword.confirmPassword ? "text" : "password"}
                      label="Confirm password"
                      name="confirmPassword"
                      fullWidth
                      error={!!errors.confirmPassword || signUpResult.error?.success}
                      value={values.confirmPassword}
                      onChange={events.onChange}
                      onKeyDown={(event) => events.onKeyDown(event, signUp, "Enter")
                      }
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => handleClickShowPassword("confirmPassword")
                            }
                          >
                            {showPassword.confirmPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    <FormHelperText
                      id="outlined-weight-helper-text"
                      error={true}
                    >
                      {signUpResult.error?.success
                        ? "Some field is incorrect"
                        : errors.confirmPassword}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid
                  align="center"
                  item
                  xl={12}
                  lg={12}
                  md={12}
                  sm={12}
                  xs={12}
                >
                  <Button
                    variant="contained"
                    fullWidth
                    // disabled={!Object.keys(value).length}
                    color="primary"
                    onClick={() => events.submit(signUp)}
                    className={classes.loginBtn}
                  >
                    Create Profile
                  </Button>
                </Grid>
                <Grid
                  align="center"
                  item
                  xl={12}
                  lg={12}
                  md={12}
                  sm={12}
                  xs={12}
                >
                  <Typography
                    variant='subtitle1'
                    classes={{ subtitle1: classes.haveAccountLink }}
                    onClick={() => history.push("/sign-in")}
                  >
                      Already have a profile? Sign in
                  </Typography>
                  {/* <Button
                    variant="contained"
                    fullWidth
                    color="primary"
                    type="button"
                    onClick={() => history.push("/sign-in")}
                  >
                    Already Set up? Log in here
                  </Button> */}
                </Grid>
              </Grid>
            )}
          </ValidationProvider>
        </Paper>
      </Grid>
    </>
  );
}

export default SignUp;
