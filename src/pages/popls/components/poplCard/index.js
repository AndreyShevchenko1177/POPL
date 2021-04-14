import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Checkbox, Button,
} from "@material-ui/core";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import useStyles from "./styles/styles";
import userIcon from "../../../../assets/images/poplIcon.png";
import DragDots from "../../../../components/dragDots";
import { dateFormat, filterPops } from "../../../../utils";
import Loader from "../../../../components/Loader";

function PoplCard({
  popl, allPops, poplsCheck, customId, checkboxes,
}) {
  const classes = useStyles();
  const history = useHistory();
  const [popsCount, setPopsCount] = useState();

  useEffect(() => {
    if (allPops) setPopsCount(` ${allPops.filter((pop) => filterPops.slicePoplNameFromPop(pop[1]) === popl.name).length}`);
  }, [allPops]);

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
          onClick={() => history.push("/analytics", { name: popl.name, poplName: popl.name })}
        >
          Analytics
        </Button>
        <div className={classes.popsCountNumber}>
          <span>
            {
              popsCount
              || <Loader
                styles={{
                  size: 5, width: 20, height: 20, marginLeft: 10,
                }}
              />
            }
            Pops
          </span>
        </div>
        {/* <Typography variant='subtitle1'>Pops: {popsCount}</Typography> */}
      </div>
    </>
  );
}

export default PoplCard;
