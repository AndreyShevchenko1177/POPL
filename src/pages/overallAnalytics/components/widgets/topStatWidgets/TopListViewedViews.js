/* eslint-disable import/order */
/* eslint-disable import/no-webpack-loader-syntax */
import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import moment from "moment";
import { Tooltip } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../../../../../components/Loader";
import useStyles from "../styles";
import icons from "../../../../profiles/components/profilelsIcons/icons";
import worker from "workerize-loader!../../../../../worker";

function TopListViewedProfiles({ profilesData, dateRange }) {
  const classes = useStyles();
  const location = useLocation();
  const [data, setData] = useState(null);
  const refProfiles = useRef(null);
  const [isWorkerRunning, setIsWorkerRunning] = useState(false);

  const viewsBottom = useSelector(({ realTimeAnalytics }) => realTimeAnalytics.viewsBottom.data);

  const getScrollValue = (v) => () => v; // with closure

  useEffect(() => {
    if (refProfiles?.current) {
      const main = document.querySelector("#main");
      const getScrollYValue = getScrollValue((window.scrollY));
      refProfiles?.current?.scrollIntoView(false);
      main.scrollTo({ top: getScrollYValue() });
    }
  }, [data]);

  useEffect(() => {
    if (profilesData && viewsBottom && dateRange) {
      // sorting calendar dates, cause sometimes more recent date is in the beggining of array
      dateRange.sort((a, b) => moment(a).format("x") - moment(b).format("x"));

      let workerInstance = worker();

      setIsWorkerRunning(true);
      workerInstance.topViewedViews(JSON.stringify({ profilesData, viewsBottom, dateRange }))
        .then((result) => {
          setData(result);
          setIsWorkerRunning(false);
        });
    }
  }, [viewsBottom, profilesData, dateRange]);

  return (
    <>
      {data && !isWorkerRunning
        ? <div className={classes.tableBody}>
          {data
            .sort((a, b) => b.value - a.value)
            .map(({
              name, value, linkId, linkValue,
            }, key) => (
              <div className={clsx(classes.tableRow, { [classes.activeTableRow]: location.state?.name === name }) } key={key} ref={location.state?.name === name ? refProfiles : null}>
                <div className={classes.tableCellRank }>{key + 1}</div>
                <div className={clsx(classes.tableCellName) }>{name}</div>
                <div className={clsx(classes.tableCellValue)}>
                  {value}
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

export default TopListViewedProfiles;
