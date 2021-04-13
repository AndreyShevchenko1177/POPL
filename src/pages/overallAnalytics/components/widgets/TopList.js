import React, { useEffect } from "react";
import clsx from "clsx";
import { Tooltip } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import Loader from "../../../../components/Loader";
import useStyles from "./styles";
import icons from "../../../profiles/components/profilelsIcons/icons";

function TopList({ data, refPopped, isLinks }) {
  const classes = useStyles();
  const location = useLocation();

  const getScrollValue = (v) => () => v; // with closure

  useEffect(() => {
    if (refPopped?.current) {
      const getScrollYValue = getScrollValue((window.scrollY));
      refPopped?.current?.scrollIntoView(false);
      window.scrollTo({ top: getScrollYValue() });
    }
  }, [data]);

  return (
    <>
      {data
        ? <div className={classes.tableBody}>
          {data.map(({
            name, value, linkId, linkValue,
          }, key) => (
            <div className={clsx(classes.tableRow, { [classes.activeTableRow]: location.state?.name === name }) } key={key} ref={location.state?.name === name ? refPopped : null}>
              <div className={classes.tableCellRank }>{key + 1}</div>
              <div className={clsx(classes.tableCellName, isLinks && classes.tableCellNameLink) }>{name}</div>
              <div className={clsx(classes.tableCellValue, isLinks && classes.tableCellValueLink)}>{isLinks
                ? <Tooltip PopperProps={{ disablePortal: true }} title={icons[linkId].path + linkValue} placement="top"><a className={classes.linkLink} href={icons[linkId].path + linkValue}>{icons[linkId].text}</a></Tooltip>
                : value}
              </div>
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
