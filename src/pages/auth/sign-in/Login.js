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
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import clsx from "clsx";
import Mail from "@material-ui/icons/Mail";
import useValidation from "../../../utils/validation";
import { signInConfig } from "../validationConfig";
import { signInAction } from "../store/actions";

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
}));

function Login(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const result = useSelector(({ authReducer }) => authReducer.signIn);
  const [
    username,
    password,
    fieldValues,
    changeHandler,
    startValidation,
  ] = useValidation(signInConfig);

  function handleClickShowPassword() {
    setShowPassword(!showPassword);
  }

  const signIn = ([username, password], error) => {
    dispatch(
      signInAction(error, {
        username: username.value,
        password: password.value,
      })
    );
  };

  useEffect(() => {
    if (result.error || !result.data) return;
    history.push("/");
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
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12} align="center">
              <FormControl fullWidth>
                <InputLabel>Username/Email</InputLabel>
                <Input
                  fullWidth
                  type="text"
                  label="Username/Email"
                  name="username"
                  value={fieldValues.username.value || ""}
                  error={!!username.errors}
                  errortext={username.errors}
                  onChange={changeHandler}
                  endAdornment={
                    <InputAdornment
                      position="end"
                      className={classes.adornment}
                    >
                      <Mail />
                    </InputAdornment>
                  }
                  autoFocus
                  className={classes.Input}
                />
              </FormControl>
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12} align="center">
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
            <Grid align="center" item xl={12} lg={12} md={12} sm={12} xs={12}>
              <Button
                variant="contained"
                fullWidth
                disabled={
                  !(fieldValues.password.value && fieldValues.username.value)
                }
                color="primary"
                type="submit"
                className={classes.loginBtn}
                onClick={() => startValidation(signIn)}
              >
                Submit
              </Button>
            </Grid>
            <Grid align="center" item xl={12} lg={12} md={12} sm={12} xs={12}>
              <Button
                variant="contained"
                fullWidth
                color="primary"
                type="button"
                onClick={() => history.push("/register")}
              >
                Don't have a profile? Join here
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </>
  );
}

export default Login;
