import React from "react";
import { Button } from "@material-ui/core";
import useStyles from "./styles";

function TimeOfDelivery() {
  const classes = useStyles();

  return (
    <div className={classes.deliveryTimeRoot}>
      <Button
        variant='contained'
        fullWidth
        color="primary"
      >
        Select Time of Delivery
      </Button>
    </div>
  );
}

export default TimeOfDelivery;
