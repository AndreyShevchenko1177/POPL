import React from "react";
import useStyle from "../styles/styles";

function ChoiceCard({ Icon, title, description }) {
  const classes = useStyle();
  return (
    <div className={classes.choiceCardContainer}>
      <div className={classes.choiceCardWrapper}>
        <div>
          {Icon()}
        </div>
        <div className={classes.choiceCardTitle}>
          {title}
        </div>
        <div className={classes.choiceCardDescription}>
          {description}
        </div>
      </div>
    </div>
  );
}

export default ChoiceCard;
