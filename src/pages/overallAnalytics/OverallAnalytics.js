/* eslint-disable import/no-webpack-loader-syntax */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import moment from "moment";
import worker from "workerize-loader!../../worker";
import NetworkActivity from "./components/timeLine";
import {
  cleanAction, mainAnalyticsAction,
} from "./store/actions";
import {
  getYear, getMonth, getDay, monthsFullName,
} from "../../utils";
import Header from "../../components/Header";
import useStyles from "./styles";
import BottomWidgets from "./components/widgets";
import { isSafari } from "../../constants";

function OverallAnalytics() {
  const dispatch = useDispatch();
  const location = useLocation();
  const classes = useStyles();
  const [options, setOption] = useState("");
  const [popsData, setPopsData] = useState(null);
  const [popsLineData, setPopsLineData] = useState(null);
  const [profileCountFilter, setProfileCountFilter] = useState({
    changeByTap: "", changeByKey: "",
  });
  const { id: userId, name } = useSelector(({ authReducer }) => authReducer.signIn.data);
  const allPopsData = useSelector(
    ({ realTimeAnalytics }) => realTimeAnalytics.allPopsNew.data,
  );
  const profilesData = useSelector(({ profilesReducer }) => profilesReducer.dataProfiles.data);
  const [chartData, setChartData] = useState({
    dohnutDirectData: null,
    dohnutPopsData: null,
    lineData: null,
    dohnutPopsByProfileData: null,
  });
  const [viewsKpis, setViewsKpis] = useState(null);
  const [saveSelected, setSaveSelected] = useState(false);
  const viewsBottom = useSelector(({ realTimeAnalytics }) => realTimeAnalytics.viewsBottom.data);

  const minTimestamp = new Date().getTime() - (86400000 * 13);
  const currentDate1 = `${monthsFullName[getMonth(minTimestamp)]} ${getDay(minTimestamp)}, ${getYear(minTimestamp)}-`;
  const currentDate2 = `${monthsFullName[getMonth(new Date())]} ${getDay(
    new Date(),
  )}, ${getYear(new Date())}`;
  const [calendar, setCalendar] = useState({
    visible: false,
    dateRange: [new Date(currentDate1.slice(0, currentDate1.length - 1)), new Date(currentDate2)],
    normalData: [currentDate1, currentDate2],
  });

  const [isChartsDataCalculating, setIsChartDataCalculating] = useState({ // when data recalculating locally running preloader
    lineChart: false,
    dohnutDirectData: false,
    dohnutPopsData: false,
    dohnutPopsByProfileData: false,
  });

  const setDate = (minDate, maxDate) => {
    setOption("");
    let minD = `${monthsFullName[getMonth(minDate)]} ${getDay(
      minDate,
    )}, ${getYear(minDate)}-`;
    let maxD = `${monthsFullName[getMonth(maxDate)]} ${getDay(
      maxDate,
    )}, ${getYear(maxDate)}`;
    const maxDateMilis = maxDate.setHours(0, 0, 0, 0);
    const minDateMilis = minDate.setHours(0, 0, 0, 0);
    const currentDateMilis = new Date(currentDate2).setHours(0, 0, 0, 0);
    if (maxDateMilis > currentDateMilis) {
      maxDate = new Date(currentDate2);
      maxD = currentDate2;
    }
    if (minDateMilis > currentDateMilis) {
      minDate = new Date(currentDate2);
      minD = currentDate2;
    }
    if (maxDateMilis < minDateMilis) { // from this condition depends order of maxDate and minDate parameters in generateDohnutChartData function
      let workerInstance = worker();

      // running preloaser for charts
      setIsChartDataCalculating({
        lineChart: true,
        dohnutDirectData: true,
        dohnutPopsData: true,
        dohnutPopsByProfileData: true,
      });

      workerInstance.generateDohnutChartData(JSON.stringify({
        popsData, isPopsData: false, minDate, maxDate,
      })).then((dohnutDirectData) => {
        setChartData((prev) => ({
          ...prev,
          dataType: "",
          dohnutDirectData,
        }));
        // stopping preloader
        setIsChartDataCalculating((prev) => ({ ...prev, dohnutDirectData: false }));
      });

      workerInstance.generateLineChartData(JSON.stringify({
        popsData, maxDate, minDate,
      })).then((lineData) => {
        setChartData((prev) => ({
          ...prev,
          lineData,
        }));
        // stopping preloader
        setIsChartDataCalculating((prev) => ({ ...prev, lineChart: false }));
      });

      workerInstance.generateDohnutPopsByProfileData(JSON.stringify({
        profileData: profilesData.map(({ id, name }) => ({ id, name })), popsData, minDate, maxDate,
      })).then((dohnutPopsByProfileData) => {
        setChartData((prev) => ({
          ...prev,
          dohnutPopsByProfileData,
        }));
        // stopping preloader
        setIsChartDataCalculating((prev) => ({ ...prev, dohnutPopsByProfileData: false }));
      });

      workerInstance.generateDohnutChartData(JSON.stringify({
        popsData, isPopsData: true, minDate, maxDate,
      })).then((dohnutPopsData) => {
        setChartData((prev) => ({
          ...prev,
          dataType: "",
          dohnutPopsData,
        }));
        // stopping preloader
        setIsChartDataCalculating((prev) => ({ ...prev, dohnutPopsData: false }));
      });

      return setCalendar({
        ...calendar,
        dateRange: [maxDate, minDate],
        normalData: [`${maxD}-`, minD.slice(0, minD.length - 1)],
        visible: false,
      });
    }

    setCalendar({
      ...calendar,
      dateRange: [minDate, maxDate],
      normalData: [minD, maxD],
      visible: false,
    });

    let workerInstance = worker();

    // running preloaser for charts
    setIsChartDataCalculating({
      lineChart: true,
      dohnutDirectData: true,
      dohnutPopsData: true,
      dohnutPopsByProfileData: true,
    });

    workerInstance.generateDohnutChartData(JSON.stringify({
      popsData, isPopsData: false, minDate, maxDate,
    })).then((dohnutDirectData) => {
      setChartData((prev) => ({
        ...prev,
        dataType: "",
        dohnutDirectData,
      }));
      // stopping preloader
      setIsChartDataCalculating((prev) => ({ ...prev, dohnutDirectData: false }));
    });

    workerInstance.generateLineChartData(JSON.stringify({
      popsData, maxDate, minDate,
    })).then((lineData) => {
      setChartData((prev) => ({
        ...prev,
        lineData,
      }));
      // stopping preloader
      setIsChartDataCalculating((prev) => ({ ...prev, lineChart: false }));
    });

    workerInstance.generateDohnutPopsByProfileData(JSON.stringify({
      profileData: profilesData.map(({ id, name }) => ({ id, name })), popsData, minDate, maxDate,
    })).then((dohnutPopsByProfileData) => {
      setChartData((prev) => ({
        ...prev,
        dohnutPopsByProfileData,
      }));
      // stopping preloader
      setIsChartDataCalculating((prev) => ({ ...prev, dohnutPopsByProfileData: false }));
    });

    workerInstance.generateDohnutChartData(JSON.stringify({
      popsData, isPopsData: true, minDate, maxDate,
    })).then((dohnutPopsData) => {
      setChartData((prev) => ({
        ...prev,
        dataType: "",
        dohnutPopsData,
      }));
      // stopping preloader
      setIsChartDataCalculating((prev) => ({ ...prev, dohnutPopsData: false }));
    });
  };

  const generateData = (dateFromRange, dateFrom, dateTo, maxD, minD) => {
    let workerInstance = worker();

    // running preloaser for charts
    setIsChartDataCalculating({
      lineChart: true,
      dohnutDirectData: true,
      dohnutPopsData: true,
      dohnutPopsByProfileData: true,
    });

    workerInstance.generateDohnutChartData(JSON.stringify({
      popsData, isPopsData: false, minDate: dateFrom, maxDate: dateTo,
    })).then((dohnutDirectData) => {
      setChartData((prev) => ({
        ...prev,
        dataType: "",
        dohnutDirectData,
      }));
      // stopping preloader
      setIsChartDataCalculating((prev) => ({ ...prev, dohnutDirectData: false }));
    });

    workerInstance.generateDohnutPopsByProfileData(JSON.stringify({
      profileData: profilesData.map(({ id, name }) => ({ id, name })), popsData, minDate: dateFrom, maxDate: dateTo,
    })).then((dohnutPopsByProfileData) => {
      setChartData((prev) => ({
        ...prev,
        dohnutPopsByProfileData,
      }));
      // stopping preloader
      setIsChartDataCalculating((prev) => ({ ...prev, dohnutPopsByProfileData: false }));
    });

    workerInstance.generateLineChartData(JSON.stringify({
      popsData, minDate: dateFrom, maxDate: dateTo,
    })).then((lineData) => {
      setChartData((prev) => ({
        ...prev,
        lineData,
      }));
      // stopping preloader
      setIsChartDataCalculating((prev) => ({ ...prev, lineChart: false }));
    });

    workerInstance.generateDohnutChartData(JSON.stringify({
      popsData, isPopsData: true, minDate: dateFrom, maxDate: dateTo,
    })).then((dohnutPopsData) => {
      setChartData((prev) => ({
        ...prev,
        dataType: "",
        dohnutPopsData,
      }));
      // stopping preloader
      setIsChartDataCalculating((prev) => ({ ...prev, dohnutPopsData: false }));
    });
    return setCalendar({
      ...calendar,
      dateRange: [dateTo, dateFromRange],
      normalData: [`${maxD}-`, minD.slice(0, minD.length - 1)],
      visible: false,
    });
  };

  const handleShowAllStat = () => {
    // dispatch(getStatisticItemsRequest(userId));
    setChartData({
      dohnutDirectData: null,
      dohnutPopsData: null,
      lineData: null,
      dohnutPopsByProfileData: null,
    });
    // dispatch(cleanAction());
    setPopsData(null);
    setSaveSelected(true);
  };

  const selectOption = (event) => {
    setOption(event.target.value);
    setCalendar({ ...calendar, visible: false });
    let workerInstance = worker();

    switch (event.target.value) {
    case "all time": {
      // running preloaser for charts
      setIsChartDataCalculating({
        lineChart: true,
        dohnutDirectData: true,
        dohnutPopsData: true,
        dohnutPopsByProfileData: true,
      });
      workerInstance.generateAllData(JSON.stringify({ popsData, isSafari })).then((result) => {
        const { data, maxDate, minDate } = JSON.parse(result);
        let minD;
        let maxD;
        if (isSafari) {
          minD = `${monthsFullName[getMonth(maxDate)]} ${getDay(
            maxDate,
          )}, ${getYear(maxDate)}-`;
          maxD = `${monthsFullName[getMonth(minDate)]} ${getDay(
            minDate,
          )}, ${getYear(minDate)}`;
        } else {
          minD = `${monthsFullName[getMonth(maxDate)]} ${getDay(
            maxDate,
          )}, ${getYear(maxDate)}-`;
          maxD = `${monthsFullName[getMonth(minDate)]} ${getDay(
            minDate,
          )}, ${getYear(minDate)}`;
        }

        setChartData((prev) => ({
          ...prev,
          lineData: data,
        }));
        // stopping preloader
        setIsChartDataCalculating((prev) => ({ ...prev, lineChart: false }));
        setCalendar({
          ...calendar,
          dateRange: [new Date(maxDate), new Date(minDate)],
          normalData: [`${maxD}-`, minD.slice(0, minD.length - 1)],
          visible: false,
        });
      });

      workerInstance.generateDohnutChartData(JSON.stringify({
        popsData, isPopsData: false, minDate: null, maxDate: null, isAllData: true,
      })).then((dohnutDirectData) => {
        setChartData((prev) => ({
          ...prev,
          dataType: "",
          dohnutDirectData,
        }));
        // stopping preloader
        setIsChartDataCalculating((prev) => ({ ...prev, dohnutDirectData: false }));
      });

      workerInstance.generateDohnutPopsByProfileData(JSON.stringify({
        profileData: profilesData.map(({ id, name }) => ({ id, name })), popsData, minDate: null, maxDate: null, isAllData: true,
      })).then((dohnutPopsByProfileData) => {
        setChartData((prev) => ({
          ...prev,
          dohnutPopsByProfileData,
        }));
        // stopping preloader
        setIsChartDataCalculating((prev) => ({ ...prev, dohnutPopsByProfileData: false }));
      });

      workerInstance.generateDohnutChartData(JSON.stringify({
        popsData, isPopsData: false, minDate: null, maxDate: null, isAllData: true,
      })).then((dohnutPopsData) => {
        setChartData((prev) => ({
          ...prev,
          dataType: "",
          dohnutPopsData,
        }));
        // stopping preloader
        setIsChartDataCalculating((prev) => ({ ...prev, dohnutPopsData: false }));
      });

      return;
    }
    case "last 7 days": {
      const dateTo = moment().toDate();
      const dateFrom = moment().subtract(6, "d").toDate();
      const dateFromRange = moment().subtract(7, "d").toDate();
      let minD = `${monthsFullName[getMonth(dateTo)]} ${getDay(
        dateTo,
      )}, ${getYear(dateTo)}-`;
      let maxD = `${monthsFullName[getMonth(dateFrom)]} ${getDay(
        dateFrom,
      )}, ${getYear(dateFrom)}`;
      return generateData(dateFromRange, dateFrom, dateTo, maxD, minD);
    }
    case "month to date": {
      const dateTo = moment().toDate();
      const dateFrom = moment().subtract(1, "months").endOf("month").subtract(-1, "d")
        .toDate();
      const dateFromRange = moment().subtract(1, "months").endOf("month").toDate();
      let minD = `${monthsFullName[getMonth(dateTo)]} ${getDay(
        dateTo,
      )}, ${getYear(dateTo)}-`;
      let maxD = `${monthsFullName[getMonth(dateFrom)]} ${getDay(
        dateFrom,
      )}, ${getYear(dateFrom)}`;
      return generateData(dateFromRange, dateFrom, dateTo, maxD, minD);
    }
    case "last 30 days": {
      const dateTo = moment().toDate();
      const dateFrom = moment().subtract(1, "months").subtract(-1, "d").toDate();
      const dateFromRange = moment().subtract(1, "months").toDate();
      let minD = `${monthsFullName[getMonth(dateTo)]} ${getDay(
        dateTo,
      )}, ${getYear(dateTo)}-`;
      let maxD = `${monthsFullName[getMonth(dateFrom)]} ${getDay(
        dateFrom,
      )}, ${getYear(dateFrom)}`;
      return generateData(dateFromRange, dateFrom, dateTo, maxD, minD);
    }
    case "week to date": {
      const dateTo = moment().toDate();
      const dateFrom = moment().subtract(1, "weeks").endOf("isoWeek").subtract(-1, "d")
        .toDate();
      const dateFromRange = moment().subtract(1, "weeks").endOf("isoWeek")
        .toDate();
      let minD = `${monthsFullName[getMonth(dateTo)]} ${getDay(
        dateTo,
      )}, ${getYear(dateTo)}-`;
      let maxD = `${monthsFullName[getMonth(dateFrom)]} ${getDay(
        dateFrom,
      )}, ${getYear(dateFrom)}`;
      return generateData(dateFromRange, dateFrom, dateTo, maxD, minD);
    }
    default: {
      const dateTo = moment().toDate();
      const dateFrom = moment().subtract(2, "weeks").subtract(-1, "d")
        .toDate();
      const dateFromRange = moment().subtract(2, "weeks")
        .toDate();
      let minD = `${monthsFullName[getMonth(dateTo)]} ${getDay(
        dateTo,
      )}, ${getYear(dateTo)}-`;
      let maxD = `${monthsFullName[getMonth(dateFrom)]} ${getDay(
        dateFrom,
      )}, ${getYear(dateFrom)}`;
      return generateData(dateFromRange, dateFrom, dateTo, maxD, minD);
    }
    }
  };

  useEffect(() => {
    if (profilesData) {
      dispatch(mainAnalyticsAction());
    }
  }, [profilesData]);

  // SETTING ALL POPS
  useEffect(() => {
    if (allPopsData) {
      // setting pops for popl level
      if (location.state?.poplName) {
        let workerInstance = worker();

        workerInstance.overallAnalyticsPopsPoplLevel(JSON.stringify({ allPopsData, location }))
          .then(({ poplPops, qrCodePops, walletPops }) => {
            setPopsData({
              poplPops, qrCodePops: [...qrCodePops, ...walletPops], allPops: [...poplPops, ...qrCodePops, ...walletPops],
            });
          });
      }
      // setting popps for individual profile level
      if (location.state?.id) {
        return setPopsData({
          poplPops: allPopsData.poplPops.filter((pop) => pop[0] == location.state.id),
          qrCodePops: [...allPopsData.qrCodePops.filter((pop) => pop[0] == location.state.id), ...allPopsData.walletPops.filter((pop) => pop[0] == location.state.id)],
          allPops: allPopsData.allPops.filter((pop) => pop[0] == location.state.id),
        });
      }
      setPopsData({
        poplPops: allPopsData.poplPops,
        qrCodePops: [...allPopsData.qrCodePops, ...allPopsData.walletPops],
        allPops: allPopsData.allPops,
      });
    }
  }, [allPopsData, location]);

  useEffect(() => {
    if (profileCountFilter && profilesData && chartData.dohnutPopsByProfileData) {
      const profilesDataCount = [];
      let profileDataCopy = [...profilesData];
      Object.keys(chartData.dohnutPopsByProfileData).forEach((el) => {
        profilesDataCount.push({ name: el, value: Object.values(chartData.dohnutPopsByProfileData[el]).reduce((s, c) => s += c, 0) });
      });
      const sortDataCount = profilesDataCount.sort((a, b) => b.name - a.name);
      const sortprofileDataCopy = profileDataCopy.sort((a, b) => b.name - a.name);
      const result = sortprofileDataCopy.map((el, index) => ({ ...el, popsCount: sortDataCount[index].value })).sort((a, b) => b.popsCount - a.popsCount);
      const data = {
        poplPops: allPopsData.poplPops.filter((pop) => result.slice(0, profileCountFilter.changeByKey).map((el) => String(el.id)).includes(String(pop[0]))),
        qrCodePops: [
          ...allPopsData.qrCodePops
            .filter((pop) => result.slice(0, profileCountFilter.changeByKey)
              .map((el) => String(el.id)).includes(String(pop[0]))),
          ...allPopsData.walletPops
            .filter((pop) => result.slice(0, profileCountFilter.changeByKey)
              .map((el) => String(el.id)).includes(String(pop[0])))],
        allPops: allPopsData.allPops.filter((pop) => result.slice(0, profileCountFilter.changeByKey).map((el) => String(el.id)).includes(String(pop[0]))),
      };
      let workerInstance = worker();
      // running preloaser for charts
      setIsChartDataCalculating((prev) => ({ ...prev, lineChart: true }));
      workerInstance.generateLineChartData(JSON.stringify({
        popsData: data, minDate: calendar.dateRange[0], maxDate: calendar.dateRange[1],
      })).then((lineData) => {
        setPopsLineData(lineData);
        // stopping preloaser for charts
        setIsChartDataCalculating((prev) => ({ ...prev, lineChart: false }));
      });
    }
  }, [profileCountFilter.changeByKey, calendar.dateRange, profilesData, chartData.dohnutPopsByProfileData]);

  useEffect(() => () => {
    dispatch(cleanAction());
    setChartData({
      dohnutDirectData: null,
      dohnutPopsData: null,
      lineData: null,
      dohnutPopsByProfileData: null,
    });
  }, []);

  useEffect(() => {
    if (popsData && Object.values(popsData).length) {
      if (saveSelected) {
        setSaveSelected(false);
        return selectOption({ target: { value: options } });
      }
      let workerInstance = worker();

      // running preloaser for charts
      setIsChartDataCalculating({
        lineChart: true,
        dohnutDirectData: true,
        dohnutPopsData: true,
        dohnutPopsByProfileData: true,
      });

      workerInstance.generateDohnutChartData(JSON.stringify({
        popsData, isPopsData: true,
      })).then((dohnutPopsData) => {
        setChartData((prev) => ({
          ...prev,
          dataType: "",
          dohnutPopsData,
        }));
        // stopping preloaser for charts
        setIsChartDataCalculating((prev) => ({ ...prev, dohnutPopsData: false }));
      });

      workerInstance.generateDohnutPopsByProfileData(JSON.stringify({
        profileData: profilesData.map(({ id, name }) => ({ id, name })), popsData,
      })).then((dohnutPopsByProfileData) => {
        setChartData((prev) => ({
          ...prev,
          dohnutPopsByProfileData,
        }));
        // stopping preloaser for charts
        setIsChartDataCalculating((prev) => ({ ...prev, dohnutPopsByProfileData: false }));
      });

      workerInstance.generateLineChartData(JSON.stringify({
        popsData,
      })).then((lineData) => {
        setChartData((prev) => ({
          ...prev,
          lineData,
        }));
        // stopping preloaser for charts
        setIsChartDataCalculating((prev) => ({ ...prev, lineChart: false }));
      });

      workerInstance.generateDohnutChartData(JSON.stringify({ popsData }))
        .then((dohnutDirectData) => {
          setChartData((prev) => ({
            ...prev,
            dataType: "",
            dohnutDirectData,
          }));
          // stopping preloaser for charts
          setIsChartDataCalculating((prev) => ({ ...prev, dohnutDirectData: false }));
        });
    } else if (chartData.lineData) {
      setChartData({
        dohnutDirectData: null,
        dohnutPopsData: null,
        lineData: null,
        dohnutPopsByProfileData: null,
      });
    }
  }, [popsData, location]);

  useEffect(() => {
    if (viewsBottom) {
      if (location.state?.id) {
        return setViewsKpis(viewsBottom.filter((view) => view[0] == location.state.id));
      }
      setViewsKpis(viewsBottom);
    }
  }, [location, viewsBottom]);

  return (
    <>
      <Header
        rootLink="Analytics"
        rootLinkClick={handleShowAllStat}
        lastChild={location.state?.name || location.state?.poplName}
        firstChild={location.state?.id ? "Accounts" : location.state?.name ? "Popls" : ""}
        firstChildRedirectPath={location.state?.id ? "/accounts" : "/popls"}
        path="/analytics"
      />
      <div className={classes.contentRoot}>
        <div className={classes.overallAnalyticsContainer}>
          <NetworkActivity
            data={!profileCountFilter.changeByKey ? chartData?.lineData : popsLineData}
            dataType={chartData?.dataType}
            calendar={calendar}
            setCalendar={setCalendar}
            setDate={setDate}
            views={viewsKpis}
            poplLevel={!!location.state?.poplName}
            profileLevelId={location.state?.id}
            options={options}
            selectOption={selectOption}
            profilesData={profilesData}
            handleShowAllStat={handleShowAllStat}
            profileCountFilter={profileCountFilter}
            setProfileCountFilter={setProfileCountFilter}
            isChartsDataCalculating={isChartsDataCalculating.lineChart}
          />
        </div>
        <BottomWidgets
          userId={userId}
          calendar={calendar}
          dohnutPopsData={chartData?.dohnutPopsData}
          dohnutDirectData={chartData?.dohnutDirectData}
          dohnutPopsByProfileData={chartData?.dohnutPopsByProfileData}
          profilesData={profilesData}
          isChartsDataCalculating={isChartsDataCalculating}
        />
      </div>

    </>
  );
}

export default OverallAnalytics;
