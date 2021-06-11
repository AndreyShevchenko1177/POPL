/* eslint-disable no-return-assign */
/* eslint-disable guard-for-in */
import React, {
  useEffect, useState, useRef, memo,
} from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@material-ui/icons/Close";
import { Typography, Button, Paper } from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import moment from "moment";
import { Line } from "react-chartjs-2";
import clsx from "clsx";
import useStyles from "./styles/styles";
import DatePicker from "../../../../components/DatePicker";
import chartOptions, { colors } from "./chartOptions";
import Loader from "../../../../components/Loader";
import {
  getMothName, getMonth, getDay, getYear,
} from "../../../../utils/dates";
import { getId } from "../../../../utils/uniqueId";
import StatisticItem from "../topStatistics/statisticItem";
import kpisConfig from "./kpisConfig";
import CustomSelect from "../../../../components/customSelect";
import { filterConfig, profileCountConfig } from "./filterConfig";
import { isSafari } from "../../../../constants";

function NetworkActivity({
  data,
  calendar,
  setCalendar,
  setDate,
  selectOption,
  options,
  dataType,
  views,
  poplLevel,
  profileLevelId,
  profilesData,
  handleShowAllStat,
  profileCountFilter,
  setProfileCountFilter,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const chartRef = useRef();
  const [chartData, setChartData] = useState();
  const linkTaps = useSelector(({ realTimeAnalytics }) => realTimeAnalytics.linkTapsBottom.data);
  const linkTapsFetching = useSelector(({ realTimeAnalytics }) => realTimeAnalytics.linkTapsBottom.isFetching);
  // const views = useSelector(({ realTimeAnalytics }) => realTimeAnalytics.viewsBottom.data);
  const viewsFetching = useSelector(({ realTimeAnalytics }) => realTimeAnalytics.viewsBottom.isFetching);
  const [kpisData, setKpisData] = useState({
    linkTaps: 0,
    views: 0,
    ctr: 0,
  });
  const [openProfileSelect, setOpenProfileSelect] = useState({
    filter: { open: false, component: "" },
    count: { open: false, component: "" },
  });

  const handleChangeCountFilter = (event) => {
    setProfileCountFilter((pc) => ({ ...pc, changeByTap: event.target.value }));
  };

  const handleChangeInputFilter = (event, val, item) => {
    console.log(val, item);
  };

  const clearFilterInput = (name) => {
    // showAll();
    history.push("/analytics");
    handleShowAllStat();
  };

  const filter = (value, name) => {
    switch (name) {
    case "filter": {
      if (openProfileSelect[name].component === "select" && isSafari) {
        return setOpenProfileSelect({ ...openProfileSelect, [name]: { open: false, component: "" } });
      }
      return setOpenProfileSelect({ ...openProfileSelect, [name]: { open: !openProfileSelect[name].open, component: "searchStripe" } });
    }
    case "count": {
      if (openProfileSelect[name].component === "select" && isSafari) {
        return setOpenProfileSelect({ ...openProfileSelect, [name]: { open: false, component: "" } });
      }
      return setOpenProfileSelect({ ...openProfileSelect, [name]: { open: !openProfileSelect[name].open, component: "searchStripe" } });
    }
    default: {
      return "unknown";
    }
    }
  };

  const handleClickLabel = (e, index) => {
    const ctx = chartRef.current.chartInstance;
    const meta = [];
    ctx.data.datasets.forEach((dataset, index) => {
      meta.push(ctx.getDatasetMeta(index));
    });
    const label1Length = ctx.data.datasets.length;

    if (label1Length > index) {
      meta[index].hidden = !meta[index].hidden;
    } else {
      meta[index - label1Length].hidden = !meta[
        index - label1Length
      ].hidden;
    }
    if (e.currentTarget.lastElementChild.classList.contains("disable-legend")) {
      e.currentTarget.lastElementChild.classList.remove("disable-legend");
      [...e.currentTarget.children[0].children].forEach((el) => el.classList.remove("disable-bg"));
      e.currentTarget.children[1].classList.remove("disable");
    } else {
      e.currentTarget.lastElementChild.classList.add("disable-legend");
      [...e.currentTarget.children[0].children].forEach((el) => el.classList.add("disable-bg"));
      e.currentTarget.children[1].classList.add("disable");
    }
    ctx.update();
  };

  const renderLegend = (chart) => {
    const { data } = chart;
    return data.datasets.map(({ label, borderColor, data }, i) => `
    <div class="legendItem" style="display: flex; align-items: center; height: 30px; max-width: 250px; cursor: pointer; margin-right: 30px">
      <div style="position: relative; width: 75px; height: 30px; margin-right: 10px">
        <div style="position: absolute; width: 16px; height: 16px; background-color: ${borderColor}; border-radius: 50%; top: 50%; left: 50%; transform: translate(-50%, -50%)">
      </div>
        <hr style="width: 75px; position: absolute; top: 50%; background-color: ${borderColor}; transform: translateY(-50%); height: 4px; border: none; margin: 0; border-radius: 5px">
      </div>
    ${label && `<span class="label" style="line-height: 30px;">${label} (${data.reduce((sum, cur) => sum += cur, 0)})</span>`}
    </div>
    `).join("");
  };

  useEffect(() => {
    if (!openProfileSelect.count.open && !profileCountFilter.changeByTap) {
      setProfileCountFilter({ changeByTap: 0, changeByKey: 0 });
    }
  }, [openProfileSelect.count.open]);

  useEffect(() => {
    if (data) {
      const labels = [];
      let newData = Object.keys(data).map((el) => data[el]);
      // to set color for total popls line. it takes from specific array index
      newData = [...newData.splice(2, 1), ...newData];
      newData.forEach((values, i) => {
        if (Array.isArray(values)) {
          if (isSafari) {
            const safariValues = values.map((el) => el.split("-").join("/"));
            return safariValues.forEach((el) => labels.push(`${getMothName(getMonth(el))} ${getDay(el)} ${dataType === "allData" ? getYear(el) : ""}`));
          }
          values.forEach((el) => labels.push(`${getMothName(getMonth(el))} ${getDay(el)} ${dataType === "allData" ? getYear(el) : ""}`));
          return;
        }
        chartOptions.data.datasets[i].data = [...Object.values(values)];
        chartOptions.data.datasets[i].pointRadius = dataType === "allData" ? 0 : 3;
        // chartOptions.data.datasets[i].borderColor = [...Object.values(values)].every((el) => !el) ? "rgba(0, 0, 0, 0)" : colors[i];
      });
      chartOptions.data.labels = labels.sort((a, b) => new Date(a) - new Date(b));
      setChartData({
        data: { ...chartOptions.data },
        options: {
          ...chartOptions.options,
          legendCallback: (chart) => renderLegend(chart),
          scales: {
            ...chartOptions.scales,
            xAxes: [{ ...chartOptions.options.scales.xAxes[0], offset: chartOptions.data.datasets[0].data.length === 2 }],
            yAxes: [{
              afterTickToLabelConversion(q) {
                for (let tick in q.ticks) {
                  const part = q.ticks[tick].split(".");
                  if (part.length > 1) {
                    if (part[1] > 0 || q.ticks[tick] < 1) {
                      q.ticks[tick] = "";
                    } else {
                      q.ticks[tick] = Number(q.ticks[tick]).toFixed(0);
                    }
                  }
                }
                q.ticks[q.ticks.length - 1] = "0";
              },
            }],
          },
        },
      });
    } else {
      setChartData(undefined);
    }
  }, [data]);

  useEffect(() => {
    if (chartRef.current?.chartInstance) {
      document.querySelector("#lineChart").innerHTML = chartRef.current?.chartInstance?.generateLegend();
      document.querySelectorAll(".legendItem").forEach((item, index) => {
        if (item.children[1].className.includes("disabled")) return;
        item.addEventListener("click", (e) => handleClickLabel(e, index));
      });
    }
  }, [chartData]);

  useEffect(() => {
    let linkTapsResult;
    let viewResult;
    if (dataType === "allData") {
      return setKpisData({ ...kpisData, views: views?.length, linkTaps: linkTaps?.length });
    }
    if (linkTaps) {
      let linkTapsData = linkTaps;
      // if individual profile level filtering linkTaps by profile id
      if (profileLevelId) linkTapsData = linkTapsData.filter((linkTap) => linkTap.pid == profileLevelId);

      if (moment(calendar.dateRange[0]).format("x") === moment(calendar.dateRange[1]).format("x")) {
        linkTapsResult = linkTapsData.filter((link) => moment(link.event_at).format("LL") === moment(calendar.dateRange[0]).format("LL"));
      } else {
        linkTapsResult = linkTapsData.filter((link) => {
          const linkDate = moment(link.event_at).format("x");
          return (linkDate >= moment(calendar.dateRange[0]).format("x")) && (linkDate <= moment(calendar.dateRange[1]).format("x"));
        });
      }
    }
    if (views) {
      if (moment(calendar.dateRange[0]).format("x") === moment(calendar.dateRange[1]).format("x")) {
        viewResult = views.filter((view) => moment(view[2]).format("LL") === moment(calendar.dateRange[0]).format("LL"));
      } else {
        viewResult = views.filter((view) => {
          const viewsDate = moment(view[2]).format("x");
          return (viewsDate >= moment(calendar.dateRange[0]).format("x")) && (viewsDate <= moment(calendar.dateRange[1]).format("x"));
        });
      }
    }
    if (linkTapsResult && viewResult) setKpisData({ ...kpisData, views: viewResult.length, linkTaps: linkTapsResult.length });
  }, [linkTaps, views, calendar.dateRange, location]);

  calendar.dateRange.sort((a, b) => moment(a).format("x") - moment(b).format("x"));

  return (
    <div className={classes["network-container"]}>
      <div className={classes["network-container__header"]}>
        <div className={classes["network-container__title"]}>
          <Typography variant="h5" classes={{ h5: classes.text }}>
            Pops Over Time
          </Typography>
        </div>
        <div className={classes.filterContainer}>
          { !!profileCountFilter.changeByKey
            && <div className={clsx(classes.filterText, "overallanalytics-page")}>
              <span style={{ whiteSpace: "nowrap" }}>
                <i>{profileCountFilter.changeByKey > 1 ? `${profileCountFilter.changeByKey} accounts` : `${profileCountFilter.changeByKey} account`}</i>
              </span>
              <CloseIcon style={{
                cursor: "pointer", color: "#666666", fontSize: 20, marginLeft: 5,
              }} onClick={() => setProfileCountFilter({ changeByTap: 0, changeByKey: 0 })} />
            </div>
          }
          {profilesData && profilesData.some((item) => item.id === (location.state?.profilesData?.id || location.state?.id)) && <div className={clsx(classes.filterText, "overallanalytics-page")}>
            <span style={{ whiteSpace: "nowrap" }}>
              <i>{location.state?.profilesData?.name || location.state?.name}</i>
            </span>
            <CloseIcon style={{
              cursor: "pointer", color: "#666666", fontSize: 20, marginLeft: 5,
            }} onClick={clearFilterInput} />
          </div>}
          <div className={classes.buttonWrapper}>
            <Button
              variant='contained'
              color='primary'
              disabled={!!location.state?.id}
              style={{ whiteSpace: "nowrap" }}
              classes={{ root: classes.actionButton, iconSizeMedium: classes.addIcon }}
              onClick={() => filter(true, "count")}
              endIcon={<KeyboardArrowDownIcon />}
              name='count'
            >
              Profile Count
            </Button>
            <CustomSelect
              selectName='count'
              config={profileCountConfig}
              isOpen={openProfileSelect.count.open}
              customState={{ profileCountFilter, setProfileCountFilter }}
              events={{
                handleChange: handleChangeInputFilter, hideSelectHandler: setOpenProfileSelect, clearInput: clearFilterInput, countChange: handleChangeCountFilter,
              }}
            />
          </div>
          <div className={classes.buttonWrapper}>
            <Button
              variant='contained'
              color='primary'
              classes={{ root: classes.actionButton, iconSizeMedium: classes.addIcon }}
              onClick={() => filter(true, "filter")}
              endIcon={<KeyboardArrowDownIcon />}
              name='filter'
            >
              Filter
            </Button>
            <CustomSelect
              selectName='filter'
              config={filterConfig}
              autoComleteData={profilesData}
              isOpen={openProfileSelect.filter.open}
              events={{
                handleChange: handleChangeInputFilter, hideSelectHandler: setOpenProfileSelect, clearInput: clearFilterInput,
              }}
            />
          </div>

        </div>
        <div style={{ position: "relative" }}>
          <DatePicker
            selectOption={selectOption}
            options={options}
            calendar={calendar}
            setCalendar={setCalendar}
            setDate={setDate}
          />
        </div>
      </div>
      <div className={classes["network-container__charts"]}>
        <div className={classes["network-container__line"]}>
          <div id='lineChart' ></div>
          {chartData === undefined
            ? <Loader
              styles={{ position: "absolute", top: "50%", left: "50%" }}
            />
            : <>
              {chartData?.data?.datasets[0]?.data?.filter((v) => v).length
                ? <Line
                  ref={chartRef} datasetKeyProvider={() => getId(12, "123456789")}
                  options={chartData?.options}
                  data={chartData?.data}
                />
                : <div className={classes.noDataText}>
                  No data for this period
                </div>
              }
            </>
          }
        </div>
        <div className={classes.bottomKpisContainer}>
          {chartData?.data?.datasets[0]?.data && kpisConfig.map((item) => {
            let isFetched = false;
            if (item.id === "popsCount") {
              item.value = chartData?.data?.datasets[0]?.data.reduce((acc, value) => acc += value, 0);
            }

            if (item.id === "linkTaps") {
              if (poplLevel) {
                item.value = "";
              } else item.value = kpisData.linkTaps;
              isFetched = linkTapsFetching;
            }

            if (item.id === "views") {
              if (poplLevel) {
                item.value = "";
              } else item.value = kpisData.views;
              isFetched = viewsFetching;
            }

            if (item.id === "ctr") {
              if (poplLevel) {
                item.value = "";
              } else item.value = kpisData.linkTaps && kpisData.views ? `${((kpisData.linkTaps / kpisData.views) * 100).toFixed(1)}` : "";
              isFetched = linkTapsFetching || viewsFetching;
            }
            return <React.Fragment key={item.id}>
              <StatisticItem
                count={1}
                isFetched={isFetched}
                {...item}
                styles={{
                  container: classes.bottomKpisItemContainer,
                  titleText: classes.bottomKpisTitleText,
                  itemValue: classes.bottomKpisItemValue,
                  loaderStyles: { width: 25, height: 25 },
                  percentageFontSize: 20,
                }}
              />
            </React.Fragment>;
          })}
        </div>
      </div>
    </div>
  );
}

const shallow = (prevProps, nextProps) => {
  if (prevProps.data === nextProps.data) {
    return true;
  }
  return false;
};

export default memo(NetworkActivity);
