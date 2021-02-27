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
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import clsx from "clsx";
import Mail from "@material-ui/icons/Mail";
import { signInConfig } from "../validationConfig";
import { signInAction } from "../store/actions";
import ValidationProder from "../../../utils/validationProvider";

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
  loginBtn: { margin: "30px 0", width: "50%" },
  adornment: {
    padding: 12,
    color: "rgba(0,0,0,0.54)",
  },
}));

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
      })
    );
  };

  useEffect(() => {
    if (result.data) history.push("/");
  }, [result]);

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
          <ValidationProder config={signInConfig}>
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
                  <FormControl fullWidth>
                    <InputLabel>Username/Email</InputLabel>
                    <Input
                      type="text"
                      label="Username/Email"
                      name="username"
                      fullWidth
                      error={!!errors.username || result.error}
                      value={values.username}
                      onChange={events.onChange}
                      onKeyDown={(event) =>
                        events.onKeyDown(event, signIn, "Enter")
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
                      {result.error
                        ? "Some field is incorrect"
                        : errors.username}
                    </FormHelperText>
                  </FormControl>
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
                  <FormControl fullWidth>
                    <InputLabel>Password</InputLabel>
                    <Input
                      type={showPassword ? "text" : "password"}
                      label="Password"
                      name="password"
                      fullWidth
                      error={!!errors.password || result.error}
                      value={values.password}
                      onChange={events.onChange}
                      onKeyDown={(event) =>
                        events.onKeyDown(event, signIn, "Enter")
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
                        ? "Some field is incorrect"
                        : errors.password}
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
          </ValidationProder>
        </Paper>
      </Grid>
    </>
  );
}

export default Login;
