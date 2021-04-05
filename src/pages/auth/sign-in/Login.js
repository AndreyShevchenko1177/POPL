import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  OutlinedInput,
  Button,
  Paper,
  Grid,
  InputAdornment,
  FormControl,
  IconButton,
  Typography,
  FormHelperText,
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import clsx from "clsx";
import Mail from "@material-ui/icons/Mail";
import { signInConfig } from "../validationConfig";
import { signInAction } from "../store/actions";
import { ValidationProvider } from "../../../utils";
import useStyles from "./styles";
import AnimationComponent from "./AnimationComponent";

function Login(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const result = useSelector(({ authReducer }) => authReducer.signIn);

  function handleClickShowPassword() {
    setShowPassword(!showPassword);
  }

  const signIn = (values, errors) => {
    dispatch(
      signInAction({
        username: values.username,
        password: values.password,
      }),
    );
  };

  useEffect(() => {
    if (result.data) history.push("/");
  }, [result]);

  return (
    <div className={classes.root}>
      <div className={classes.loginContainer}>
        <div className={classes.topIconContainer}>
          <img alt='logo' className={classes.logo} src="/assests/logo/popl_logo_black.png" />
        </div>
        <Paper elevation={0} className={classes.loginFormWrapper}>
          <ValidationProvider config={signInConfig}>
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
                  <Typography variant="h3">Login</Typography>
                </Grid>
                <Grid
                  item
                  xl={12}
                  lg={12}
                  md={12}
                  sm={12}
                  xs={12}
                  align="center"
                >
                  <div className={classes.inputWrapper}>
                    <span>Email</span>
                    <FormControl fullWidth>
                      <OutlinedInput
                        type="text"
                        // label="Username/Email"
                        name="username"
                        fullWidth
                        error={!!errors.username || result.error}
                        value={values.username}
                        onChange={events.onChange}
                        onKeyDown={(event) => events.onKeyDown(event, signIn, "Enter")
                        }
                        endAdornment={
                          <InputAdornment classes={{ root: classes.emailAdornment }} position="end">
                            <Mail />
                          </InputAdornment>
                        }
                        autoFocus
                      />
                    </FormControl>
                  </div>
                </Grid>
                <Grid
                  item
                  xl={12}
                  lg={12}
                  md={12}
                  sm={12}
                  xs={12}
                  align="center"
                >
                  <div className={classes.inputWrapper}>
                    <span>Password</span>
                    <FormControl fullWidth>
                      <OutlinedInput
                        type={showPassword ? "text" : "password"}
                        // label="Password"
                        name="password"
                        fullWidth
                        error={!!errors.password || result.error}
                        value={values.password}
                        onChange={events.onChange}
                        onKeyDown={(event) => events.onKeyDown(event, signIn, "Enter")
                        }
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
                      <FormHelperText
                        id="outlined-weight-helper-text"
                        error={true}
                      >
                        {result.error
                          ? "Invalid email or password"
                          : errors.password}
                      </FormHelperText>
                    </FormControl>
                  </div>
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
                    type="submit"
                    className={classes.loginBtn}
                    onClick={() => events.submit(signIn)}
                  >
                    Submit
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
                  <Button
                    variant="contained"
                    fullWidth
                    color="primary"
                    type="button"
                    onClick={() => history.push("/sign-up")}
                  >
                    Don't have a profile? Join here
                  </Button>
                </Grid>
              </Grid>
            )}
          </ValidationProvider>
        </Paper>
      </div>
      <AnimationComponent />
    </div>
  );
}

export default Login;
