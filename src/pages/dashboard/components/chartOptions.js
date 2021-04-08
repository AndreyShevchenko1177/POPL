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
        label: "Popl",
        lineTension: 0.1,
        backgroundColor: "rgba(0, 0, 0, 0)",
        borderWidth: 3,
        borderColor: "rgba(244, 67, 54, 1)",
        maxBarThickness: 50,
        fill: true,
      },
      {
        data: [],
        pointRadius: 3,
        label: "QR Code",
        lineTension: 0.1,
        backgroundColor: "rgba(0, 0, 0, 0)",
        borderWidth: 3,
        borderColor: "rgba(76, 175, 80, 1)",
        maxBarThickness: 50,
        fill: true,
      },
      {
        data: [],
        pointRadius: 3,
        lineTension: 0.1,
        label: "Wallet",
        backgroundColor: "rgba(0, 0, 0, 0)",
        borderWidth: 3,
        borderColor: "rgba(255, 255, 59, 1)",
        maxBarThickness: 50,
        fill: true,
      },
      {
        data: [],
        pointRadius: 3,
        label: "Total Pops",
        lineTension: 0.1,
        backgroundColor: "rgba(0, 0, 0, 0)",
        borderWidth: 3,
        borderColor: "rgba(70, 70, 70, 0.87)",
        maxBarThickness: 50,
        fill: true,
      },
    ],
  },
};

export default chartOptions;
