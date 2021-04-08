/* eslint-disable guard-for-in */
import React, { useState, useEffect, useRef } from "react";
import { Bar, Line } from "react-chartjs-2";
import chartOptions from "./chartOptions";
import Loader from "../../../components/Loader";
import useStyles from "./styles/style";
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
    } else {
      e.currentTarget.lastElementChild.classList.add("disable-legend");
    }
    ctx.update();
  };

  const renderLegend = (chart) => {
    const { data } = chart;
    return data.datasets.map(({ label, borderColor }, i) => `
    <div class="legendItem" style="display: flex; align-items: center; height: 30px: max-width: 200px; cursor: pointer;">
      <div style="position: relative; width: 100px; height: 30px; margin-right: 10px">
        <div style="position: absolute; width: 20px; height: 20px; background-color: ${borderColor}; border-radius: 50%; top: 50%; left: 50%; transform: translate(-50%, -50%)">
      </div>
        <hr style="width: 100px; position: absolute; top: 50%; background-color: ${borderColor}; transform: translateY(-50%); height: 5px; border: none; margin: 0; border-radius: 5px">
      </div>
    ${label && `<span class="label" style="line-height: 30px">${label}</span>`}
    </div>
    `).join("");
  };

  useEffect(() => {
    if (data) {
      const result = {};
      const labels = [];
      Object.keys(data).forEach((key, i) => {
        if (key === "labels") {
          data[key].forEach((el) => labels.push(`${getMothName(getMonth(el))} ${getDay(el)}`));
          return;
        }
        result[key] = Object.values(data[key]);
        chartOptions.data.datasets[i].data = [...Object.values(data[key])];
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
