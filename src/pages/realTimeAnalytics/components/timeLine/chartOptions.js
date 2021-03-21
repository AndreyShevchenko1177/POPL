const chartOptions = {
  options: {
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
        fill: true,
      },
    ],
  },
};

export default chartOptions;
