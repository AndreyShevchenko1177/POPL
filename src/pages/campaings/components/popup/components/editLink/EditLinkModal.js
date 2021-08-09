import React from "react";
import { Typography } from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import EditScreen from "./components/EditScreen";
import useStyles from "./styles/styles";

function EditLinkModal({
  closeModal, data, action,
}) {
  const classes = useStyles();

  return (
    <>
      <div className={classes.opacityBackground} onClick={closeModal}></div>
      <div className={classes.wizardContainer}>
        <HighlightOffIcon onClick={closeModal} className={classes.closeIcon} />
        <div>
          <div className={classes.root}>
            <div>
              <Typography className={classes.linkText} variant="h5">
                Edit the link
              </Typography>
            </div>
            <EditScreen
              {...data}
              action={action}
              closeModal={closeModal}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default EditLinkModal;
