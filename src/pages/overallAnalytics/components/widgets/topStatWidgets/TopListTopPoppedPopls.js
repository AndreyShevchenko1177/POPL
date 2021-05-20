import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import moment from "moment";
import { Tooltip } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../../../../../components/Loader";
import useStyles from "../styles";
import icons from "../../../../profiles/components/profilelsIcons/icons";
import { filterPops } from "../../../../../utils";

function TopListPoppedPopls({ profilesData, dateRange }) {
  const classes = useStyles();
  const location = useLocation();
  const [data, setData] = useState(null);
  const refPopls = useRef(null);

  const totalPopls = useSelector(({ poplsReducer }) => poplsReducer.allPopls.data);
  const totalPops = useSelector(
    ({ realTimeAnalytics }) => realTimeAnalytics.allPopsNew.data?.allPops,
  );

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
    if (totalPopls && totalPops && dateRange) {
      setTimeout(() => {
        const topPoppedPopls = {};
        totalPopls.forEach((popl) => topPoppedPopls[popl.name] = []);

        totalPops.forEach((pop) => {
          const popDate = moment(pop[2]).format("x");
          const name = filterPops.slicePoplNameFromPop(pop[1]);
          if (name && name in topPoppedPopls) {
            if ((popDate > moment(dateRange[0]).format("x")) && (popDate < moment(dateRange[1]).format("x"))) topPoppedPopls[name].push(pop);
          }
        });
        const sortedPoppedPopls = Object.keys(topPoppedPopls)
          .map((key) => ({ [key]: topPoppedPopls[key] }))
          .sort((a, b) => Object.values(b)[0].length - Object.values(a)[0].length);

        const result = [];
        sortedPoppedPopls.forEach((item) => {
          result.push({ name: Object.keys(item)[0], value: Object.values(item)[0].length });
        });
        setData(result);
      }, 6000);
    }
  }, [totalPopls, totalPops, location, dateRange]);

  return (
    <>
      {data
        ? <div className={classes.tableBody}>
          {data
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
            ))}
        </div>
        : <Loader containerStyles={{
          width: "40px", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
        }} />
      }
    </>
  );
}

export default TopListPoppedPopls;
