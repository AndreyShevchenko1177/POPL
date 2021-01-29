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
import getFieldValidation from "../../../utils/validateFields";
import { signUpAction } from "../store/actions";

const options = {
  separate: true,
  customFields: {
    username: (props) => (
      <FormControl fullWidth>
        <InputLabel>{props.label}</InputLabel>
        <Input
          type={"text"}
          label={props.label}
          name={props.name}
          fullWidth={props.fullWidth}
          error={props.error}
          value={props.value}
          onChange={props.onChange}
        />
        <FormHelperText id="outlined-weight-helper-text" error={true}>
          {props.errorText}
        </FormHelperText>
      </FormControl>
    ),
    email: (props) => (
      <FormControl fullWidth>
        <InputLabel>{props.label}</InputLabel>
        <Input
          type={"text"}
          label={props.label}
          name={props.name}
          fullWidth={props.fullWidth}
          error={props.error}
          value={props.value}
          onChange={props.onChange}
          autoFocus
        />
        <FormHelperText id="outlined-weight-helper-text" error={true}>
          {props.errorText}
        </FormHelperText>
      </FormControl>
    ),
    password: (props) => (
      <FormControl fullWidth>
        <InputLabel>{props.label}</InputLabel>
        <Input
          type={props.showPassword[props.name] ? "text" : "password"}
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
                onClick={() => props.handleClickShowPassword(props.name)}
              >
                {props.showPassword[props.name] ? (
                  <Visibility />
                ) : (
                  <VisibilityOff />
                )}
              </IconButton>
            </InputAdornment>
          }
        />
        <FormHelperText id="outlined-weight-helper-text" error={true}>
          {props.errorText}
        </FormHelperText>
      </FormControl>
    ),
    confirmPassword: (props) => (
      <FormControl fullWidth>
        <InputLabel>{props.label}</InputLabel>
        <Input
          type={props.showPassword[props.name] ? "text" : "password"}
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
                onClick={() => props.handleClickShowPassword(props.name)}
              >
                {props.showPassword[props.name] ? (
                  <Visibility />
                ) : (
                  <VisibilityOff />
                )}
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

const [UserName, Email, Password, ConfirmPassword, start] = getFieldValidation(
  signUpConfig,
  options
);

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

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const [value, setValue] = useState({});
  const [error, setError] = useState({});
  const signUpResult = useSelector(({ authReducer }) => authReducer.signUp);
  const signIpResult = useSelector(({ authReducer }) => authReducer.signIp);

  function handleClickShowPassword(name) {
    setShowPassword({ ...showPassword, [name]: !showPassword[name] });
  }

  const signUp = () => {
    const error = start(value);
    setError(error);
    if (Object.keys(error).length) return;
    dispatch(
      signUpAction({
        username: value.username.value,
        email: value.email.value,
        password: value.password.value,
        confirmPassword: value.confirmPassword.value,
      })
    );
  };

  useEffect(() => {
    if (signUpResult.data) history.push("/");
  }, [signUpResult]);

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
              <UserName
                value={value}
                setValue={setValue}
                errors={error}
                apiError={signUpResult.error}
              />
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <Email
                value={value}
                setValue={setValue}
                errors={error}
                apiError={signUpResult.error}
              />
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <Password
                value={value}
                setValue={setValue}
                errors={error}
                handleClickShowPassword={handleClickShowPassword}
                showPassword={showPassword}
                apiError={signUpResult.error}
              />
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <ConfirmPassword
                value={value}
                setValue={setValue}
                errors={error}
                handleClickShowPassword={handleClickShowPassword}
                showPassword={showPassword}
                apiError={signUpResult.error}
              />
            </Grid>
            <Grid align="center" item xl={12} lg={12} md={12} sm={12} xs={12}>
              <Button
                variant="contained"
                fullWidth
                disabled={!Object.keys(value).length}
                color="primary"
                onClick={signUp}
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
