const chartOptions = {
  options: {
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          type: "time",
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
        backgroundColor: ["rgba(89, 185, 158, 0.2)"],
        borderWidth: 1,
        fill: true,
      },
    ],
  },
};

export default chartOptions;
