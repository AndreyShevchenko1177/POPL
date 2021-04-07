/* eslint-disable no-return-assign */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import WidgetsContainer from "./WidgetsContainer";
import TopList from "./TopList";
import PieChart from "./PieChart";
import useStyles from "./styles";
import { getProfilesDataAction } from "../../../profiles/store/actions";
import labels, { backgroundColor, chartOptions } from "./chartConfig";

function BottomWidgets({
  views, userId, popsData, topPopped,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [viewedProfiles, setViewedProfiles] = useState();
  const [topPoppedPopls, setTopPoppedPopls] = useState();
  const [popsDataProportion, setPopsDataProportion] = useState(null);
  const [popsDirectOnOff, setPopsDirectOnOff] = useState(null);
  const profilesData = useSelector(({ profilesReducer }) => profilesReducer.dataProfiles.data);

  useEffect(() => {
    if (views) {
      if (profilesData) {
        const result = [];
        views.forEach((item) => {
          const targetProfile = profilesData.find((profile) => profile.id === item.id);
          if (targetProfile) result.push({ name: targetProfile.name, value: item.data?.views });
        });
        setViewedProfiles(result);
      } else dispatch(getProfilesDataAction(userId));
    }
  }, [views, profilesData]);

  useEffect(() => {
    if (topPopped) {
      const result = [];
      topPopped.forEach((item) => {
        result.push({ name: Object.keys(item)[0], value: Object.values(item)[0].length });
      });
      setTopPoppedPopls(result);
    }
  }, [topPopped]);

  useEffect(() => {
    if (popsData) {
      delete popsData.labels;
      delete popsData.allPops;
      const datasetsPopsDataProportion = [];
      const chartLabelsPopsDataProportion = [];
      const chartBackGroundColorsPopsDataProportion = [];
      const datasetsPopsDirectOnOff = [];
      const chartLabelsDirectOnOff = [];
      const chartBackGroundColorsDirectOnOff = [];
      setPopsDataProportion(() => {
        Object.keys(popsData).forEach((popName) => {
          chartLabelsPopsDataProportion.push(labels[popName]);
          chartBackGroundColorsPopsDataProportion.push(backgroundColor[popName]);
          datasetsPopsDataProportion.push(Object.values(popsData[popName]).reduce((sum, cur) => sum += cur, 0));
        });
        return {
          labels: chartLabelsPopsDataProportion,
          datasets: [{
            data: datasetsPopsDataProportion,
            backgroundColor: chartBackGroundColorsPopsDataProportion,
            ...chartOptions,
          }],
        };
      });
      setPopsDirectOnOff(() => {

      });
    }
  }, [popsData]);

  console.log(popsDataProportion);

  return (
    <div className={classes.bottomWidgetsRoot}>
      <div className={classes.twoWidgetsWrapper}>
        <WidgetsContainer heading='Top viewed Profiles'>
          <TopList data={viewedProfiles}></TopList>
        </WidgetsContainer>
        <WidgetsContainer heading='Top popped Popls'>
          <TopList data={topPoppedPopls}></TopList>
        </WidgetsContainer>
      </div>
      <div className={classes.twoWidgetsWrapper}>
        <WidgetsContainer heading='Pops proportion'>
          <PieChart data={popsDataProportion} index={1}/>
        </WidgetsContainer>
        <WidgetsContainer heading='Direct on/off proportion'>
          <PieChart data={popsDataProportion} index={2}/>
        </WidgetsContainer>
      </div>
    </div>
  );
}

export default BottomWidgets;