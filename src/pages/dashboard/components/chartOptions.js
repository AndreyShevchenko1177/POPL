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
        lineTension: 0.1,
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        borderWidth: 3,
        borderColor: "rgba(0, 0, 0, 1)",
        maxBarThickness: 50,
        // hoverBackgroundColor: "rgba(255,99,132,0.4)",
        // hoverBorderColor: "rgba(255,99,132,1)",
        fill: true,
      },
    ],
  },
};

export default chartOptions;
