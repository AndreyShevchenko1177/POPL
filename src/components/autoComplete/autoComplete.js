import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  OutlinedInput, IconButton, InputAdornment,
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import useStyles from "./styles/styles";

function AutoComplete({
  data, label, name, startFilter,
}) {
  const classes = useStyles();
  const history = useHistory();
  const [value, setValue] = useState("");
  const [localData, setLocalData] = useState([]);

  const handleChange = (event) => {
    setValue(event.target.value);
    if (!event.target.value) {
      setLocalData(data);
      return setValue("");
    }
    const result = data.filter((item) => item[name].toLowerCase().includes(event.target.value.toLowerCase()));
    setLocalData(result);
  };

  const setSelectedItem = (event, selectedValue, item) => {
    startFilter(event, selectedValue);
    setValue(selectedValue);
    if (name === "profileOwner") {
      return history.push("/popls", { profilesData: { ...item, name: item.profileOwner, disabled: false } });
    }
    history.push("/connections", { ...item });
  };

  const clearSelectedItem = () => {
    setValue("");
  };

  useEffect(() => {
    if (data) {
      setLocalData(data);
    }
  }, [data]);

  return (
    <div>
      <OutlinedInput
        value={value}
        classes={{ root: classes.outlinedInput }}
        onChange={handleChange}
        placeholder={label}
        variant='outlined'
        size="small"
        fullWidth
        endAdornment={
          <InputAdornment position="end">
            <IconButton aria-label="clear" size="small" onClick={clearSelectedItem}>
              <ClearIcon fontSize="inherit" />
            </IconButton>
          </InputAdornment>
        }
      />
      <div className={classes.listItemContainer}>
        {localData.map((item, key) => (
          <div className={classes.listItem} key={key} onClick={(event) => setSelectedItem(event, item[name], item)}>
            <p>{item[name]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AutoComplete;
