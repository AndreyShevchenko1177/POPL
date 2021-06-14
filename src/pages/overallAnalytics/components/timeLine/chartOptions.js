const chartOptions = {
  options: {
    maintainAspectRatio: false,
    spanGaps: true,
    scales: {
      xAxes: [
        {
          gridLines: {
            // offsetGridLines: true,

          },
          ticks: {
            autoskip: true,
            minRotation: 60,
            autoSkipPadding: 25,
          },
          distribution: "linear",
        },
      ],
    },
    legend: {
      display: false,
    },
  },
  data: {
    datasets: [
      {
        data: [],
        pointRadius: 3,
        label: "Total Pops",
        lineTension: 0.1,
        backgroundColor: "rgba(0, 0, 0, 0)",
        borderWidth: 3,
        borderColor: "rgba(0, 0, 0, 1)",
        maxBarThickness: 50,
        fill: true,
      },
      {
        data: [],
        pointRadius: 3,
        label: "Device",
        lineTension: 0.1,
        backgroundColor: "rgba(0, 0, 0, 0)",
        borderWidth: 3,
        borderColor: "rgba(62, 116, 226, 1)",
        maxBarThickness: 50,
        fill: true,
      },
      // {
      //   data: [],
      //   pointRadius: 3,
      //   label: "App QR Code",
      //   lineTension: 0.1,
      //   backgroundColor: "rgba(0, 0, 0, 0)",
      //   borderWidth: 3,
      //   borderColor: "rgba(107, 187, 228, 1)",
      //   maxBarThickness: 50,
      //   fill: true,
      // },
      {
        data: [],
        pointRadius: 3,
        lineTension: 0.1,
        label: "QR Code",
        backgroundColor: "rgba(0, 0, 0, 0)",
        borderWidth: 3,
        borderColor: "rgba(107, 187, 228, 1)",
        maxBarThickness: 50,
        fill: true,
      },

    ],
  },
};

export default chartOptions;

export const chartProfileOptions = {
  options: {
    maintainAspectRatio: false,
    spanGaps: true,
    scales: {
      xAxes: [
        {
          gridLines: {
            // offsetGridLines: true,

          },
          ticks: {
            autoskip: true,
            minRotation: 60,
            autoSkipPadding: 25,
          },
          distribution: "linear",
        },
      ],
    },
    legend: {
      display: false,
    },
  },
  data: {
    datasets: [],
  },
};

export const colors = [
  "rgb(15, 182, 186)",
  "rgb(0, 142, 204)",
  "rgb(101, 147, 245)",
  "rgb(76, 81, 109)",
  "rgb(0, 128, 129)",
  "rgb(115, 194, 251)",
  "rgb(114, 133, 165)",
  "rgb(79, 151, 163)",
  "rgb(87, 160, 211)",
  "rgb(70, 130, 180)",
  "rgb(129, 216, 208)",
  "rgb(137, 207, 240)",
  "rgb(88, 139, 174)",
  "rgb(126, 249, 255)",
  "rgb(149, 200, 216)",
  "rgb(176, 223, 229)",
  "rgb(63, 224, 208)",
  "rgb(40, 139, 141)",
  "rgb(13, 64, 174)",
  "rgb(109, 190, 203)",
  "rgb(97, 152, 129)",
  "rgb(99, 123, 255)",
];
