const chartOptions = {
  options: {
    // scales: {
    //   xAxes: [
    //     {
    //       type: "time",
    //     },
    //   ],
    // },
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
        borderColor: "rgba(89, 185, 158, 1)",
        borderWidth: 1,
        maxBarThickness: 50,
        fill: true,
      },
    ],
  },
};

export default chartOptions;
