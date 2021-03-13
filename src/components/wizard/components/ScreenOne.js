import React from "react";
import icons from "../../../pages/profiles/components/profilelsIcons/icons";
import useStyles from "../styles/styles";

function ScreenOne({ data, onClick }) {
  const classes = useStyles();
  return (
    <>
      {data.map(({ title, value, id }, key) => (
        <div
          key={key}
          className={classes.link}
          onClick={() => onClick({
            title, value, id, image: icons[id],
          })}
        >
          <img style={{ width: "60px" }} src={icons[id]} alt={title} />
        </div>
      ))}
    </>
  );
}

export default ScreenOne;
