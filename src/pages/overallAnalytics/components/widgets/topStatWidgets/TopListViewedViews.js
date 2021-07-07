/* eslint-disable import/order */
/* eslint-disable import/no-webpack-loader-syntax */
import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import moment from "moment";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../../../../components/Loader";
import useStyles from "../styles";
import worker from "workerize-loader!../../../../../worker";
import { cacheTopViewedAccountsAction } from "../../../store/actions";

function TopListViewedProfiles({ profilesData, dateRange }) {
  const classes = useStyles();
  const location = useLocation();
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const refProfiles = useRef(null);
  const [isWorkerRunning, setIsWorkerRunning] = useState(false);

  const checkboxes = useSelector(({ realTimeAnalytics }) => realTimeAnalytics.checkBoxData);
  const viewsBottom = useSelector(({ realTimeAnalytics }) => realTimeAnalytics.viewsBottom.data);
  const viwedAccountsCache = useSelector(({ realTimeAnalytics }) => realTimeAnalytics.topViewedAccountsCache);
  const companyInfo = useSelector(({ generalSettingsReducer }) => generalSettingsReducer.companyInfo.data);

  const selectedProfiles = Object.keys(checkboxes).filter((el) => checkboxes[el]).map((el) => Number(el));
  const isSelected = Object.values(checkboxes).includes(true);
  const getScrollValue = (v) => () => v; // with closure

  useEffect(() => {
    if (refProfiles?.current) {
      const main = document.querySelector("#main");
      const getScrollYValue = getScrollValue((window.scrollY));
      refProfiles?.current?.scrollIntoView(true);
      main.scrollTo({ top: getScrollYValue() });
    }
  }, [data]);

  useEffect(() => {
    if (!viewsBottom) setData(null); // when clicking refresh button settings to null to show spinner
    if (!data && viwedAccountsCache) return setData(viwedAccountsCache); // for initial render checking cache and setting if it's available
    if (profilesData && viewsBottom && dateRange && companyInfo) {
      // sorting calendar dates, cause sometimes more recent date is in the beggining of array
      dateRange.sort((a, b) => moment(a).format("x") - moment(b).format("x"));

      let workerInstance = worker();
      setIsWorkerRunning(true);
      workerInstance.topViewedViews(JSON.stringify({
        profilesData: isSelected ? profilesData.filter((el) => selectedProfiles.includes(Number(el.id))) : profilesData, viewsBottom, dateRange, companyInfo,
      }))
        .then((result) => {
          if (location.pathname !== window.location.pathname) return;
          if (!data && !location.state?.id && !location.state?.poplName) dispatch(cacheTopViewedAccountsAction(result)); // setting cache just for initial render and for non popl or accounts level
          setData(result);
          setIsWorkerRunning(false);
        });
    }
  }, [viewsBottom, profilesData, dateRange, companyInfo, checkboxes.profiles]);

  return (
    <>
      {data && !isWorkerRunning
        ? <div className={classes.tableBody}>
          {data.length ? data
            .sort((a, b) => b.value - a.value)
            .map(({
              name, value, image, id,
            }, key) => (
              <div className={clsx(classes.tableRow, { [classes.activeTableRow]: Object.keys(checkboxes.profiles).filter((el) => checkboxes.profiles[el]).includes(String(id)) })} key={key} ref={Object.keys(checkboxes.profiles).filter((el) => checkboxes.profiles[el]).includes(Number(id)) ? refProfiles : null}>
                <div className={classes.tableCellRank }>{key + 1}</div>
                <div className={clsx(classes.tableCellName) }>
                  <div className={classes.topViewedViewsImageContainer}>
                    {image
                      ? <img alt='avatar' src={image} />
                      : <div></div>
                    }
                  </div>
                  <div>{name || <i>No name</i>}</div>
                </div>
                <div className={clsx(classes.tableCellValue)}>
                  {value}
                </div>
              </div>
            ))
            : <div className={clsx(classes.noDataText, classes.noDataTextWidgets)}>
                No active devices for this account
            </div>}
        </div>
        : <Loader containerStyles={{
          width: "40px", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
        }} />
      }
    </>
  );
}

export default TopListViewedProfiles;
