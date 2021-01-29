import React, { forwardRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { snackBarAction } from "../store/actions";

const Alert = forwardRef((props, ref) => (
  <MuiAlert elevation={6} variant="filled" {...props} ref={ref} />
));

export default function CSnackbar() {
  const dispatch = useDispatch();
  const snackbarData = useSelector(({ systemReducer }) => systemReducer.alert);

  const handleClose = () => {
    dispatch(snackBarAction({ ...snackbarData, open: false }));
  };

  return (
    <div>
      <Snackbar
        open={snackbarData.open}
        autoHideDuration={snackbarData.duration}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity={snackbarData.severity}>
          {snackbarData.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
