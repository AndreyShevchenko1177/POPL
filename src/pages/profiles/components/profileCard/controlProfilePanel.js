import React from "react";
import EditIcon from "@material-ui/icons/Edit";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import VisibilityIcon from "@material-ui/icons/Visibility";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import CButton from "../../../../components/CButton";

function ProfilePanel({ handleClickPoplItem }) {
  return (
    <>
      <CButton
        variant="outlined"
        size="small"
        startIcon={<EditIcon />}
        // className={classes.button}
        cb={() => console.log("edit")}
      >
        Edit
      </CButton>
      <CButton
        variant="outlined"
        size="small"
        color="primary"
        startIcon={<EqualizerIcon />}
        cb={() => console.log("Statistics")}
      >
        Statistics
      </CButton>
      <CButton
        variant="outlined"
        size="small"
        color="primary"
        startIcon={<VisibilityIcon />}
        cb={handleClickPoplItem}
      >
        Popls
      </CButton>
      <CButton
        variant="outlined"
        size="small"
        color="primary"
        startIcon={<ArrowRightIcon />}
        cb={() => console.log("View More")}
      >
        View More
      </CButton>
    </>
  );
}

export default ProfilePanel;
