import { Button, TextField, Typography } from "@material-ui/core";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ConfirmModal from "../../../components/ConfirmModal";
import { increaseStripeAccountNumber, snackBarAction } from "../../../store/actions";
import useStyles from "../styles/styles";

function MoreWindow({
  setOpen, open,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentQuantity = useSelector(({ systemReducer }) => systemReducer.setMeteredSubQuantity);
  const monthPrice = 10;
  const [value, setValue] = useState("");

  const onOk = () => {
    dispatch(increaseStripeAccountNumber(value), () => {
      dispatch(snackBarAction({
        message: "Successfully update account number for your subscription",
        severity: "success",
        duration: 6000,
        open: true,
      }));
      setOpen(false);
    });
  };

  const onCancel = () => {
    setOpen(false);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onChangeHandler = (event) => {
    if (event.target.value === "") return setValue("");
    if (event.target.value <= 0 || isNaN(+event.target.value)) return;
    setValue(event.target.value.replaceAll(" ", ""));
  };

  const confirmModal = () => {
    if (value < currentQuantity) {
      return dispatch(snackBarAction({
        message: "Accounts number can't be less than you have in dashboard",
        severity: "error",
        duration: 6000,
        open: true,
      }));
    }
    setOpen(true);
  };

  return (
    <div className={classes.moreWindow}>
      <div>
        <div>
          <span >
            Want more accounts? Enter the TOTAL number of accounts you'd like to subscribe for below
          </span>
        </div>
        <div>
          <TextField
            variant='outlined'
            onChange={onChangeHandler}
            value={value}
            size="small"
            style={{ width: "35%" }}
          />
        </div>
        <ConfirmModal
          open={open}
          dialogTitle={`Confirm subscription of ${value} total  accounts for $${monthPrice * value}`}
          okButtonTitle='Subcribe'
          cancelButtonTitle='Cancel'
          onOk={onOk}
          onCancel={onCancel}
          onClose={onClose}
        />
        <Button disabled={!value} className={classes.subscribeMoreBtn} color='primary' variant='contained' onClick={confirmModal}>
            Subscribe for additional accounts
        </Button>
      </div>
    </div>
  );
}

export default MoreWindow;
