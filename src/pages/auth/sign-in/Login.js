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
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import clsx from "clsx";
import Mail from "@material-ui/icons/Mail";
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
}));

function Login(props) {
  const classes = useStyles();
  const { history } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [loginCredentials, setLoginCredentials] = useState({
    username: "",
    password: "",
  });

  function handleClickShowPassword() {
    setShowPassword(!showPassword);
  }
  function handleLogin(event) {
    event.preventDefault();
    console.log(loginCredentials);
  }
  const { username, password } = loginCredentials;
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
          <form onSubmit={handleLogin}>
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
                    value={username}
                    onChange={(evt) =>
                      setLoginCredentials({
                        ...loginCredentials,
                        username: evt.target.value,
                      })
                    }
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
                    fullWidth
                    className={classes.Input}
                    value={password}
                    onChange={(evt) =>
                      setLoginCredentials({
                        ...loginCredentials,
                        password: evt.target.value,
                      })
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
                </FormControl>
              </Grid>
              <Grid align="center" item xl={12} lg={12} md={12} sm={12} xs={12}>
                <Button
                  variant="contained"
                  fullWidth
                  disabled={!(username && password)}
                  color="primary"
                  type="submit"
                  className={classes.loginBtn}
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
          </form>
        </Paper>
      </Grid>
    </>
  );
}

export default withRouter(Login);
