import React, {
  useRef, useEffect, useState, memo,
} from "react";
import { useSelector } from "react-redux";
import { Doughnut } from "react-chartjs-2";
import { useLocation } from "react-router-dom";
import clsx from "clsx";
import { Paper } from "@material-ui/core";
import { chartOptions, dohnutPoplByProfileBackgroundColor } from "../chartConfig";
import useStyles from "../styles";
import Loader from "../../../../../components/Loader";
import { isSafari } from "../../../../../constants";

const PieChartProfilesProportion = memo(({ dohnutPopsByProfileData, index, isChartsDataCalculating }) => {
  const classes = useStyles();
  const chart = useRef();
  const [data, setData] = useState(null);
  const profiles = useSelector(({ profilesReducer }) => profilesReducer.dataProfiles.data);
  const generalSettingsData = useSelector(({ generalSettingsReducer }) => generalSettingsReducer.companyInfo.data);
  const checkboxes = useSelector(({ realTimeAnalytics }) => realTimeAnalytics.checkBoxData);

  const location = useLocation();

  const handleClickLabel = (e, i) => {
    const ctx = chart.current.chartInstance;
    let index = i - 1;
    const meta = [];
    ctx.data.datasets.forEach((dataset, index) => {
      meta.push(ctx.getDatasetMeta(index));
    });
    const label1Length = ctx.data.datasets[0].data.length;
    if (label1Length > index) {
      meta[0].data[index].hidden = !meta[0].data[index].hidden;
    } else {
      meta[1].data[index - label1Length].hidden = !meta[1].data[
        index - label1Length
      ].hidden;
    }
    if (e.currentTarget.classList.contains("disable-legend")) {
      e.currentTarget.classList.remove("disable-legend");
    } else {
      e.currentTarget.classList.add("disable-legend");
    }
    ctx.update();
  };

  const renderLabels = (chart) => {
    const { data } = chart;
    const header = `
        <div style="display: flex; padding-top: 10px; font-size: 15px; font-weight: 600; background-color: #fff; z-index: 100;  align-items: center; width: 100%; padding-bottom: 15px; position: sticky; top: 0px; height: 40px;">
          <div style="width: 20px; margin-right: 10px;">
           
          </div>
        
        <div style="width: 239px; ">
          <span> Name </span>
        </div>
        <div style="width: 115px; display: flex; justify-content: center">  <span style="white-space: nowrap;"> Pop count </span> </div>
        <div style="width: 42px; display: flex; justify-content: center">  <span> CTR </span> </div>
         </div>
      `;
    return header + data.datasets[0].data
      .map(
        (_, i) => `
              <div style="display: flex; align-items: center;  width: 100%; border-top: ${i === 0 ? "1px" : "0px"} solid #dadada; background-color: ${i < 3 ? "#f6f6f6" : "#ffffff"}; height: 50px; border-bottom: 1px solid #dadada; cursor: pointer; position: relative" id="legend-${i}-item">
                <div style="width: 20px; margin-right: 10px; display: flex;"> <p> ${i + 1} </p> </div>
                <div style="display: flex; align-items: center;"> 
                <div style="width: 45px; height: 45px; margin-right: 15px">
                ${data.image[i] || (generalSettingsData && generalSettingsData[3])
    ? `<img style="width: 100%; height: 100%; border: 3px solid ${data.datasets[0].backgroundColor[i]}; border-radius: 50%; object-fit: cover;" src=${data.image[i] ? process.env.REACT_APP_BASE_FIREBASE_PHOTOS_URL + data.image[i] : `${process.env.REACT_APP_BASE_FIREBASE_CUSTOM_ICON}${generalSettingsData[3]}`}?alt=media />`
    : ` <div style="width: 100%; height: 100%; border: 3px solid ${data.datasets[0].backgroundColor[i]}; border-radius: 50%; box-shadow: 0px 0px 8px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%); background-color: ${generalSettingsData && generalSettingsData[1]}">  </div>`

}                  
                </div>
                ${data.labels[i] && `<span style="font-weight: ${i < 3 ? 700 : 200}; width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis" class="label">${data.labels[i] === "No name" ? "<i>No name</i>" : data.labels[i]}</span>`}
                </div>
                
                <div style="display: flex; width: 100px;  height: 100%;align-items: center; padding: 0 10px; border-left: 1px solid #dadada;  border-right: 1px solid #dadada;">
                <span> ${data.popsCount[i]} </span>
                 </div>
                 <div  style="width: 65px; display: flex; height: 100%; align-items: center; justify-content: center;"> <span > ${data.ctr[i]} </span> </div>
              </div>
        `,
      )
      .join("");
  };

  useEffect(() => {
    if (chart.current?.chartInstance) {
      document.querySelector(`#legend${index}`).innerHTML = chart.current?.chartInstance?.generateLegend();
      document.querySelectorAll(`#legend${index} > div`).forEach((item, index) => {
        item.addEventListener("click", (e) => handleClickLabel(e, index));
      });
    }
  }, [data]);

  useEffect(() => {
    if (dohnutPopsByProfileData) {
      let data;
      setData(() => {
        if (location.state?.id) {
          data = dohnutPopsByProfileData.data.filter(({ id }) => id == location.state.id);
        } else {
          data = dohnutPopsByProfileData.data;
        }

        const selectedProfiles = Object.keys(checkboxes).filter((el) => checkboxes[el]).map((el) => Number(el));
        const isSelected = Object.values(checkboxes).includes(true);
        if (isSelected) {
          data = data.filter((el) => selectedProfiles.includes(Number(el.id)));
        }
        return {
          labels: data.map((el) => el.name),
          datasets: [{
            data: data.map((el) => el.popsCount),
            backgroundColor: data.map((_, i) => dohnutPoplByProfileBackgroundColor[i]),
            ...chartOptions,
          }],
          image: data.map((el) => el.image),
          popsCount: data.map((el) => el.popsCount),
          ctr: data.map((el) => el.ctr),
        };
      });
    } else {
      setData(undefined);
    }
  }, [dohnutPopsByProfileData, checkboxes]);

  return data && !isChartsDataCalculating
    ? (!data.datasets[0].data.every((val) => !val)
      ? <div className={clsx("chart-container", classes.popsByProfile)}>
        <div style={{ width: "60%", display: "flex", justifyContent: "center" }}>
          <div className='chart-wrapper' >
            <Doughnut
              height={90}
              width={150}
              ref={chart}
              data={data}
              legend={{ display: false }}
              options={{
                legendCallback: (chart) => {
                  const html = renderLabels(chart);
                  return html;
                },
                responsive: true,
              }}
            />
          </div>
        </div>
        <Paper className={classes.rootLegend} elevation={3}><div id={`legend${index}`} /></Paper>
      </div>
      : <div className={classes.noDataText}>
        No data for this period
      </div>)
    : <Loader
      containerStyles={{
        width: "40px", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
      }}
    />;
});

export default PieChartProfilesProportion;
