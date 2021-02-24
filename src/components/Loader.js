import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function Loader({ styles = {} }) {
  return (
    <div>
      <CircularProgress style={styles} />
    </div>
  );
}
