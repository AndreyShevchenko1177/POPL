import React from "react";
import { Chip } from "@material-ui/core";
import RemoveIcon from "@material-ui/icons/RemoveCircleOutlineSharp";
import SvgMaker from "../../svgMaker/SvgMaker";
import useStyles from "../styles";

function Preview({
  deleteAction, fileName, width = "50px", height = "50px",
}) {
  const classes = useStyles();
  return (
    <div className={classes.imageContainer}>
      <SvgMaker name={"csv"} fill='#fff' width={width} height={height} />
      <Chip
        className={classes.chipButton}
        deleteicon={<RemoveIcon />}
        size='medium'
        onDelete={deleteAction}
      />
      <div className={classes.fileName}>
        {fileName}
        <SvgMaker name="successCheckMark" fill='#fff' width={"20px"} height={"20px"} />
      </div>
    </div>
  );
}

export default Preview;
