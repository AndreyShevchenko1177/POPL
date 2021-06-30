/* eslint-disable no-return-assign */
/* eslint-disable guard-for-in */
import React, {
  useEffect, useState, useRef, memo,
} from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CloseIcon from "@material-ui/icons/Close";
import { Typography, Button } from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import moment from "moment";
import { Line } from "react-chartjs-2";
import clsx from "clsx";
import useStyles from "./styles/styles";
import DatePicker from "../../../../components/DatePicker";
import chartOptions, { chartProfileOptions, colors } from "./chartOptions";
import Loader from "../../../../components/Loader";
import {
  getMothName, getMonth, getDay, getYear,
} from "../../../../utils/dates";
import { clearChecboxAction } from "../../store/actions";
import { getId } from "../../../../utils/uniqueId";
import StatisticItem from "../topStatistics/statisticItem";
import kpisConfig from "./kpisConfig";
import CustomSelect from "../../../../components/customSelect";
import { filterConfig } from "./filterConfig";
import { isSafari } from "../../../../constants";
import SvgMaker from "../../../../components/svgMaker";

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
  isChartsDataCalculating,
  checkboxes,
  filterValue,
  setFilterValue,
  popsPercentageData,
  isAllTimeData,
  handleRefresh,
}) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const chartRef = useRef();
  const containerLineRef = useRef();
  const [chartData, setChartData] = useState();
  const linkTaps = useSelector(({ realTimeAnalytics }) => realTimeAnalytics.linkTapsBottom.data);
  const linkTapsFetching = useSelector(({ realTimeAnalytics }) => realTimeAnalytics.linkTapsBottom.isFetching);
  const viewsFetching = useSelector(({ realTimeAnalytics }) => realTimeAnalytics.viewsBottom.isFetching);
  const [kpisData, setKpisData] = useState({
    linkTaps: 0,
    views: 0,
    ctr: 0,
    viewsHistory: 0,
    linkTapsHistory: 0,
  });
  const [openProfileSelect, setOpenProfileSelect] = useState({
    filter: { open: false, component: "" },
    count: { open: false, component: "" },
  });
  const dispatch = useDispatch();

  const handleChangeCountFilter = (event) => {
    if (Number(event.target.value) > 10) return;
    setProfileCountFilter((pc) => ({ ...pc, changeByTap: event.target.value }));
  };

  const handleChangeInputFilter = (event, val, item) => {
    setFilterValue(val);
  };

  const clearFilterInput = (name) => {
    // showAll();
    history.push("/analytics");
    handleShowAllStat();
    setFilterValue("");
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
    <div class="legendItem">
      <div>
        <div style="background-color: ${borderColor};">
      </div>
        <hr style="background-color: ${borderColor};">
      </div>
    ${`<span class="label">${label || "No name"} (${data.reduce((sum, cur) => sum += cur, 0)})</span>`}
    </div>
    `).join("");
  };

  useEffect(() => {
    if (history.location.state?.name) {
      setFilterValue(history.location.state?.name);
    }
  }, []);

  useEffect(() => {
    if (!openProfileSelect.count.open && !profileCountFilter.changeByTap) {
      setProfileCountFilter({ changeByTap: "", changeByKey: "" });
    }
  }, [openProfileSelect.count.open]);

  useEffect(() => {
    if (data) {
      if (data.isProfile) {
        const labels = [];
        let options = { ...chartProfileOptions };
        data.labels.forEach((value) => {
          if (isSafari) {
            const safariValues = value.split("-").join("/");
            return labels.push(`${getMothName(getMonth(safariValues))} ${getDay(safariValues)} ${dataType === "allData" ? getYear(safariValues) : ""}`);
          }
          labels.push(`${getMothName(getMonth(value))} ${getDay(value)} ${dataType === "allData" ? getYear(value) : ""}`);
        });
        options.data.datasets = [];
        data.data.forEach(({ name, dateValues }, i) => {
          options.data.datasets[i] = {
            data: data.labels.map((date) => dateValues[date]),
            pointRadius: dataType === "allData" ? 0 : 3,
            label: name,
            lineTension: 0.1,
            backgroundColor: "rgba(0, 0, 0, 0)",
            borderWidth: 3,
            borderColor: colors[i],
            maxBarThickness: 50,
            fill: true,
          };
        });
        options.data.labels = labels;
        setChartData({
          data: { ...options.data },
          options: {
            ...options.options,
            legendCallback: (chart) => renderLegend(chart),
            scales: {
              ...options.scales,
              xAxes: [{ ...options.options.scales.xAxes[0], offset: options.data.datasets[0].data.length === 1 }],
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
                ticks: {
                  max: (function () {
                    Math.max(...this.data.datasets.reduce((acc, { data }) => [...acc, ...data], []));
                  }).bind(options)(),
                  min: 0,
                },
              }],
            },
          },
        });
      } else {
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
              xAxes: [{ ...chartOptions.options.scales.xAxes[0], offset: chartOptions.data.datasets[0].data.length === 1 }],
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
                ticks: {
                  max: (function () {
                    Math.max(...this.data.datasets.reduce((acc, { data }) => [...acc, ...data], []));
                  }).bind(chartOptions)(),
                  min: 0,
                },
              }],
            },
          },
        });
      }
    } else {
      setChartData(undefined);
    }
  }, [data]);

  useEffect(() => {
    const legend = document.querySelector("#lineChart");
    if (chartData?.data?.datasets[0]?.data?.filter((v) => v).length === 0) {
      if (legend) {
        legend.style.display = "none";
      }
    }
    if (chartRef.current?.chartInstance) {
      legend.style.display = "flex";
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
    let linkTapsHistory = []; // link taps for previous period
    let viewsHistory = []; // views for previous period
    let daysDiff; // current range days difference
    if (moment(calendar.dateRange[0]).format("LL") === moment(calendar.dateRange[1]).format("LL")) { // if checked one date in picker
      daysDiff = 1;
    } else {
      daysDiff = moment(calendar.dateRange[0]).diff(moment(calendar.dateRange[1]), "days");
    }
    const newRange = [moment(calendar.dateRange[0]).subtract(Math.abs(daysDiff), "days"), moment(calendar.dateRange[1]).subtract(Math.abs(daysDiff), "days")];
    if (dataType === "allData") {
      return setKpisData({
        ...kpisData, views: views?.length, linkTaps: linkTaps?.length,
      });
    }
    if (linkTaps && views) {
      let linkTapsData = linkTaps;

      // if individual profile level filtering linkTaps by profile id
      if (profileLevelId) linkTapsData = linkTapsData.filter((linkTap) => linkTap.pid == profileLevelId);
      const selectedProfiles = Object.keys(checkboxes).filter((el) => checkboxes[el]);
      const isSelected = Object.values(checkboxes).includes(true);
      if (moment(calendar.dateRange[0]).format("x") === moment(calendar.dateRange[1]).format("x")) {
        if (isSelected) {
          linkTapsResult = linkTapsData.filter((link) => moment(link.event_at).format("LL") === moment(calendar.dateRange[0]).format("LL") && selectedProfiles.includes(link.pid));
          viewResult = views.filter((view) => moment(view[2]).format("LL") === moment(calendar.dateRange[0]).format("LL") && selectedProfiles.includes(view[0]));
          linkTapsHistory = linkTapsData.filter((link) => moment(link.event_at).format("LL") === newRange[0].format("LL") && selectedProfiles.includes(link.pid));
          viewsHistory = views.filter((view) => moment(view[2]).format("LL") === newRange[0].format("LL") && selectedProfiles.includes(view[0]));
        } else {
          linkTapsResult = linkTapsData.filter((link) => moment(link.event_at).format("LL") === moment(calendar.dateRange[0]).format("LL"));
          viewResult = views.filter((view) => moment(view[2]).format("LL") === moment(calendar.dateRange[0]).format("LL"));
          linkTapsHistory = linkTapsData.filter((link) => moment(link.event_at).format("LL") === newRange[0].format("LL"));
          viewsHistory = views.filter((view) => moment(view[2]).format("LL") === newRange[0].format("LL"));
        }
      } else {
        linkTapsResult = linkTapsData.filter((link) => {
          const linkDate = moment(link.event_at).format("x");
          if (isSelected) {
            // for percentages
            if ((linkDate >= newRange[0].format("x")) && (linkDate <= newRange[1].format("x") && selectedProfiles.includes(link.pid))) {
              linkTapsHistory.push(link);
            }
            return (linkDate >= moment(calendar.dateRange[0]).format("x")) && (linkDate <= moment(calendar.dateRange[1]).format("x") && selectedProfiles.includes(link.pid));
          }
          // for percentages
          if ((linkDate >= newRange[0].format("x")) && (linkDate <= newRange[1].format("x"))) {
            linkTapsHistory.push(link);
          }
          return (linkDate >= moment(calendar.dateRange[0]).format("x")) && (linkDate <= moment(calendar.dateRange[1]).format("x"));
        });
        viewResult = views.filter((view) => {
          const viewsDate = moment(view[2]).format("x");
          if (isSelected) {
            // for percentages
            if ((viewsDate >= newRange[0].format("x")) && (viewsDate <= newRange[1].format("x") && selectedProfiles.includes(view[0]))) {
              viewsHistory.push(view);
            }
            return (viewsDate >= moment(calendar.dateRange[0]).format("x")) && (viewsDate <= moment(calendar.dateRange[1]).format("x") && selectedProfiles.includes(view[0]));
          }
          // for percentages
          if ((viewsDate >= newRange[0].format("x")) && (viewsDate <= newRange[1].format("x"))) {
            viewsHistory.push(view);
          }
          return (viewsDate >= moment(calendar.dateRange[0]).format("x")) && (viewsDate <= moment(calendar.dateRange[1]).format("x"));
        });
      }
    }

    if (linkTapsResult && viewResult) {
      setKpisData({
        ...kpisData, views: viewResult.length, linkTaps: linkTapsResult.length, viewsHistory: viewsHistory.length, linkTapsHistory: linkTapsHistory.length, allData: false,
      });
    }
  }, [linkTaps, views, calendar.dateRange, location, checkboxes]);

  calendar.dateRange.sort((a, b) => moment(a).format("x") - moment(b).format("x"));

  return (
    <div className={classes["network-container"]}>
      <div className={classes["network-container__header"]}>
        {/* <div className={classes["network-container__title"]}>
          <Typography variant="h5" classes={{ h5: classes.text }}>
            Pops Over Time
          </Typography>
        </div> */}
        <div className={classes.refreshButtonContainer}>
          <Button
            variant='contained'
            color='primary'
            classes={{ root: classes.actionButton, iconSizeMedium: classes.addIcon }}
            onClick={handleRefresh}
            endIcon={<SvgMaker name='circleArrow' width={20} height={20} fill="#ffffff" />}
            name='filter'
          >
              Update
          </Button>
        </div>
        <div className={classes.filterContainer}>
          { Object.values(checkboxes).includes(true)
            && <div className={clsx(classes.filterText, "overallanalytics-page")}>
              <span style={{ whiteSpace: "nowrap" }}>
                <i>{Object.values(checkboxes).filter((el) => !!el).length > 1 ? `${Object.values(checkboxes).filter((el) => !!el).length} accounts` : `${1} account`}</i>
              </span>
              <CloseIcon style={{
                cursor: "pointer", color: "#666666", fontSize: 20, marginLeft: 5,
              }} onClick={() => dispatch(clearChecboxAction())} />
            </div>
          }
          {/* {profilesData && profilesData.some((item) => item.id === (location.state?.profilesData?.id || location.state?.id)) && <div className={clsx(classes.filterText, "overallanalytics-page")}>
            <span style={{ whiteSpace: "nowrap" }}>
              <i>{location.state?.profilesData?.name || location.state?.name}</i>
            </span>
            <CloseIcon style={{
              cursor: "pointer", color: "#666666", fontSize: 20, marginLeft: 5,
            }} onClick={clearFilterInput} />
          </div>} */}
          {/* <div className={classes.buttonWrapper}>
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
              Number of top Accounts
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
          </div> */}
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
              customState={{ profileCountFilter, setProfileCountFilter }}
              events={{
                handleChange: handleChangeInputFilter, hideSelectHandler: setOpenProfileSelect, clearInput: clearFilterInput,
              }}
              filterValue={filterValue}
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
        <div className={classes["network-container__title"]}>
          <Typography variant="h5" classes={{ h5: classes.text }}>
            Pops Over Time
          </Typography>
        </div>
        <div className={classes["network-container__line"]} ref={containerLineRef}>
          <div id='lineChart' ></div>
          {chartData === undefined || isChartsDataCalculating
            ? <Loader
              styles={{ position: "absolute", top: "50%", left: "50%" }}
            />
            : <Line
              ref={chartRef} datasetKeyProvider={() => getId(12, "123456789")}
              options={chartData?.options}
              data={chartData?.data}
            />
          }
        </div>
        <div className={classes.bottomKpisContainer}>
          {chartData?.data?.datasets[0]?.data && kpisConfig.map((item) => {
            let isFetched = false;
            if (item.id === "popsCount") {
              const isSelected = Object.values(checkboxes).includes(true);
              item.value = !isSelected
                ? [...chartData?.data?.datasets].slice(1).reduce((acc, value) => acc += value.data.reduce((s, c) => s += c, 0), 0) || ""
                : chartData?.data?.datasets.reduce((acc, value) => acc += value.data.reduce((s, c) => s += c, 0), 0) || "";
              if (popsPercentageData && !isAllTimeData) {
                const popsCountPrevPeriod = Object.values(popsPercentageData.allPops).reduce((acc, value) => acc += value, 0);
                if (popsCountPrevPeriod === 0) item.percentage = 0;
                else item.percentage = ((item.value - popsCountPrevPeriod) / popsCountPrevPeriod * 100).toFixed(1);
              } else item.percentage = 0; // if all time data setting 0 not to display it at all
            }

            if (item.id === "linkTaps") {
              if (poplLevel) {
                item.value = "";
              } else {
                item.value = kpisData.linkTaps || "";
                if (!isAllTimeData) {
                  item.percentage = ((kpisData.linkTaps - kpisData.linkTapsHistory) / kpisData.linkTapsHistory * 100).toFixed(1);
                } else item.percentage = 0; // if all time data setting 0 not to display it at all
              }
              isFetched = linkTapsFetching;
            }

            if (item.id === "views") {
              if (poplLevel) {
                item.value = "";
              } else {
                item.value = kpisData.views || "";
                if (!isAllTimeData) {
                  item.percentage = ((kpisData.views - kpisData.viewsHistory) / kpisData.viewsHistory * 100).toFixed(1);
                } else item.percentage = 0; // if all time data setting 0 not to display it at all
              }
              isFetched = viewsFetching;
            }

            if (item.id === "ctr") {
              if (poplLevel) {
                item.value = "";
              } else {
                item.value = kpisData.linkTaps && kpisData.views ? `${((kpisData.linkTaps / kpisData.views) * 100).toFixed(1)}` : "";
                if (!isAllTimeData) {
                  item.percentage = item.value
                    ? ((((kpisData.linkTaps / kpisData.views) * 100) - ((kpisData.linkTapsHistory / kpisData.viewsHistory) * 100)) / ((kpisData.linkTapsHistory / kpisData.viewsHistory) * 100) * 100).toFixed(1)
                    : "";
                } else item.percentage = 0; // if all time data setting 0 not to display it at all
              }
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
  if (prevProps.data !== nextProps.data) {
    return false;
  }
  if (prevProps.isChartsDataCalculating !== nextProps.isChartsDataCalculating) {
    return false;
  }
  return true;
};
export default memo(NetworkActivity);
