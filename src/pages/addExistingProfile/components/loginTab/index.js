import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import { signInConfig } from "./validationConfig";
import Loader from "../../../../components/Loader";
import {
  addChildProfileAction, signInChildAction, clearStateAction,
} from "../../store/actions";
import { clearStateAction as clearProfilesState } from "../../../profiles/store/actions";
import { getProfileInfoRequest } from "../../../../store/actions";
import useStyles from "./styles";

function LoginTab() {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const signInData = useSelector(({ addProfilesReducer }) => addProfilesReducer.childSignIn.data);
  const userData = useSelector(({ authReducer }) => authReducer.signIn.data);
  const addChildProfile = useSelector(({ addProfilesReducer }) => addProfilesReducer.addChildProfile.data);
  const dispatch = useDispatch();
  const [isFetching, setIsFetching] = useState(false);
  const [isClear, setIsClear] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const create = (values) => {
    setIsClear(false);
    setIsFetching(true);
    dispatch(signInChildAction(values, () => setIsFetching(false)));
  };

  useEffect(() => {
    if (signInData) dispatch(addChildProfileAction(userData.id, signInData.id));
  }, [signInData]);

  useEffect(() => {
    if (addChildProfile) {
      setIsFetching(false);
      dispatch(clearStateAction("addChildProfile"));
      dispatch(clearStateAction("childSignIn"));
      dispatch(clearProfilesState("dataProfiles"));
      dispatch(getProfileInfoRequest(userData.id));
    }
    setIsClear(true);
  }, [addChildProfile]);

  return (
    <div>
      <ValidationProvider clear={isClear} config={signInConfig}>
        {(events, values, errors) => (
          <Grid className={classes.loginInputsContainer} container spacing={3}>
            <Grid className={classes.loginInput} item xs={8}>
              <FormControl fullWidth>
                <InputLabel error={!!errors.email}>Email</InputLabel>
                <Input
                  type="text"
                  label="Username/Email"
                  name="email"
                  fullWidth
                  error={!!errors.email}
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
                  {errors.email}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid className={classes.loginInput} item xs={8}>
              <FormControl fullWidth>
                <InputLabel error={!!errors.password}>Password</InputLabel>
                <Input
                  type={showPassword ? "text" : "password"}
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
                        onClick={() => handleClickShowPassword()}
                      >
                        {showPassword ? (
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
                disabled={isFetching}
                onClick={() => events.submit(create)}
                fullWidth
                style={{ height: 36, width: 125 }}
              >
                {isFetching && <Loader
                  containerStyles={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    height: 20,
                  }}
                  size={20}
                />}
                {!isFetching && "Add account"}
              </Button>
            </Grid>
          </Grid>
        )}
      </ValidationProvider>
    </div>
  );
}

export default LoginTab;
