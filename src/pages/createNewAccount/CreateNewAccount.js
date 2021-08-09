import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  Button,
  TextField,
  Typography,
} from "@material-ui/core";
import { useLocation } from "react-router-dom";
import { addNewProfileWithRandomEmailAction, clearAction } from "./store/actions";
import { snackBarAction } from "../../store/actions";
import Loader from "../../components/Loader";
import useStyles from "./styles";
import Header from "../../components/Header";
import ConfirmModal from "../../components/ConfirmModal";
import CreateAccountByEmail from "./components/EmailBox";

function CreateNewAccount() {
  const classes = useStyles();
  const location = useLocation();
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const { isFetching } = useSelector(({ createNewAccountReducer }) => createNewAccountReducer);
  const isAddProfileSuccess = useSelector(({ createNewAccountReducer }) => createNewAccountReducer.addProfileByRandomEmailSuccess);
  const [conFirmModal, setConfirmModal] = useState({ open: false, data: null });

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const create = () => {
    dispatch(addNewProfileWithRandomEmailAction(Number(value)), (isError, errorMessage) => {
      if (isError) {
        return dispatch(snackBarAction({
          message: errorMessage,
          severity: "error",
          duration: 6000,
          open: true,
        }));
      }
    });
  };

  const onConfirmModal = (id) => {
    setConfirmModal({ open: !conFirmModal.open, data: id });
  };

  const onOk = () => {
    create();
    setConfirmModal({ open: !conFirmModal.open, data: null });
  };

  const onCancel = () => {
    setConfirmModal({ open: !conFirmModal.open, data: null });
  };

  useEffect(() => {
    if (isAddProfileSuccess) {
      setValue("");
      dispatch(clearAction("addProfileByRandomEmailSuccess"));
      dispatch(snackBarAction({
        message: `${value} ${value > 1 ? "accounts" : "account"} created successfully`,
        severity: "success",
        duration: 6000,
        open: true,
      }));
    }
  }, [isAddProfileSuccess]);

  return (
    <React.Fragment>
      <Header
        firstChild
        path={location.pathname === location.state.path ? location.state.rootPath : location.state.path}
      />
      <ConfirmModal
        open={conFirmModal.open}
        onClose={onConfirmModal}
        dialogTitle={`Please confirm that you'd like to create ${value} ${value > 1 ? "accounts" : "account"}`}
        okButtonTitle='Create accounts'
        cancelButtonTitle='Cancel'
        onOk={onOk}
        onCancel={onCancel}
      />
      <div className={classes.root}>
        <Grid className={classes.loginInputsContainer} container>
          {isFetching && <Loader styles={{ position: "absolute", top: "calc(50% - 20px)", left: "calc(50% - 20px)" }} />}
          <Typography classes={{ subtitle1: classes.inputHeading }} variant='subtitle1'>Enter number of accounts to create</Typography>
          <Grid className={classes.loginInput} item xs={2}>
            <TextField
              type="number"
              variant='outlined'
              size='small'
              autoComplete="off"
              disabled={isFetching}
              name="profilesNumber"
              fullWidth
              autoFocus
              onChange={handleChange}
              value={value}
            />
          </Grid>
          <Grid item xs={12} classes={{ item: classes.gridWithoutPadding }}>
            <Typography classes={{ subtitle1: classes.textBelowInput }} variant='subtitle1'>These accounts will be created with randomly generated emails that can be changed later </Typography>
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={onConfirmModal}
              disabled={isFetching}
              fullWidth
            >
              Create Accounts
            </Button>
          </Grid>
        </Grid>
        <div className='full-w flex-row-center-horizontal'>
          <div className={classes.orSectionWrapper}>
            <div className={classes.orSectionHr}><hr/></div>
            <div className={classes.orSectionText}>OR</div>
            <div className={classes.orSectionHr}><hr/></div>
          </div>
        </div>

      </div>
      <CreateAccountByEmail />
    </React.Fragment>
  );
}

export default CreateNewAccount;
