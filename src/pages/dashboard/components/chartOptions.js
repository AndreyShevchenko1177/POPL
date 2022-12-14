const chartOptions = {
  options: {
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          gridLines: {
            // offsetGridLines: true,
          },
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

export const colors = [
  "rgba(0, 0, 0, 1)",
  "rgba(62, 116, 226, 1)",
  "rgba(107, 187, 228, 1)",
  "rgba(213, 229, 106, 1)",

];

export default chartOptions;
