/* eslint-disable import/no-webpack-loader-syntax */
import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import worker from "workerize-loader!../../../../../worker";
import Loader from "../../../../../components/Loader";
import useStyles from "../styles";
import { cacheMostActiveDevicesAction } from "../../../store/actions";

function TopListPoppedPopls({ profilesData, dateRange }) {
  const classes = useStyles();
  const location = useLocation();
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const refPopls = useRef(null);

  const totalPopls = useSelector(({ poplsReducer }) => poplsReducer.allPopls.data);
  const totalPops = useSelector(
    ({ realTimeAnalytics }) => realTimeAnalytics.allPopsNew.data?.allPops,
  );
  const [isWorkerRunning, setIsWorkerRunning] = useState(false);

  const checkboxes = useSelector(({ realTimeAnalytics }) => realTimeAnalytics.checkBoxData);
  const mostActiveDevicesCache = useSelector(({ realTimeAnalytics }) => realTimeAnalytics.mostActiveDevicesCache);
  const selectedProfiles = Object.keys(checkboxes.profiles).filter((el) => checkboxes.profiles[el]).map((el) => Number(el));
  const isSelected = Object.values(checkboxes.profiles).includes(true);

  const getScrollValue = (v) => () => v; // with closure

  useEffect(() => {
    if (refPopls?.current) {
      const main = document.querySelector("#main");
      const getScrollYValue = getScrollValue((window.scrollY));
      refPopls?.current?.scrollIntoView(false);
      main.scrollTo({ top: getScrollYValue() });
    }
  }, [data]);

  useEffect(() => {
    if (!totalPops) setData(null); // when clicking refresh button settings to null to show spinner
    if (!data && mostActiveDevicesCache) return setData(mostActiveDevicesCache); // for initial render checking cache and setting if it's available
    if (totalPopls && totalPops && dateRange) {
      let workerInstance = worker();
      setIsWorkerRunning(true);
      workerInstance.topPoppedPopls(JSON.stringify({
        totalPopls, totalPops, dateRange, profilesData: isSelected ? profilesData.filter((el) => selectedProfiles.includes(Number(el.id))) : null,
      }))
        .then((result) => {
          if (!data && !location.state?.id && !location.state?.poplName) dispatch(cacheMostActiveDevicesAction(result)); // setting cache just for initial render and for non popl or accounts level
          setData(result);
          setIsWorkerRunning(false);
        });
    }
  }, [totalPopls, totalPops, location, dateRange, checkboxes]);

  return (
    <>
      {data && !isWorkerRunning
        ? <div className={classes.tableBody}>
          {data.length ? data
            .sort((a, b) => b.value - a.value)
            .map(({
              name, value, linkId, linkValue,
            }, key) => (
              <div className={clsx(classes.tableRow, { [classes.activeTableRow]: location.state?.name === name }) } key={key} ref={location.state?.name === name ? refPopls : null}>
                <div className={classes.tableCellRank }>{key + 1}</div>
                <div className={clsx(classes.tableCellName) }>{name}</div>
                <div className={clsx(classes.tableCellValue)}>
                  {value}
                </div>
              </div>
            ))
            : <div className={clsx(classes.noDataText, classes.noDataTextWidgets)}>
                No top tapped links for this account
            </div>
          }
        </div>
        : <Loader containerStyles={{
          width: "40px", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
        }} />
      }
    </>
  );
}

export default TopListPoppedPopls;
