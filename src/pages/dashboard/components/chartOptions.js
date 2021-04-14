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
        label: "Popl",
        lineTension: 0.1,
        backgroundColor: "rgba(0, 0, 0, 0)",
        borderWidth: 3,
        borderColor: "rgba(62, 116, 226, 1)",
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
        borderColor: "rgba(107, 187, 228, 1)",
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
        borderColor: "rgba(213, 229, 106, 1)",
        maxBarThickness: 50,
        fill: true,
      },
    ],
  },
};

export default chartOptions;
