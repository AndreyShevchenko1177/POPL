/* eslint-disable no-return-assign */
import React, { useEffect, useState, useRef } from "react";
import { Tooltip } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import moment from "moment";
import { useSelector } from "react-redux";
import WidgetsContainer from "./WidgetsContainer";
import TopList from "./TopList";
import PieChart from "./PieChart";
import useStyles from "./styles";
import labels, {
  backgroundColor, chartOptions, dohnutLabels, dohnutBackgroundColor, dohnutPoplByProfileBackgroundColor,
} from "./chartConfig";
import icons from "../../../profiles/components/profilelsIcons/icons";
import { downLoadFile } from "../../../profiles/components/profilelsIcons/downLoadAction";
import { filterPops, getRandomColor } from "../../../../utils";
// charts
import PieChartProfilesProportion from "./charts/PieChartProfilesProportion";
import PieChartPopsDataProportion from "./charts/PieChartPopsProportion";
import PieChartDirectOnOff from "./charts/PieChartDirectOnOff";
import TopListLinkTaps from "./topStatWidgets/TopListLinkTaps";
import TopListViewedProfiles from "./topStatWidgets/TopListViewedViews";

function BottomWidgets({
  dohnutPopsData, dohnutDirectData, dohnutPopsByProfileData, widgetLayerString, totalPopls, totalPops, calendar, profilesData,
}) {
  const classes = useStyles();
  const refProfiles = useRef(null);
  const refPopls = useRef(null);
  const [topPoppedPopls, setTopPoppedPopls] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (totalPopls && totalPops && calendar.dateRange) {
      const topPoppedPopls = {};
      totalPopls.forEach((popl) => topPoppedPopls[popl.name] = []);

      totalPops.forEach((pop) => {
        const popDate = moment(pop[2]).format("x");
        const name = filterPops.slicePoplNameFromPop(pop[1]);
        if (name && name in topPoppedPopls) {
          if ((popDate > moment(calendar.dateRange[0]).format("x")) && (popDate < moment(calendar.dateRange[1]).format("x"))) topPoppedPopls[name].push(pop);
        }
      });
      const sortedPoppedPopls = Object.keys(topPoppedPopls)
        .map((key) => ({ [key]: topPoppedPopls[key] }))
        .sort((a, b) => Object.values(b)[0].length - Object.values(a)[0].length);

      const result = [];
      sortedPoppedPopls.forEach((item) => {
        result.push({ name: Object.keys(item)[0], value: Object.values(item)[0].length });
      });
      setTopPoppedPopls(result);
    }
  }, [totalPopls, totalPops, location, calendar.dateRange]);

  // useEffect(() => {
  //   if (profilesData && views && calendar.dateRange) {
  //     const result = [];
  //     // sorting calendar dates, cause sometimes more recent date is in the beggining of array
  //     calendar.dateRange.sort((a, b) => moment(a).format("x") - moment(b).format("x"));

  //     profilesData.forEach((profile) => {
  //       let profilesNumber = 0;
  //       views.forEach((view) => {
  //         const viewsDate = moment(view[2]).format("x");
  //         if (view[0] == profile.id) {
  //           if ((viewsDate > moment(calendar.dateRange[0]).format("x")) && (viewsDate < moment(calendar.dateRange[1]).format("x"))) profilesNumber += 1;
  //         }
  //       });
  //       result.push({ name: profile.name, value: profilesNumber });
  //     });
  //     setViewedProfiles(result);
  //   }
  // }, [views, profilesData, calendar.dateRange]);

  console.log("bottom render");

  return (
    <div className={classes.bottomWidgetsRoot}>
      <div className={classes.twoWidgetsWrapper}>
        <WidgetsContainer isChart layerString={widgetLayerString.layer !== "Total" ? `${widgetLayerString.name}` : ""} heading='Pops by profile'>
          {/* <PieChart data={popsByProfile} index={3}/> */}
          <PieChartProfilesProportion dohnutPopsByProfileData={dohnutPopsByProfileData} index={3} />
        </WidgetsContainer>
        <WidgetsContainer isChart layerString={widgetLayerString.layer !== "Total" ? `${widgetLayerString.name}` : ""} heading='Pops proportion'>
          {/* <PieChart data={popsDataProportion} index={1}/> */}
          <PieChartPopsDataProportion dohnutPopsData={dohnutPopsData} index={1} />
        </WidgetsContainer>
        <WidgetsContainer isChart layerString={widgetLayerString.layer !== "Total" ? `${widgetLayerString.name}` : ""} heading='Direct on/off proportion'>
          {/* <PieChart data={popsDirectOnOff} index={2}/> */}
          <PieChartDirectOnOff dohnutDirectData={dohnutDirectData} index={2} />
        </WidgetsContainer>

      </div>

      <div className={classes.twoWidgetsWrapper}>
        <WidgetsContainer layerString="Total" heading='Top viewed Profiles'>
          {/* <TopList data={viewedProfiles?.sort((a, b) => b.value - a.value)} refPopped={refProfiles}/> */}
          <TopListViewedProfiles profilesData={profilesData} dateRange={calendar.dateRange} refPopped={refProfiles} />
        </WidgetsContainer>
        <WidgetsContainer layerString={widgetLayerString.layer === "Profile" ? `${widgetLayerString.layer} > ${widgetLayerString.name}` : "Total"} heading='Top popped Popls'>
          <TopList data={topPoppedPopls} refPopped={refPopls}/>
        </WidgetsContainer>
        <WidgetsContainer layerString={widgetLayerString.layer === "Profile" ? `${widgetLayerString.layer} > ${widgetLayerString.name}` : "Total"} heading='Top tapped Links'>
          {/* <TopList data={linkTapsData} isLinks={true} /> */}
          <TopListLinkTaps profilesData={profilesData} dateRange={calendar.dateRange} refPopped={refPopls} />
        </WidgetsContainer>
      </div>
    </div>
  );
}

export default BottomWidgets;
