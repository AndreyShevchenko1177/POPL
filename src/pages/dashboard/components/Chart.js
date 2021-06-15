/* eslint-disable no-return-assign */
/* eslint-disable guard-for-in */
import React, { useState, useEffect, useRef } from "react";
import { Bar, Line } from "react-chartjs-2";
import chartOptions, { colors } from "./chartOptions";
import Loader from "../../../components/Loader";
import useStyles from "./styles/style";
import { isSafari } from "../../../constants";
import { getDay, getMonth, getMothName } from "../../../utils/dates";

export default function Chart({ data }) {
  const [chartData, setChartData] = useState();
  const classes = useStyles();
  const chartRef = useRef();

  const handleClickLabel = (e, index) => {
    const ctx = chartRef.current.chartInstance;
    const meta = [];
    ctx.data.datasets.forEach((dataset, index) => {
      meta.push(ctx.getDatasetMeta(index));
    });
    const label1Length = ctx.data.datasets.length;

    if (label1Length > index) {
      meta[index].hidden = !meta[index].hidden;
    } else {
      meta[index - label1Length].hidden = !meta[
        index - label1Length
      ].hidden;
    }
    if (e.currentTarget.lastElementChild.classList.contains("disable-legend")) {
      e.currentTarget.lastElementChild.classList.remove("disable-legend");
      [...e.currentTarget.children[0].children].forEach((el) => el.classList.remove("disable-bg"));
      e.currentTarget.children[1].classList.remove("disable");
    } else {
      e.currentTarget.lastElementChild.classList.add("disable-legend");
      [...e.currentTarget.children[0].children].forEach((el) => el.classList.add("disable-bg"));
      e.currentTarget.children[1].classList.add("disable");
    }
    ctx.update();
  };

  const renderLegend = (chart) => {
    const { data } = chart;
    return data.datasets.map(({ label, borderColor, data }, i) => `
    <div class="legendItem">
      <div>
        <div style="background-color: ${borderColor};">
      </div>
        <hr style="background-color: ${borderColor};">
      </div>
    ${`<span class="label" style="">${label || "No name"} (${data.reduce((sum, cur) => sum += cur, 0)})</span>`}
    </div>
    `).join("");
  };

  useEffect(() => {
    if (data) {
      const result = {};
      const labels = [];
      let newData = Object.keys(data).map((el) => data[el]);
      newData = [...newData.splice(2, 1), ...newData];
      newData.forEach((values, i) => {
        if (Array.isArray(values)) {
          if (isSafari) {
            const safariValues = values.map((el) => el.split("-").join("/"));
            return safariValues.forEach((el) => labels.push(`${getMothName(getMonth(el))} ${getDay(el)}`));
          }
          values.forEach((el) => labels.push(`${getMothName(getMonth(el))} ${getDay(el)}`));
          return;
        }
        // result[key] = Object.values(data[key]);
        chartOptions.data.datasets[i].data = [...Object.values(values)];
        // chartOptions.data.datasets[i].borderColor = [...Object.values(values)].every((el) => !el) ? "rgba(0, 0, 0, 0)" : colors[i];
      });
      chartOptions.data.labels = labels;
      setChartData({
        data: { ...chartOptions.data },
        options: {
          ...chartOptions.options,
          legendCallback: (chart) => renderLegend(chart),
          scales: {
            ...chartOptions.scales,
            xAxes: [{ ...chartOptions.options.scales.xAxes[0], offset: result.length === 1 }],
            yAxes: [{
              afterTickToLabelConversion(q) {
                for (let tick in q.ticks) {
                  const part = q.ticks[tick].split(".");
                  if (part.length > 1) {
                    if (part[1] > 0 || q.ticks[tick] < 1) {
                      q.ticks[tick] = "";
                    } else {
                      q.ticks[tick] = Number(q.ticks[tick]).toFixed(0);
                    }
                  }
                }
                q.ticks[q.ticks.length - 1] = "0";
              },
            }],
          },
        },
      });
    }
  }, [data]);

  useEffect(() => {
    if (chartRef.current?.chartInstance) {
      document.querySelector("#lineChart").innerHTML = chartRef.current?.chartInstance?.generateLegend();
      document.querySelectorAll(".legendItem").forEach((item, index) => {
        // if (item.children[1].className.includes("disabled")) return;
        item.addEventListener("click", (e) => handleClickLabel(e, index));
      });
    }
  }, [chartData]);

  return (
    <div className={classes.chartContainer}>
      <div id='lineChart'></div>
      {chartData === undefined ? (
        <Loader styles={{ position: "absolute", top: "50%", left: "50%" }} />
      ) : (
        <>
          {chartData?.data?.datasets[0]?.data?.filter((v) => v).length ? <Line ref={chartRef} options={chartData?.options} data={chartData?.data} />
            : (
              <div className={classes.noDataText}>No data for this period</div>
            )}
        </>
      )}
    </div>
  );
}
