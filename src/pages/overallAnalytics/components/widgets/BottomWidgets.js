/* eslint-disable no-return-assign */
import React, { memo } from "react";
import { useLocation } from "react-router-dom";
import WidgetsContainer from "./WidgetsContainer";
import useStyles from "./styles";
// charts
import PieChartProfilesProportion from "./charts/PieChartProfilesProportion";
import PieChartPopsDataProportion from "./charts/PieChartPopsProportion";
import PieChartDirectOnOff from "./charts/PieChartDirectOnOff";
import TopListLinkTaps from "./topStatWidgets/TopListLinkTaps";
import TopListViewedProfiles from "./topStatWidgets/TopListViewedViews";
import TopListPoppedPopls from "./topStatWidgets/TopListTopPoppedPopls";

const BottomWidgets = memo(({
  dohnutPopsData, dohnutDirectData, dohnutPopsByProfileData, calendar, profilesData,
}) => {
  const classes = useStyles();
  const location = useLocation();

  console.log("bottom render");

  return (
    <div className={classes.bottomWidgetsRoot}>
      <div className={classes.twoWidgetsWrapper}>
        <WidgetsContainer
          fullWidth
          isChart
          layerString={(location.state?.poplName && location.state?.poplName) || (location.state?.id && location.state.name)}
          heading='Pops by profile'>
          <PieChartProfilesProportion dohnutPopsByProfileData={dohnutPopsByProfileData} index={3} />
        </WidgetsContainer>
      </div>
      <div className={classes.twoWidgetsWrapper}>
        <WidgetsContainer
          isChart
          layerString={(location.state?.poplName && location.state?.poplName) || (location.state?.id && location.state.name)}
          heading='Pops proportion'>
          <PieChartPopsDataProportion dohnutPopsData={dohnutPopsData} index={1} />
        </WidgetsContainer>
        <WidgetsContainer
          isChart
          layerString={(location.state?.poplName && location.state?.poplName) || (location.state?.id && location.state.name)}
          heading='Direct on/off proportion'>
          <PieChartDirectOnOff dohnutDirectData={dohnutDirectData} index={2} />
        </WidgetsContainer>

      </div>

      <div className={classes.twoWidgetsWrapper}>
        <WidgetsContainer heading='Top viewed Accounts'>
          <TopListViewedProfiles profilesData={profilesData} dateRange={calendar.dateRange} />
        </WidgetsContainer>
        <WidgetsContainer
          layerString={(location.state?.poplName && location.state?.poplName) || (location.state?.id && location.state.name)}
          heading='Most Active Devices'>
          <TopListPoppedPopls profilesData={profilesData} dateRange={calendar.dateRange} />
        </WidgetsContainer>
        <WidgetsContainer
          layerString={(location.state?.poplName && location.state?.poplName) || (location.state?.id && location.state.name)}
          heading='Top tapped Links'>
          <TopListLinkTaps profilesData={profilesData} dateRange={calendar.dateRange} />
        </WidgetsContainer>
      </div>
    </div>
  );
});

export default BottomWidgets;
