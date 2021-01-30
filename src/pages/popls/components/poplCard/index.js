import React from "react";
import { Button, Paper, Typography } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import useStyles from "./styles/styles";
import userIcon from "../../../../assets/svg/user.svg";
import "./styles/styles.css";

function PoplCard({ popl, editAction }) {
  const classes = useStyles();
  return (
    <Paper className={classes.container}>
      <div className="popls-page-popl-card-image-container">
        <img className="popls-page-popl-card-image" alt="logo" src={userIcon} />
      </div>
      <div className="popls-page-popl-card-content-container">
        <Typography variant="h5">{popl.name}</Typography>
        <table>
          <tbody className="popls-page-popl-card-table">
            <tr>
              <td className="popls-page-popl-card-tablecell">Name:</td>
              <td>{popl.name}</td>
            </tr>
            <tr>
              <td className="popls-page-popl-card-tablecell">Slug:</td>
              <td>{popl.url}</td>
            </tr>
            <tr>
              <td className="popls-page-popl-card-tablecell">Created:</td>
              <td>{`${
                new Date().getDay() < 10
                  ? `0${new Date().getDay()}`
                  : new Date().getDay()
              }/${
                new Date().getMonth() + 1 < 10
                  ? `0${new Date().getMonth() + 1}`
                  : new Date().getMonth() + 1
              }/${new Date().getFullYear()} ${new Date().getHours()}:${
                new Date().getMinutes() < 10
                  ? `0${new Date().getMinutes()}`
                  : new Date().getMinutes()
              }`}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="popls-page-popl-card-buttons-container">
        <Button
          variant="outlined"
          size="small"
          startIcon={<EditIcon />}
          className={classes.button}
          onClick={() => editAction(popl)}
        >
          Edit
        </Button>
        <Button
          variant="outlined"
          size="small"
          color="primary"
          startIcon={<EqualizerIcon />}
          className={classes.button}
        >
          Statistics
        </Button>
        <div className="popls-page-popl-card-buttons-container-icons-container">
          <FileCopyIcon className={classes.bottomIcons} />
          <DeleteOutlineIcon className={classes.bottomIcons} />
        </div>
      </div>
    </Paper>
  );
}

export default PoplCard;
