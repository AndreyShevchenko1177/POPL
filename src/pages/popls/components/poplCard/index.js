import React from "react";
import { useHistory } from "react-router-dom";
import {
  Checkbox, Button,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import useStyles from "./styles/styles";
import userIcon from "../../../../assets/images/poplIcon.png";
import DragDots from "../../../../components/dragDots";
import { dateFormat } from "../../../../utils/dates";

function PoplCard({ popl, editAction }) {
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
        />
        <img className={classes.avatar} alt="logo" src={userIcon} />
      </div>
      <div className={classes.contenContainer}>
        {/* <Typography variant="h5">{popl.name}</Typography> */}
        <table>
          <tbody className={classes.cardTable}>
            <tr>
              <td className={classes.tableCell}>Profile Owner:</td>
              <td>{popl.profileOwner}</td>
            </tr>
            <tr>
              <td className={classes.tableCell}>Popl ID:</td>
              <td>{popl.name}</td>
            </tr>
            <tr>
              <td className={classes.tableCell}>Activated:</td>
              <td>{dateFormat(popl.activationDate, "withTime")}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={classes.poplPagePoplCardButtonsContainer}>
        {/* <Button
          variant="outlined"
          size="small"
          startIcon={<EditIcon />}
          className={classes.button}
          onClick={() => editAction(popl)}
        >
          Edit
        </Button> */}
        <Button
          variant="outlined"
          size="small"
          color="primary"
          startIcon={<EqualizerIcon />}
          className={classes.button}
          onClick={() => history.push("/analytics/overall", { poplName: popl.name })}
        >
          Analytics
        </Button>
        {/* <div className={classes.iconsButtonWrapper}>
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
          >
            <FileCopyIcon />
          </IconButton>
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
          >
            <DeleteOutlineIcon />
          </IconButton>
        </div> */}
      </div>
    </>
  );
}

export default PoplCard;
