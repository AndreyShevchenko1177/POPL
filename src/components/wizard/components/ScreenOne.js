import React from "react";
import useStyles from "../styles/styles";

function ScreenOne({ data, onClick }) {
  const classes = useStyles();
  return (
    <>
      {data.map(({ id, icon }, key) => (
        <div
          key={key}
          className={classes.link}
          onClick={() => onClick({
            icon, id,
          })}
        >
          <img style={{ width: "60px" }} src={icon} alt={id} />
        </div>
      ))}
    </>
  );
}

export default ScreenOne;
