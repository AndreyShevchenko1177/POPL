import React from "react";
import { Chip, Tooltip } from "@material-ui/core";
import RemoveIcon from "@material-ui/icons/RemoveCircleOutlineSharp";
import SvgMaker from "../../svgMaker/SvgMaker";
import useStyles from "../styles";

const styles = {
  chipButton: {
    top: "-2px",
    left: "46%",
  },
  fileName: {
    fontSize: "12px",
    paddingTop: "5px",
  },
  fileNameSpan: {
    width: "70px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
};

function Preview({
  deleteAction, fileName, width = "100px", height = "100px", small,
}) {
  const classes = useStyles();
  return (
    <Tooltip disableHoverListener={!small} title={fileName} placement="top">
      <div className={small ? classes.imageContainerSmall : classes.imageContainer}>
        <SvgMaker name={"csv"} fill='#fff' width={width} height={height} />
        <Chip
          style={small ? styles.chipButton : {}}
          className={classes.chipButton}
          deleteicon={<RemoveIcon />}
          size='medium'
          onDelete={deleteAction}
        />
        <div style={small ? styles.fileName : {}} className={classes.fileName}>
          <span style={small ? styles.fileNameSpan : {}}>{fileName}</span>
          {!small && <SvgMaker name="successCheckMark" fill='#fff' width={"20px"} height={"20px"} />}
        </div>
      </div>
    </Tooltip>
  );
}

export default Preview;
