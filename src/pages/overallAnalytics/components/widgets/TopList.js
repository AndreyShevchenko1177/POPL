import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Loader from "../../../../components/Loader";
import useStyles from "./styles";

function TopList({ data, refPopped }) {
  const classes = useStyles();
  const location = useLocation();

  useEffect(() => {
    refPopped?.current?.scrollIntoView();
  }, [data]);

  return (
    <>
      {data
        ? <div className={classes.tableBody}>
          {data.map((item, key) => (
            <div className={classes.tableRow } key={key} ref={location.state?.name ? refPopped : null}>
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
