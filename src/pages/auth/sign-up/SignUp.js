import React, { useState } from "react";
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
import { useForm } from "react-hook-form";
import { withRouter } from "react-router-dom";

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
  const { history } = props;
  const { register, handleSubmit, errors, getValues, formState } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const [showPassword, setShowPassword] = useState(false);

  function handleClickShowPassword() {
    setShowPassword(!showPassword);
  }
  function onSubmit(values) {
    console.log(values);
  }
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
          <form onSubmit={handleSubmit(onSubmit)}>
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
                  // variant="outlined"
                  inputRef={register({ required: "Username is Required" })}
                />
                <Typography variant="caption" className={classes.errorMsg}>
                  {errors.username?.message}
                </Typography>
              </Grid>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  name="email"
                  required
                  // variant="outlined"
                  inputRef={register({ required: "Email is Required" })}
                />
                <Typography variant="caption" className={classes.errorMsg}>
                  {errors.email?.message}
                </Typography>
              </Grid>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Password</InputLabel>
                  <Input
                    type={showPassword ? "text" : "password"}
                    label="Password"
                    fullWidth
                    required
                    name="password"
                    className={classes.Input}
                    inputRef={register({ required: "Password is Required" })}
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
                <Typography variant="caption" className={classes.errorMsg}>
                  {errors.password?.message}
                </Typography>
              </Grid>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <TextField
                  // variant="outlined"
                  type="password"
                  label="Confirm Password"
                  fullWidth
                  required
                  name="confirmPassword"
                  inputRef={register({
                    required: "Confirm Password is Required",
                    validate: (value) =>
                      getValues().password === value ||
                      "Passwords do not match",
                  })}
                />
                <Typography variant="caption" className={classes.errorMsg}>
                  {errors.confirmPassword?.message}
                </Typography>
              </Grid>
              <Grid align="center" item xl={12} lg={12} md={12} sm={12} xs={12}>
                <Button
                  variant="contained"
                  fullWidth
                  disabled={!formState.isValid}
                  color="primary"
                  type="submit"
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
                  onClick={() => history.push("/login")}
                >
                  Already Set up? Log in here
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </>
  );
}

export default withRouter(SignUp);
