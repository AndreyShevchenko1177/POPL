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
import getFieldValidation from "../../../utils/validateFields";
import { signInConfig } from "../validationConfig";
import { signInAction } from "../store/actions";

const options = {
  separate: true,
  customFields: {
    username: (props) => (
      <FormControl fullWidth>
        <InputLabel>Username/Email</InputLabel>
        <Input
          type={"text"}
          label={props.label}
          name={props.name}
          fullWidth={props.fullWidth}
          error={props.error}
          value={props.value}
          onChange={props.onChange}
          endAdornment={
            <InputAdornment position="end">
              <Mail />
            </InputAdornment>
          }
          autoFocus
        />
        <FormHelperText id="outlined-weight-helper-text" error={true}>
          {props.errorText}
        </FormHelperText>
      </FormControl>
    ),
    password: (props) => (
      <FormControl fullWidth>
        <InputLabel>Password</InputLabel>
        <Input
          type={props.showPassword ? "text" : "password"}
          label={props.label}
          name={props.name}
          fullWidth={props.fullWidth}
          error={props.error}
          value={props.value}
          onChange={props.onChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={props.handleClickShowPassword}
              >
                {props.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
        <FormHelperText id="outlined-weight-helper-text" error={true}>
          {props.errorText}
        </FormHelperText>
      </FormControl>
    ),
  },
};

const [UserName, Password, start] = getFieldValidation(signInConfig, options);

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
  const [value, setValue] = useState({});
  const [error, setError] = useState({});
  const result = useSelector(({ authReducer }) => authReducer.signIn);

  function handleClickShowPassword() {
    setShowPassword(!showPassword);
  }

  const signIn = () => {
    const error = start(value);
    setError(error);
    if (Object.keys(error).length) return;
    dispatch(
      signInAction({
        username: value.username.value,
        password: value.password.value,
      })
    );
  };

  useEffect(() => {
    console.log(result);
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
              <UserName
                value={value}
                setValue={setValue}
                errors={error}
                apiError={result.error}
              />
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12} align="center">
              <Password
                value={value}
                setValue={setValue}
                errors={error}
                handleClickShowPassword={handleClickShowPassword}
                showPassword={showPassword}
                apiError={result.error}
              />
            </Grid>
            <Grid align="center" item xl={12} lg={12} md={12} sm={12} xs={12}>
              <Button
                variant="contained"
                fullWidth
                disabled={!Object.keys(value).length}
                color="primary"
                type="submit"
                className={classes.loginBtn}
                onClick={signIn}
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
                onClick={() => history.push("/sign-up")}
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
