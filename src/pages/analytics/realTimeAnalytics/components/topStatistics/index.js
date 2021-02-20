import React from "react";
import StatisticItem from "./statisticItem";
import "./styles/styles.css";
import useStyles from "./styles/styles";

const itemsConfig = [
  {
    id: 1,
    title: "Pop Count",
    value: "2,500",
    percentage: "2%",
    isTop: false,
  },
  {
    id: 2,
    title: "Link Taps",
    value: "200.50",
    percentage: "3%",
    isTop: true,
  },
  {
    id: 3,
    title: "Views",
    value: "1,200",
    percentage: "12%",
    isTop: true,
  },
  {
    id: 4,
    title: "Total Profiles",
    value: "2,000",
    percentage: "5%",
    isTop: false,
  },
  {
    id: 5,
    title: "Total Popls",
    value: "2,100",
    percentage: "6%",
    isTop: true,
  },
];

function TopStatistics() {
  const classes = useStyles();
  return (
    <div className="top-statistics-container">
      {itemsConfig.map(({ id, title, value, percentage, isTop }) => (
        <React.Fragment key={id}>
          <StatisticItem
            title={title}
            value={value}
            percentage={percentage}
            isTop={isTop}
          />
          <div className="top-statistics-items-divider"></div>
        </React.Fragment>
      ))}
    </div>
  );
}

export default TopStatistics;
