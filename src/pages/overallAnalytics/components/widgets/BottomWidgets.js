/* eslint-disable no-return-assign */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import WidgetsContainer from "./WidgetsContainer";
import TopList from "./TopList";
import PieChart from "./PieChart";
import useStyles from "./styles";
import { getProfilesDataAction } from "../../../profiles/store/actions";
import labels, { backgroundColor, chartOptions } from "./chartConfig";

function BottomWidgets({ views, userId, popsData }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [viewedProfiles, setViewedProfiles] = useState();
  const [popsDataProportion, setPopsDataProportion] = useState(null);
  const profilesData = useSelector(({ profilesReducer }) => profilesReducer.dataProfiles.data);

  useEffect(() => {
    if (views) {
      if (profilesData) {
        const result = [];
        views.forEach((item) => {
          const targetProfile = profilesData.find((profile) => profile.id === item.id);
          if (targetProfile) result.push({ ...item, name: targetProfile.name });
        });
        setViewedProfiles(result);
      } else dispatch(getProfilesDataAction(userId));
    }
  }, [views, profilesData]);

  useEffect(() => {
    if (popsData) {
      delete popsData.labels;
      delete popsData.allPops;
      const datasets = [];
      const chartLabels = [];
      const chartBackGroundColors = [];
      setPopsDataProportion(() => {
        Object.keys(popsData).forEach((popName) => {
          chartLabels.push(labels[popName]);
          chartBackGroundColors.push(backgroundColor[popName]);
          datasets.push(Object.values(popsData[popName]).reduce((sum, cur) => sum += cur, 0));
        });
        return {
          labels: chartLabels,
          datasets: [{
            data: datasets,
            backgroundColor: chartBackGroundColors,
            ...chartOptions,
          }],
        };
      });
    }
  }, [popsData]);

  return (
    <div className={classes.bottomWidgetsRoot}>
      <div className={classes.twoWidgetsWrapper}>
        <WidgetsContainer heading='Top viewed Profiles'>
          <TopList data={viewedProfiles}></TopList>
        </WidgetsContainer>
        <WidgetsContainer heading='Top popped Popls'>
          <TopList data={[1, 2, 3, 4, 5, 6]}></TopList>
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
