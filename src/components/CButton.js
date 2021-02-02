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
}) {
  return (
    <Button
      color={color}
      variant={variant}
      size={size}
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
