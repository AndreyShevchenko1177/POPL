import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import WidgetsContainer from "./WidgetsContainer";
import TopList from "./TopList";
import PieChart from "./PieChart";
import useStyles from "./styles";
import { getProfilesDataAction } from "../../../profiles/store/actions";

function BottomWidgets({ views, userId }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [viewedProfiles, setViewedProfiles] = useState();
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
  console.log(viewedProfiles);

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
          <PieChart />
        </WidgetsContainer>
        <WidgetsContainer heading='Direct on/off proportion'>
          <PieChart />
        </WidgetsContainer>
      </div>
    </div>
  );
}

export default BottomWidgets;
