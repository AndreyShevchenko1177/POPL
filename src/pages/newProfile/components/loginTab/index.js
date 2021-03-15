import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  FormControl,
  Input,
  InputLabel,
  IconButton,
  InputAdornment,
  FormHelperText,
  Grid,
  Button,
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Mail from "@material-ui/icons/Mail";
import { ValidationProvider } from "../../../../utils";
import { signInConfig } from "../../../auth/validationConfig";
import { addChildProfile } from "../../../profiles/store/actions";
import useStyles from "./styles";

function LoginTab() {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const dispatch = useDispatch();

  const handleClickShowPassword = (name) => {
    setShowPassword({ ...showPassword, [name]: !showPassword[name] });
  };

  const create = (values) => {
    console.log(values);
    // dispatch(addChildProfile());
  };

  return (
    <div>
      <ValidationProvider config={signInConfig}>
        {(events, values, errors) => (
          <Grid className={classes.loginInputsContainer} container spacing={3}>
            <Grid className={classes.loginInput} item xs={8}>
              <FormControl fullWidth>
                <InputLabel>Username/Email</InputLabel>
                <Input
                  type="text"
                  label="Username/Email"
                  name="username"
                  fullWidth
                  error={!!errors.username}
                  value={values.email}
                  onChange={events.onChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <Mail />
                    </InputAdornment>
                  }
                  autoFocus
                />
                <FormHelperText id="outlined-weight-helper-text" error={true}>
                  {errors.username}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid className={classes.loginInput} item xs={8}>
              <FormControl fullWidth>
                <InputLabel>Password</InputLabel>
                <Input
                  type={showPassword.password ? "text" : "password"}
                  label="Password"
                  name="password"
                  fullWidth
                  error={!!errors.password}
                  value={values.password}
                  onChange={events.onChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        className={classes.passwordInputIconbutton}
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
                <FormHelperText id="outlined-weight-helper-text" error={true}>
                  {errors.password}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => events.submit(create)}
                fullWidth
              >
                Update
              </Button>
            </Grid>
          </Grid>
        )}
      </ValidationProvider>
    </div>
  );
}

export default LoginTab;
