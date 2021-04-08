/* eslint-disable no-return-assign */
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import WidgetsContainer from "./WidgetsContainer";
import TopList from "./TopList";
import PieChart from "./PieChart";
import useStyles from "./styles";
import { getProfilesDataAction } from "../../../profiles/store/actions";
import labels, {
  backgroundColor, chartOptions, dohnutLabels, dohnutBackgroundColor,
} from "./chartConfig";
import icons from "../../../profiles/components/profilelsIcons/icons";

function BottomWidgets({
  views, userId, popsData, topPopped, dohnutData,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const refProfiles = useRef(null);
  const refPopls = useRef(null);
  const [viewedProfiles, setViewedProfiles] = useState(null);
  const [topPoppedPopls, setTopPoppedPopls] = useState(null);
  const [popsDataProportion, setPopsDataProportion] = useState(null);
  const [popsDirectOnOff, setPopsDirectOnOff] = useState(null);
  const [linkTapsData, setLinkTapsData] = useState(null);
  const profilesData = useSelector(({ profilesReducer }) => profilesReducer.dataProfiles.data);
  const location = useLocation();

  useEffect(() => {
    if (views) {
      if (profilesData) {
        const result = [];
        const linkTaps = [];
        let links = [];
        if (location.state?.id) {
          if (location.state?.personalMode?.text === "Personal") {
            links = [...location.state.social.map((link) => ({ ...link, profileName: location.state.profileName.name }))];
          } else {
            links = [...location.state.business.map((link) => ({ ...link, profileName: location.state.profileName.name }))];
          }
        } else {
          profilesData.forEach((profile) => {
            links = profile.activeProfile === "1"
              ? [...links, ...profile.social.map((link) => ({ ...link, profileName: profile.name }))]
              : [...links, ...profile.business.map((link) => ({ ...link, profileName: profile.name }))];
          });
        }

        links
          .sort((a, b) => b.clicks - a.clicks)
          .forEach((link) => {
            const component = (
              <>
                <img className={classes.linkIcon} src={link.icon ? `${process.env.REACT_APP_BASE_FIREBASE_CUSTOM_ICON}${link.icon}?alt=media` : icons[link.id].icon} alt={link.title} />
                <span className={classes.linkTapsName}>{`${link.value} / ${link.profileName}`}</span>
              </>);
            linkTaps.push({ name: component, value: link.clicks });
          });

        views.forEach((item) => {
          const targetProfile = profilesData.find((profile) => profile.id === item.id);
          if (targetProfile) result.push({ name: targetProfile.name, value: item.data?.views });
        });
        setLinkTapsData(linkTaps);
        setViewedProfiles(result);
      } else dispatch(getProfilesDataAction(userId));
    } else {
      setViewedProfiles(null);
      setTopPoppedPopls(null);
      setLinkTapsData(null);
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
    }
  }, [popsData]);

  useEffect(() => {
    if (dohnutData) {
      const datasetDirectProportion = [];
      const chartLabelsDirectOnOff = [];
      const chartBackGroundColorsDirectOnOff = [];
      setPopsDirectOnOff(() => {
        let allData = {
          directOn: 0,
          directOff: 0,
        };
        Object.keys(dohnutData).forEach((popName) => {
          Object.values(dohnutData[popName]).forEach(({ directOn = 0, directOff = 0 }) => allData = { ...allData, directOn: allData.directOn + directOn, directOff: allData.directOff + directOff });
          // console.log(Object.values(dohnutData[popName]).reduce((sum, { directOn = 0, directOff = 0 }) => ({ ...sum, directOn: sum.directOn + directOn, directOff: sum.directOff + directOff }), { directOff: 0, directOn: 0 }));
        });
        Object.keys({ ...allData }).forEach((item) => {
          chartLabelsDirectOnOff.push(dohnutLabels[item]);
          chartBackGroundColorsDirectOnOff.push(dohnutBackgroundColor[item]);
          datasetDirectProportion.push(allData[item]);
        });
        return {
          labels: [...chartLabelsDirectOnOff],
          datasets: [{
            data: [...datasetDirectProportion],
            backgroundColor: [...chartBackGroundColorsDirectOnOff],
            ...chartOptions,
          }],
        };
      });
    }
  }, [dohnutData]);

  return (
    <div className={classes.bottomWidgetsRoot}>
      <div className={classes.twoWidgetsWrapper}>
        <WidgetsContainer heading='Top viewed Profiles'>
          <TopList data={viewedProfiles} refPopped={refProfiles}/>
        </WidgetsContainer>
        <WidgetsContainer heading='Top popped Popls'>
          <TopList data={topPoppedPopls} refPopped={refPopls}/>
        </WidgetsContainer>
        <WidgetsContainer heading='Top tapped Links'>
          <TopList data={linkTapsData}/>
        </WidgetsContainer>
      </div>
      <div className={classes.twoWidgetsWrapper}>
        <WidgetsContainer heading='Pops proportion'>
          <PieChart data={popsDataProportion} index={1}/>
        </WidgetsContainer>
        <WidgetsContainer heading='Direct on/off proportion'>
          <PieChart data={popsDirectOnOff} index={2}/>
        </WidgetsContainer>
      </div>
    </div>
  );
}

export default BottomWidgets;
