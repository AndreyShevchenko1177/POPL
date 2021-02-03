import React from "react";
import { Button } from "@material-ui/core";

function CButton({
  color,
  variant,
  size,
  startIcon,
  className,
  cb,
  children,
  classes,
  fullWidth,
}) {
  return (
    <Button
      color={color}
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      startIcon={startIcon}
      className={className}
      classes={classes}
      onClick={cb}
    >
      {children}
    </Button>
  );
}

export default CButton;
