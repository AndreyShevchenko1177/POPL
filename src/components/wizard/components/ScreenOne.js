import React from "react";
import clsx from "clsx";
import { Typography } from "@material-ui/core";
import useStyles from "../styles/styles";
import iconsByCategories from "../../../pages/profiles/components/profilelsIcons/iconsByCategories";
import icons from "../../../pages/profiles/components/profilelsIcons/icons";

const viewPortWidth = window.innerWidth;
function ScreenOne({ data, onClick }) {
  const classes = useStyles();
  return (
    <>
      {/* {data.map(({ id, icon }, key) => (
        <div
          key={key}
          className={classes.link}
          onClick={() => onClick({
            icon, id,
          })}
        >
          <img style={{ width: "60px" }} src={icon.icon} alt={id} />
        </div>
      ))} */}
      {Object.keys(iconsByCategories).map((cat, key) => (
        <div key={key}>
          <div className={classes.categoryTitle} key={key}>
            <Typography variant='subtitle2'>{cat}</Typography>
          </div>
          <div className={clsx(classes.categoryContainer, { [classes.categoryLastChild]: iconsByCategories[cat].length % (viewPortWidth < 1500 ? 3 : 8) === 1 })}>
            {iconsByCategories[cat].map(({ id }, key) => (
              <div
                key={key}
                className={classes.link}
                onClick={() => onClick({
                  icon: icons[id], id,
                })}
              >
                <img style={{ width: "60px" }} src={icons[id].icon} alt={id} />
                <Typography variant='h5'>{icons[id].text}</Typography>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

export default ScreenOne;
