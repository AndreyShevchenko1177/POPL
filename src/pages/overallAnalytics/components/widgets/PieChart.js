import React, { useRef, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import useStyles from "./styles";
import Loader from "../../../../components/Loader";

function PieChart({ data = {}, index }) {
  const classes = useStyles();
  const chart = useRef();

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
              <div id="legend-${i}-item" class="legend-item" >
                <span style="background-color:
                  ${data.datasets[0].backgroundColor[i]}; margin-right: 10px; border-radius: 50%;">
                  &nbsp;&nbsp;&nbsp;&nbsp;
                </span>
                ${data.labels[i] && `<span class="label">${data.labels[i]}</span>`}
              </div>
        `,
      )
      .join("");
  };

  useEffect(() => {
    if (chart.current?.chartInstance) {
      document.querySelector(`#legend${index}`).innerHTML = chart.current?.chartInstance?.generateLegend();
      document.querySelectorAll(`#legend${index} div`).forEach((item, index) => {
        item.addEventListener("click", (e) => handleClickLabel(e, index));
      });
    }
  }, [data]);

  return data
    ? <div className='chart-container'>
      <div className='chart-wrapper'>
        <Doughnut
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
    : <Loader
      containerStyles={{
        width: "40px", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
      }}
    />;
}

export default PieChart;
