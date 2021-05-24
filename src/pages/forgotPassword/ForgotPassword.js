import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  FormControl, OutlinedInput, InputAdornment, Button, Grid, Typography, FormHelperText, IconButton,
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import Mail from "@material-ui/icons/Mail";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { ValidationProvider } from "../../utils";
import useStyles from "./styles/styles";
import { forgotPasswordConfig, resetPasswordConfig } from "./validationConfig";
import { sendCodeAction, setNewPasswordAction, clearAction } from "./store/actions";

function ForgotPassword() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const result = useSelector(({ forgotPasswordReducer }) => forgotPasswordReducer.code.success);
  const resetPasswordResult = useSelector(({ forgotPasswordReducer }) => forgotPasswordReducer.resetPassword.success);

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  function handleClickShowPassword(name) {
    setShowPassword({ ...showPassword, [name]: !showPassword[name] });
  }

  const submit = (values, errors) => {
    dispatch(sendCodeAction(values.email));
  };

  const resetPassord = (values, errors) => {
    dispatch(setNewPasswordAction(values.password, values.confirmPassword, values.code));
  };

  useEffect(() => {
    if (resetPasswordResult) {
      return history.push("/sign-in");
    }
  }, [resetPasswordResult]);

  useEffect(() => () => dispatch(clearAction()), []);

  return (
    <div className={classes.root}>
      <div className={classes.main}>
        <ValidationProvider config={result ? resetPasswordConfig : forgotPasswordConfig}>
          {(events, values, errors) => (
            <Grid
              container
              item
              spacing={2}
              justify="center"
              alignItems="center"
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
                <Typography variant="h3">Forgot Password</Typography>
              </Grid>
              {!result ? <Grid
                item
                className={classes.emailContainer}
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={12}
                align="center"
              >
                <span className={classes.label}>Email</span>
                <FormControl fullWidth>
                  <OutlinedInput
                    type="text"
                    required
                    // label="Username/Email"
                    name="email"
                    fullWidth
                    error={!!errors.email}
                    value={values.email || ""}
                    onChange={events.onChange}
                    onKeyDown={(event) => events.onKeyDown(event, submit, "Enter")
                    }
                    endAdornment={
                      <InputAdornment classes={{ root: classes.emailAdornment }} position="end">
                        <Mail />
                      </InputAdornment>
                    }
                    autoFocus
                  />
                  <FormHelperText
                    id="outlined-weight-helper-text"
                    error={true}
                  >
                    {errors.email}

                  </FormHelperText>
                </FormControl>
              </Grid>
                : <>
                  <Grid
                    className={classes.emailContainer}
                    item
                    xl={12}
                    lg={12}
                    md={12}
                    sm={12}
                    xs={12}
                    align="center"
                  >
                    <span className={classes.label}>Code</span>
                    <FormControl fullWidth>
                      <OutlinedInput
                        type="text"
                        required
                        name="code"
                        fullWidth
                        error={!!errors.code}
                        value={values.code || ""}
                        onChange={events.onChange}
                        onKeyDown={(event) => events.onKeyDown(event, resetPassord, "Enter")
                        }
                        autoFocus
                      />
                      <FormHelperText
                        id="outlined-weight-helper-text"
                        error={true}
                      >
                        {errors.code}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid
                    className={classes.emailContainer}
                    item
                    xl={12}
                    lg={12}
                    md={12}
                    sm={12}
                    xs={12}
                  >
                    <span className={classes.label}>Password</span>
                    <FormControl fullWidth>
                      <OutlinedInput
                        type={showPassword.password ? "text" : "password"}
                        name="password"
                        fullWidth
                        error={!!errors.password}
                        value={values.password || ""}
                        onChange={events.onChange}
                        onKeyDown={(event) => events.onKeyDown(event, resetPassord, "Enter")
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
                        {errors.password}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid
                    className={classes.emailContainer}
                    item
                    xl={12}
                    lg={12}
                    md={12}
                    sm={12}
                    xs={12}
                  >
                    <FormControl fullWidth>
                      <span className={classes.label}>Confirm password</span>
                      <OutlinedInput
                        type={showPassword.confirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        fullWidth
                        error={!!errors.confirmPassword}
                        value={values.confirmPassword || ""}
                        onChange={events.onChange}
                        onKeyDown={(event) => events.onKeyDown(event, resetPassord, "Enter")
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
                        {errors.confirmPassword}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                </>
              }
              <Grid
                item
                xl={10}
                lg={10}
                md={10}
                sm={10}
                xs={10}
                align="center"
              >
                <Button
                  variant="contained"
                  fullWidth
                  // disabled={!Object.keys(value).length}
                  color="primary"
                  type="submit"
                  // className={classes.loginBtn}
                  onClick={() => events.submit(result ? resetPassord : submit)}
                >
                Submit
                </Button>
              </Grid>
            </Grid>
          )}
        </ValidationProvider>
      </div>
    </div>
  );
}

export default ForgotPassword;
