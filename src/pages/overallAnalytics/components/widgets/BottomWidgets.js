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
  dohnutPopsData, dohnutDirectData, dohnutPopsByProfileData, calendar, profilesData, isChartsDataCalculating,
}) => {
  const classes = useStyles();
  const location = useLocation();

  return (
    <div className={classes.bottomWidgetsRoot}>
      <div className={classes.twoWidgetsWrapper}>
        <WidgetsContainer
          fullWidth
          isChart
          // layerString={(location.state?.poplName && location.state?.poplName) || (location.state?.id && location.state.name)}
          heading='Pops by profile'>
          <PieChartProfilesProportion isChartsDataCalculating={isChartsDataCalculating.dohnutPopsByProfileData} dohnutPopsByProfileData={dohnutPopsByProfileData} index={3} />
        </WidgetsContainer>
      </div>
      <div className={classes.twoWidgetsWrapper}>
        <WidgetsContainer
          profilesData={profilesData}
          imageStyles={{ left: 130 }}
          isChart
          layerString={(location.state?.poplName && location.state?.poplName) || (location.state?.id && location.state.name)}
          heading='Pops proportion'>
          <PieChartPopsDataProportion isChartsDataCalculating={isChartsDataCalculating.dohnutPopsData} dohnutPopsData={dohnutPopsData} index={1} />
        </WidgetsContainer>
        <WidgetsContainer
          profilesData={profilesData}
          imageStyles={{ left: 180 }}
          isChart
          layerString={(location.state?.poplName && location.state?.poplName) || (location.state?.id && location.state.name)}
          heading='Direct on/off proportion'>
          <PieChartDirectOnOff isChartsDataCalculating={isChartsDataCalculating.dohnutDirectData} dohnutDirectData={dohnutDirectData} index={2} />
        </WidgetsContainer>

      </div>
      <div className={classes.twoWidgetsWrapper}>
        <WidgetsContainer
          heading='Top viewed Accounts'
          profilesData={profilesData}
          imageStyles={{ left: 170, imageWidth: 25, imageHeight: 25 }}
        >
          <TopListViewedProfiles profilesData={profilesData} dateRange={calendar.dateRange} />
        </WidgetsContainer>
        <WidgetsContainer
          layerString={(location.state?.poplName && location.state?.poplName) || (location.state?.id && location.state.name)}
          heading='Most Active Devices'
          profilesData={profilesData}
          imageStyles={{ left: 170, imageWidth: 25, imageHeight: 25 }}
        >
          <TopListPoppedPopls profilesData={profilesData} dateRange={calendar.dateRange} />
        </WidgetsContainer>
        <WidgetsContainer
          layerString={(location.state?.poplName && location.state?.poplName) || (location.state?.id && location.state.name)}
          heading='Top tapped Links'
          profilesData={profilesData}
          imageStyles={{ left: 170, imageWidth: 25, imageHeight: 25 }}
        >
          <TopListLinkTaps profilesData={profilesData} dateRange={calendar.dateRange} />
        </WidgetsContainer>
      </div>
    </div>
  );
});

export default BottomWidgets;
