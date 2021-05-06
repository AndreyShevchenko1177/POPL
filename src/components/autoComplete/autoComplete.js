import React, {
  useState, useEffect, useRef,
} from "react";
import clsx from "clsx";
import { useHistory } from "react-router-dom";
import {
  OutlinedInput, IconButton, InputAdornment,
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import useStyles from "./styles/styles";

function AutoComplete({
  data, label, name, startFilter, hideAutoComplete, pseudoname,
}) {
  const classes = useStyles();
  const history = useHistory();
  const itemRef = useRef();
  const [value, setValue] = useState("");
  const [activeItem, setActiveItem] = useState(-1);
  const [localData, setLocalData] = useState([]);

  const handleChange = (event) => {
    setValue(event.target.value);
    if (!event.target.value) {
      setLocalData(data);
      return setValue("");
    }
    const result = data.filter((item) => item.name.toLowerCase().includes(event.target.value.toLowerCase()));
    setLocalData(result);
  };

  const selectItem = (event, selectedValue, item) => {
    startFilter(event, selectedValue);
    setValue(selectedValue);
    hideAutoComplete();
    if (pseudoname === "popl") {
      const popl = data.find((el) => el.id === item.id);
      return history.push("/popls", {
        profilesData: {
          ...popl, disabled: false,
        },
      });
    }
    const connection = data.find((el) => el.id === item.id);
    history.push("/connections", { ...connection });
  };

  const setSelectedItem = (event, selectedValue, item) => {
    selectItem(event, selectedValue, item);
  };

  const setSelectedItemByKey = (event) => {
    if (event.key === "ArrowDown") {
      if (activeItem >= localData.length - 1) return setActiveItem(0);
      setActiveItem(activeItem + 1);
    }
    if (event.key === "ArrowUp") {
      if (activeItem <= 0) return setActiveItem(localData.length - 1);
      setActiveItem(activeItem - 1);
    }
    if (event.key === "Enter") {
      const selectedItem = data.find((item) => item.name === itemRef.current.dataset.name);
      selectItem(event, selectedItem.name, selectedItem);
    }
  };

  const clearSelectedItem = () => {
    setValue("");
  };

  const onMouseEvent = (event) => {
    setActiveItem(event.target.dataset.key);
  };

  useEffect(() => {
    itemRef.current?.scrollIntoView(false);
  }, [activeItem]);

  useEffect(() => {
    if (data) {
      setLocalData(data);
    }
  }, [data]);

  return (
    <div>
      <OutlinedInput
        value={value}
        tabIndex={1}
        autoFocus
        classes={{ root: classes.outlinedInput }}
        onChange={handleChange}
        onKeyDown={setSelectedItemByKey}
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
        {localData.length ? localData.map((item, key) => (
          <div onMouseMove={onMouseEvent} data-key={key} ref={activeItem == key ? itemRef : null} data-name={item.name} className={clsx(classes.listItem, { [classes.activeListItem]: activeItem === key })} key={key} tabIndex={1} onClick={(event) => setSelectedItem(event, item.name, item)}>
            <p data-key={key}>{item.name || item.url}</p>
          </div>
        )) : <div className={classes.nothingFound}> Nothing found </div>}
      </div>
    </div>
  );
}

export default AutoComplete;