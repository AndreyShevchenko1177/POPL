import React, {
  useRef, useEffect, useState, memo,
} from "react";
import { useSelector } from "react-redux";
import { Doughnut } from "react-chartjs-2";
import { useLocation } from "react-router-dom";
import clsx from "clsx";
import { chartOptions, dohnutPoplByProfileBackgroundColor } from "../chartConfig";
import useStyles from "../styles";
import Loader from "../../../../../components/Loader";
import { getRandomColor } from "../../../../../utils";
import { isSafari } from "../../../../../constants";

const PieChartProfilesProportion = memo(({ dohnutPopsByProfileData, index }) => {
  const classes = useStyles();
  const chart = useRef();
  const [data, setData] = useState(null);
  const [colors, setColors] = useState([]);
  const profiles = useSelector(({ profilesReducer }) => profilesReducer.dataProfiles.data);

  const location = useLocation();

  const handleClickLabel = (e, index) => {
    const ctx = chart.current.chartInstance;
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
    if (e.currentTarget.lastElementChild.classList.contains("disable-legend")) {
      e.currentTarget.lastElementChild.classList.remove("disable-legend");
    } else {
      e.currentTarget.lastElementChild.classList.add("disable-legend");
    }
    ctx.update();
  };

  const renderLabels = (chart) => {
    const { data } = chart;
    return data.datasets[0].data
      .map(
        (_, i) => `
              <div style="display: flex; width: 100%; margin-bottom:${isSafari ? "15px" : "0px"}" id="legend-${i}-item" class="legend-item">
                <div style='display: none; position: absolute; top: 0px ; left: -${data.labels[i]?.length * 10}px; background-color: rgb(102 102 102 / 50%); z-index: 100; padding: 5px; border-radius: 5px; color: #fff;'>
                  <span>${data.labels[i]} </span>
                </div>
                <p style="background-color:
                  ${data.datasets[0].backgroundColor[i]};border-radius: 50%; width: 20px; height: 20px; padding-right: 5px;">
                  &nbsp;&nbsp;&nbsp;&nbsp;
                </p>
                ${data.labels[i] && `<span style="font-weight: ${i < 3 ? 700 : 200}; height: ${isSafari ? "20px" : "100%"} ;margin-left: 5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis" class="label">${data.labels[i]}</span>`}
              </div>
        `,
      )
      .join("");
  };

  useEffect(() => {
    if (chart.current?.chartInstance) {
      const labelsArrayLength = data.labels.filter((el, i, arr) => arr.indexOf(el) === i).length;
      document.querySelector(`#legend${index}`).innerHTML = chart.current?.chartInstance?.generateLegend();
      document.querySelectorAll(`#legend${index} > div`).forEach((item, index) => {
        item.addEventListener("click", (e) => handleClickLabel(e, index));
      });
    }
  }, [data]);

  useEffect(() => {
    if (dohnutPopsByProfileData) {
      let bc = [];
      if (colors.length) {
        bc = colors;
      } else {
        Object.keys(dohnutPopsByProfileData).forEach(() => bc.push(getRandomColor()));
        setColors(bc);
      }
      delete dohnutPopsByProfileData.labels;
      const datasetsPopsByProfileDataProportion = [];
      const chartLabelsPopsByProfileDataProportion = [];
      const chartBackGroundColorsPopsByProfileDataProportion = [];
      setData(() => {
        if (location.state?.id) {
          chartLabelsPopsByProfileDataProportion.push({ name: location.state?.name, value: Object.values(dohnutPopsByProfileData[location.state?.name]).reduce((sum, cur) => sum += cur, 0) });
          chartBackGroundColorsPopsByProfileDataProportion.push(dohnutPoplByProfileBackgroundColor[0]);
          datasetsPopsByProfileDataProportion.push(Object.values(dohnutPopsByProfileData[location.state?.name]).reduce((sum, cur) => sum += cur, 0));
        } else {
          Object.keys(dohnutPopsByProfileData).forEach((name, index) => {
            chartLabelsPopsByProfileDataProportion.push(name === "null" || !name ? { name: "no name", value: Object.values(dohnutPopsByProfileData[name]).reduce((sum, cur) => sum += cur, 0) } : { name, value: Object.values(dohnutPopsByProfileData[name]).reduce((sum, cur) => sum += cur, 0) });
            chartBackGroundColorsPopsByProfileDataProportion.push(dohnutPoplByProfileBackgroundColor[index]);
            datasetsPopsByProfileDataProportion.push(Object.values(dohnutPopsByProfileData[name]).reduce((sum, cur) => sum += cur, 0));
          });
        }
        return {
          labels: [...chartLabelsPopsByProfileDataProportion].sort((a, b) => b.value - a.value).map((el) => el.name),
          datasets: [{
            data: [...chartLabelsPopsByProfileDataProportion].sort((a, b) => b.value - a.value).map((el) => el.value),
            backgroundColor: chartBackGroundColorsPopsByProfileDataProportion,
            ...chartOptions,
          }],
        };
      });
    } else {
      setData(undefined);
    }
  }, [dohnutPopsByProfileData]);

  return data
    ? (!data.datasets[0].data.every((val) => !val)
      ? <div className={clsx("chart-container", classes.popsByProfile)}>
        <div className='chart-wrapper'>
          <Doughnut
            height={75}
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
        <div id={`legend${index}`} />
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
