/* eslint-disable import/order */
/* eslint-disable import/no-webpack-loader-syntax */
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { Tooltip } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../../../../components/Loader";
import useStyles from "../styles";
import icons from "../../../../profiles/components/profilelsIcons/icons";
import { downLoadFile } from "../../../../profiles/components/profilelsIcons/downLoadAction";
import worker from "workerize-loader!../../../../../worker";
import { cacheLinkTapsWidgetAction } from "../../../store/actions";

function TopListLinkTaps({
  profilesData, dateRange,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const [data, setData] = useState(null);
  const linksTaps = useSelector(({ realTimeAnalytics }) => realTimeAnalytics.linkTapsBottom.data);
  const linksTapsCached = useSelector(({ realTimeAnalytics }) => realTimeAnalytics.topTappedLinksCache);
  const [isWorkerRunning, setIsWorkerRunning] = useState(false);
  const checkboxes = useSelector(({ realTimeAnalytics }) => realTimeAnalytics.checkBoxData);

  const handleDownloadFile = (linkId, path, value) => {
    if (linkId !== 37) return;
    downLoadFile(path, value);
  };

  useEffect(() => {
    if (!linksTaps) setData(null); // when clicking refresh button settings to null to show spinner
    if (linksTapsCached && !data) return setData(linksTapsCached); // for initial render checking cache and setting if it's available
    if (profilesData && dateRange && linksTaps) {
      let workerInstance = worker();
      // sorting calendar dates, cause sometimes more recent date is in the beggining of array
      dateRange.sort((a, b) => moment(a).format("x") - moment(b).format("x"));
      const selectedProfiles = Object.keys(checkboxes.profiles).filter((el) => checkboxes.profiles[el]).map((el) => Number(el));
      const isSelected = Object.values(checkboxes.profiles).includes(true);
      const result = [];
      setIsWorkerRunning(true);
      workerInstance.linkTapsWidgetCalculation(JSON.stringify({
        linksTaps, dateRange, location, profilesData: isSelected ? profilesData.filter((el) => selectedProfiles.includes(Number(el.id))) : profilesData,
      }))
        .then((links) => {
          if (location.pathname !== window.location.pathname) return;
          links
            .sort((a, b) => b.clicks - a.clicks)
            .forEach((link) => {
              const component = (
                <>
                  <Tooltip
                    PopperProps={{ disablePortal: true }}
                    title={link.value} placement="top"
                  >
                    <span
                      style={{
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        paddingRight: 5,
                        width: "80%",
                      }}
                    >
                      {link.profileName}
                    </span>
                  </Tooltip>
                  {link.id === 37
                    ? <div
                      style={{
                        margin: "0 5px 0 0px",
                        cursor: "pointer",
                        minWidth: 25,
                        width: "20%",
                      }}
                      onClick={() => handleDownloadFile(link.id, icons[link.id].path, link.value)}
                    >
                      <img style={{ width: 25, height: 25 }} src={link.icon ? `${process.env.REACT_APP_BASE_FIREBASE_CUSTOM_ICON}${link.icon}?alt=media` : icons[link.id].icon} alt={link.title} />
                    </div>
                    : <a
                      style={{
                        margin: "0 5px 0 0px",
                        cursor: "pointer",
                        minWidth: 25,
                        width: "20%",
                      }}
                      href={icons[link.id].path + link.value}
                      target='blank'
                    >
                      <img style={{ width: 25, height: 25 }} src={link.icon ? `${process.env.REACT_APP_BASE_FIREBASE_CUSTOM_ICON}${link.icon}?alt=media` : icons[link.id].icon} alt={link.title} />
                    </a>

                  }

                </>);
              result.push({
                name: component, value: link.clicks, linkId: link.id, linkValue: link.value,
              });
            });

          if (!data && !location.state?.id && !location.state?.poplName) dispatch(cacheLinkTapsWidgetAction([...result])); // setting cache just for initial render and for non popl or accounts level
          setData(result);
          setIsWorkerRunning(false);
        });
    }
  }, [linksTaps, profilesData, dateRange, location, checkboxes]);

  return (
    <>
      {data && !isWorkerRunning
        ? <div className={classes.tableBody}>
          {data.length ? data.map(({
            name, value, linkId, linkValue,
          }, key) => (
            <div className={clsx(classes.tableRow, { [classes.activeTableRow]: location.state?.name === name }) } key={key} >
              <div className={classes.tableCellRank }>{key + 1}</div>
              <div className={clsx(classes.tableCellName, classes.tableCellNameLink) }>{name}</div>
              <div className={clsx(classes.tableCellValue, classes.tableCellValueLink)}>
                <Tooltip
                  PopperProps={{ disablePortal: true }}
                  title={icons[linkId].path + linkValue} placement="top"
                >
                  <a
                    className={classes.linkLink}
                    href={icons[linkId].path + linkValue}
                  >
                    {linkValue}
                  </a>
                </Tooltip>
                <div>{value}</div>
              </div>
            </div>
          ))
            : <div className={clsx(classes.noDataText, classes.noDataTextWidgets)}>
            No top viewed accounts for this account
            </div>}
        </div>
        : <Loader containerStyles={{
          width: "40px", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
        }} />
      }
    </>
  );
}

export default TopListLinkTaps;
