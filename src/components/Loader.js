import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function Loader({ containerStyles = {}, styles = {}, size = 40 }) {
  return (
    <div style={containerStyles}>
      <CircularProgress style={styles} size={size} />
    </div>
  );
}
