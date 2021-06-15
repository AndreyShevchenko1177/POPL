import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import GoogleLogin from "react-google-login";
import AppleLogin from "react-apple-login";
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
import Loader from "../../../components/Loader";
import SvgMaker from "../../../components/svgMaker";

function Login(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const result = useSelector(({ authReducer }) => authReducer.signIn);
  const isFetching = useSelector(({ authReducer }) => authReducer.isFetching);

  function handleClickShowPassword() {
    setShowPassword(!showPassword);
  }

  const responseGoogle = (response) => {
    console.log(response);
  };

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
                  <Typography variant="h3">Log in to your Popl account</Typography>
                </Grid>
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
                  <AppleLogin
                    clientId="com.react.apple.login"
                    redirectURI="https://redirectUrl.com"
                    render={(renderProps) => (
                      <Button
                        variant='contained'
                        color='primary'
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                        className={classes.googleButton}
                        startIcon={<SvgMaker fill="#ffffff" name="appleIcon" width={25} height={25} />}
                      >
                        Log in with Apple
                      </Button>
                    )}
                  />
                </Grid>
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
                  <GoogleLogin
                    clientId="1016915496422-0psqeusnp7ldabum6euge875kfii7nu6.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={"single_host_origin"}
                    render={(renderProps) => (
                      <Button
                        variant='contained'
                        color='primary'
                        onClick={renderProps.onClick}
                        // disabled={renderProps.disabled}
                        className={classes.googleButton}
                        startIcon={<SvgMaker name="googleIcon" width={20} height={20} />}
                      >
                        Log in with Google
                      </Button>
                    )}
                  />
                </Grid>
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
                  <div className={classes.orSectionWrapper}>
                    <div className={classes.orSectionHr}><hr/></div>
                    <div className={classes.orSectionText}>or</div>
                    <div className={classes.orSectionHr}><hr/></div>
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
                    <span>Email</span>
                    <FormControl fullWidth>
                      <OutlinedInput
                        type="text"
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
                    <Typography
                      variant='subtitle1'
                      style={{ paddingTop: 10 }}
                      classes={{ subtitle1: classes.haveAccountLink }}
                      onClick={() => history.push("/forgot-password")}
                    >
                      Forgot password?
                    </Typography>
                  </div>
                </Grid>
                <div className={classes.buttonsWrapper}>
                  <div className={classes.submitButton}>
                    {isFetching && <Loader
                      containerStyles={{
                        position: "absolute",
                        top: 40,
                      }}
                      size={20}
                    />}
                    <Button
                      variant="contained"
                      fullWidth
                      disabled={isFetching}
                      color="primary"
                      type="submit"
                      className={classes.loginBtn}
                      onClick={() => events.submit(signIn)}
                    >
                      Log In
                    </Button>
                  </div>
                  <div className={classes.donHaveAccButton}>
                    <Typography
                      variant='subtitle1'
                      classes={{ subtitle1: classes.haveAccountLink }}
                      onClick={() => history.push("/sign-up")}
                    >
                      New to Popl? Join here
                    </Typography>
                  </div>
                </div>
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
