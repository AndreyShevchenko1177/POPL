import React from "react";
import useStyle from "../styles/styles";

function ChoiceCard({
  Icon, title, description, onClick, titleStyle,
}) {
  const classes = useStyle();
  return (
    // <div className={classes.choiceCardContainer}>
    <div onClick={onClick} className={classes.choiceCardWrapper}>
      <div>
        {Icon()}
      </div>
      <div className={classes.choiceCardTitle} style={titleStyle}>
        {title}
      </div>
      <div className={classes.choiceCardDescription}>
        {description}
      </div>
    </div>
    // </div>
  );
}

export default ChoiceCard;
