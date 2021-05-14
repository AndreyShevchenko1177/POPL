/* eslint-disable no-return-assign */
import React, { useEffect, useState, useRef } from "react";
import { Tooltip } from "@material-ui/core";
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
import { downLoadFile } from "../../../profiles/components/profilelsIcons/downLoadAction";
import { filterPops } from "../../../../utils";

function BottomWidgets({
  views, userId, dohnutData, widgetLayerString, totalPopls, totalPops,
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

  const handleDownloadFile = (linkId, path, value) => {
    if (linkId !== 37) return;
    downLoadFile(path, value);
  };

  useEffect(() => {
    if (totalPopls && totalPops) {
      if (location.state?.poplName) {
        let topPoppedPopls = {};
        totalPopls.forEach((popl) => topPoppedPopls[popl.name] = []);

        totalPops.forEach((pop) => {
          const name = filterPops.slicePoplNameFromPop(pop[1]);
          if (name && name in topPoppedPopls) topPoppedPopls[name].push(pop);
        });

        const sortedPoppedPopls = Object.keys(topPoppedPopls)
          .map((key) => ({ [key]: topPoppedPopls[key] }))
          .sort((a, b) => Object.values(b)[0].length - Object.values(a)[0].length);
        const result = [];
        sortedPoppedPopls.forEach((item) => {
          result.push({ name: Object.keys(item)[0], value: Object.values(item)[0].length });
        });
        return setTopPoppedPopls(result);
      }
      const topPoppedPopls = {};
      totalPopls.forEach((popl) => topPoppedPopls[popl.name] = []);

      totalPops.forEach((pop) => {
        const name = filterPops.slicePoplNameFromPop(pop[1]);
        if (name && name in topPoppedPopls) topPoppedPopls[name].push(pop);
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
  }, [totalPopls, totalPops, location]);

  useEffect(() => {
    if (views) {
      if (profilesData) {
        const result = [];
        const linkTaps = [];
        let links = [];
        if (location.state?.id) {
          if (location.state?.personalMode?.text === "Personal") {
            links = [...location.state.social.map((link) => ({ ...link, profileName: location.state.profileName }))];
          } else {
            links = [...location.state.business.map((link) => ({ ...link, profileName: location.state.profileName }))];
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
                <Tooltip PopperProps={{ disablePortal: true }} title={link.value} placement="top"><span className={classes.linkTapsName}>{link.value}</span></Tooltip>
                {link.id === 37
                  ? <div className={classes.linkIcon} onClick={() => handleDownloadFile(link.id, icons[link.id].path, link.value)}>
                    <img className={classes.iconLink} src={link.icon ? `${process.env.REACT_APP_BASE_FIREBASE_CUSTOM_ICON}${link.icon}?alt=media` : icons[link.id].icon} alt={link.title} />
                  </div>
                  : <a className={classes.linkIcon} href={icons[link.id].path + link.value} target='blank'>
                    <img className={classes.iconLink} src={link.icon ? `${process.env.REACT_APP_BASE_FIREBASE_CUSTOM_ICON}${link.icon}?alt=media` : icons[link.id].icon} alt={link.title} />
                  </a>

                }

              </>);
            linkTaps.push({
              name: component, value: link.clicks, linkId: link.id, linkValue: link.value,
            });
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
    const { dohnutPopsData } = dohnutData;
    if (dohnutPopsData) {
      delete dohnutPopsData.labels;
      delete dohnutPopsData.allPops;
      const datasetsPopsDataProportion = [];
      const chartLabelsPopsDataProportion = [];
      const chartBackGroundColorsPopsDataProportion = [];

      setPopsDataProportion(() => {
        Object.keys(dohnutPopsData).forEach((popName) => {
          chartLabelsPopsDataProportion.push(labels[popName]);
          chartBackGroundColorsPopsDataProportion.push(backgroundColor[popName]);
          datasetsPopsDataProportion.push(Object.values(dohnutPopsData[popName]).reduce((sum, cur) => sum += cur, 0));
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
    } else {
      setPopsDataProportion(undefined);
    }
  }, [dohnutData.dohnutPopsData]);

  useEffect(() => {
    const { dohnutDirectData } = dohnutData;
    if (dohnutDirectData) {
      const datasetDirectProportion = [];
      const chartLabelsDirectOnOff = [];
      const chartBackGroundColorsDirectOnOff = [];
      setPopsDirectOnOff(() => {
        let allData = {
          directOn: 0,
          directOff: 0,
        };
        Object.keys(dohnutDirectData).forEach((popName) => {
          Object.values(dohnutDirectData[popName]).forEach(({ directOn = 0, directOff = 0 }) => allData = { ...allData, directOn: allData.directOn + directOn, directOff: allData.directOff + directOff });
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
    } else {
      setPopsDirectOnOff(undefined);
    }
  }, [dohnutData.dohnutDirectData]);

  return (
    <div className={classes.bottomWidgetsRoot}>
      <div className={classes.twoWidgetsWrapper}>
        <WidgetsContainer layerString={widgetLayerString.layer !== "Total" ? `${widgetLayerString.layer} > ${widgetLayerString.name}` : "Total"} heading='Pops proportion'>
          <PieChart data={popsDataProportion} index={1}/>
        </WidgetsContainer>
        <WidgetsContainer layerString={widgetLayerString.layer !== "Total" ? `${widgetLayerString.layer} > ${widgetLayerString.name}` : "Total"} heading='Direct on/off proportion'>
          <PieChart data={popsDirectOnOff} index={2}/>
        </WidgetsContainer>
      </div>
      <div className={classes.twoWidgetsWrapper}>
        <WidgetsContainer layerString="Total" heading='Top viewed Profiles'>
          <TopList data={viewedProfiles} refPopped={refProfiles}/>
        </WidgetsContainer>
        <WidgetsContainer layerString={widgetLayerString.layer === "Profile" ? `${widgetLayerString.layer} > ${widgetLayerString.name}` : "Total"} heading='Top popped Popls'>
          <TopList data={topPoppedPopls} refPopped={refPopls}/>
        </WidgetsContainer>
        <WidgetsContainer layerString={widgetLayerString.layer === "Profile" ? `${widgetLayerString.layer} > ${widgetLayerString.name}` : "Total"} heading='Top tapped Links'>
          <TopList data={linkTapsData} isLinks={true} />
        </WidgetsContainer>
      </div>
    </div>
  );
}

export default BottomWidgets;
