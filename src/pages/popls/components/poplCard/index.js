import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Checkbox, Button,
} from "@material-ui/core";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import useStyles from "./styles/styles";
import userIcon from "../../../../assets/images/poplIcon.png";
import DragDots from "../../../../components/dragDots";
import { dateFormat } from "../../../../utils/dates";
import { getPopsForPoplItem } from "../../store/actions/requests";
import Loader from "../../../../components/Loader";

function PoplCard({ popl, userId }) {
  const classes = useStyles();
  const history = useHistory();
  const [popsCount, setPopsCount] = useState();
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    getPopsForPoplItem(userId, popl.name)
      .then((res) => mounted && setPopsCount(` ${res}`))
      .catch((err) => console.log(err));

    return () => setMounted(false);
  }, []);

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
        <table>
          <tbody className={classes.cardTable}>
            <tr>
              <td className={classes.tableCell}>Profile Owner:</td>
              <td className={classes.tableCellValue}>{popl.profileOwner}</td>
            </tr>
            <tr>
              <td className={classes.tableCell}>Nickname:</td>
              <td className={classes.tableCellValue}>{popl.nickname}</td>
            </tr>
            <tr>
              <td className={classes.tableCell}>Activated:</td>
              <td>{dateFormat(popl.activationDate, "withTime")}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={classes.poplPagePoplCardButtonsContainer}>
        <Button
          variant="outlined"
          size="small"
          color="primary"
          startIcon={<EqualizerIcon />}
          className={classes.button}
          onClick={() => history.push("/analytics", { poplName: popl.name })}
        >
          Analytics
        </Button>
        <div className={classes.popsCountNumber}>
          <span>Pops: </span>
          {popsCount || <Loader styles={{
            size: 5, width: 20, height: 20, marginLeft: 10,
          }} />
          }
        </div>
        {/* <Typography variant='subtitle1'>Pops: {popsCount}</Typography> */}
      </div>
    </>
  );
}

export default PoplCard;
