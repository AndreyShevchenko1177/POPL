const chartOptions = {
  options: {
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          gridLines: {
            offsetGridLines: true,
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
        pointRadius: 0,
        backgroundColor: "rgba(89, 185, 158, 0.7)",
        borderWidth: 1,
        borderColor: "rgba(89, 185, 158, 1)",
        // hoverBackgroundColor: "rgba(255,99,132,0.4)",
        // hoverBorderColor: "rgba(255,99,132,1)",
        fill: true,
      },
    ],
  },
};

export default chartOptions;
