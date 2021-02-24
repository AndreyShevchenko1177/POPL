const chartOptions = {
  options: {
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
    labels: [
      "2020-12-17T13:03:00Z",
      "2021-01-16T13:02:00Z",
      "2021-02-17T14:12:00Z",
    ],
    datasets: [
      {
        data: [],
        backgroundColor: [
          // "rgba(255, 99, 132, 0.2)",
          "rgba(89, 185, 158, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          // "rgba(255,99,132,1)",
          "rgba(89, 185, 158, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
        fill: true,
      },
    ],
  },
};

export default chartOptions;
