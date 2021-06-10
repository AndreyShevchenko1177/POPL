/* eslint-disable import/order */
/* eslint-disable import/no-webpack-loader-syntax */
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { Tooltip } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import moment from "moment";
import { useSelector } from "react-redux";
import Loader from "../../../../../components/Loader";
import useStyles from "../styles";
import icons from "../../../../profiles/components/profilelsIcons/icons";
import { downLoadFile } from "../../../../profiles/components/profilelsIcons/downLoadAction";
import worker from "workerize-loader!../../../../../worker";

function TopListLinkTaps({
  profilesData, dateRange,
}) {
  const classes = useStyles();
  const location = useLocation();
  const [data, setData] = useState();
  const linksTaps = useSelector(({ realTimeAnalytics }) => realTimeAnalytics.linkTapsBottom.data);
  const [isWorkerRunning, setIsWorkerRunning] = useState(false);

  const handleDownloadFile = (linkId, path, value) => {
    if (linkId !== 37) return;
    downLoadFile(path, value);
  };

  useEffect(() => {
    if (profilesData && dateRange && linksTaps) {
      let workerInstance = worker();
      // sorting calendar dates, cause sometimes more recent date is in the beggining of array
      dateRange.sort((a, b) => moment(a).format("x") - moment(b).format("x"));

      const result = [];
      setIsWorkerRunning(true);
      workerInstance.linkTapsWidgetCalculation(JSON.stringify({
        linksTaps, dateRange, location, profilesData,
      }))
        .then((links) => {
          links
            .sort((a, b) => b.clicks - a.clicks)
            .forEach((link) => {
              const component = (
                <>
                  <Tooltip PopperProps={{ disablePortal: true }} title={link.value} placement="top"><span className={classes.linkTapsName}>{link.profileName}</span></Tooltip>
                  {link.id === 37
                    ? <div className={classes.linkIcon} onClick={() => handleDownloadFile(link.id, icons[link.id].path, link.value)}>
                      <img className={classes.iconLink} src={link.icon ? `${process.env.REACT_APP_BASE_FIREBASE_CUSTOM_ICON}${link.icon}?alt=media` : icons[link.id].icon} alt={link.title} />
                    </div>
                    : <a className={classes.linkIcon} href={icons[link.id].path + link.value} target='blank'>
                      <img className={classes.iconLink} src={link.icon ? `${process.env.REACT_APP_BASE_FIREBASE_CUSTOM_ICON}${link.icon}?alt=media` : icons[link.id].icon} alt={link.title} />
                    </a>

                  }

                </>);
              result.push({
                name: component, value: link.clicks, linkId: link.id, linkValue: link.value,
              });
            });
          setData(result);
          setIsWorkerRunning(false);
        });
    }
  }, [linksTaps, profilesData, dateRange, location]);

  return (
    <>
      {data && !isWorkerRunning
        ? <div className={classes.tableBody}>
          {data.map(({
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
          ))}
        </div>
        : <Loader containerStyles={{
          width: "40px", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
        }} />
      }
    </>
  );
}

export default TopListLinkTaps;
