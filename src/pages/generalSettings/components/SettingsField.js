import { useRef } from "react";
import { TextField, Typography } from "@material-ui/core";
import useStyles from "./styles";

function SettingsField({
  title, name, value, handleChange, placeholder, type,
}) {
  const classes = useStyles();
  const colorInput = useRef(null);

  const openColorPicker = () => {
    colorInput.current?.click();
  };

  return (
    <div className={classes.fieldContainer}>
      <div className={classes.paddingWrapper}>
        <Typography variant="subtitle1" classes={{ subtitle1: classes.fieldTitle }}>{title}</Typography>
        {
          type !== "color"
            ? <TextField
              name={name}
              value={value}
              placeholder={placeholder}
              onChange={handleChange}
              InputProps={ { disableUnderline: true } }
              inputProps={{ type: type || "text" }}
            />
            : <div className={classes.colorInputContainer}>
              <div
                onClick={openColorPicker}
                style={{ backgroundColor: value, border: value ? "none" : "1px solid #bababa" }}
                className={classes.colorElement}
              >
                {!value && "Click to choose a color"}
                <input
                  name={name}
                  onChange={handleChange}
                  ref={colorInput}
                  type="color"
                />
              </div>
            </div>
        }
      </div>
    </div>
  );
}

export default SettingsField;
