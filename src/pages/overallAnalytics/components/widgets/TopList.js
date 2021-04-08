import React from "react";
import Loader from "../../../../components/Loader";
import useStyles from "./styles";

function TopList({ data }) {
  const classes = useStyles();

  return (
    <>
      {data
        ? <div className={classes.tableBody}>
          {data.map((item, key) => (
            <div className={classes.tableRow } key={key}>
              <div className={classes.tableCellRank }>{key + 1}</div>
              <div className={classes.tableCellName }>{item.name}</div>
              <div className={classes.tableCellValue }>{item.value}</div>
            </div>
          ))}
        </div>
        : <Loader containerStyles={{
          width: "40px", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
        }} />
      }
    </>
  );
}

export default TopList;
