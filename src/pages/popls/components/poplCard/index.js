import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Checkbox, Button,
} from "@material-ui/core";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import useStyles from "./styles/styles";
import userIcon from "../../../../assets/images/poplIcon.png";
import DragDots from "../../../../components/dragDots";
import { dateFormat } from "../../../../utils";

function PoplCard({
  popl, poplsCheck, customId, checkboxes,
}) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <>
      <DragDots position="center" />
      <div className={classes.container}>
        <Checkbox
          color="primary"
          inputProps={{ "aria-label": "primary checkbox" }}
          style={{ width: "40px", height: "40px" }}
          onClick={poplsCheck}
          name={`${customId}`}
          classes={{ root: "custom-checkbox-root" }}
          checked={checkboxes[customId]?.checked || false}
        />
        <img className={classes.avatar} alt="logo" src={userIcon} />
      </div>
      <div className={classes.contenContainer}>
        <div className={classes.cardTable}>
          <div className={classes.tableRow}>
            <div className={classes.tableCell}>Profile Owner:</div>
            <div className={classes.tableCell}>{popl.profileOwner}</div>
          </div>
          <div className={classes.tableRow}>
            <div className={classes.tableCell}>Nickname:</div>
            <div className={classes.tableCell}>{popl.nickname}</div>
          </div>
          <div className={classes.tableRow}>
            <div className={classes.tableCell}>Activated:</div>
            <div className={classes.tableCell}>{dateFormat(popl.activationDate, "withTime")}</div>
          </div>
        </div>
      </div>
      <div className={classes.poplPagePoplCardButtonsContainer}>
        <Button
          variant="outlined"
          size="small"
          color="primary"
          startIcon={<EqualizerIcon />}
          className={classes.button}
          onClick={() => history.push("/analytics", { name: popl.name, poplName: popl.name })}
        >
          Analytics
        </Button>
        <div className={classes.popsCountNumber}>
          <span>
            { popl.popsNumber }
            <span style={{ marginLeft: 5 }}>Pops</span>
          </span>
        </div>
      </div>
    </>
  );
}

export default PoplCard;
