import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function Loader({ containerStyles = {}, styles = {} }) {
  return (
    <div style={containerStyles}>
      <CircularProgress style={styles} />
    </div>
  );
}
