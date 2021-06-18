import React, {
  useState, useEffect, useRef,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import { useHistory } from "react-router-dom";
import {
  OutlinedInput, IconButton, InputAdornment, Checkbox,
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import useStyles from "./styles/styles";
import { setCheckboxAction, clearChecboxAction } from "../../pages/overallAnalytics/store/actions";

function AutoComplete({
  data, label, startFilter, hideAutoComplete, pseudoname, customOnchange, customState, filterValue,
}) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const itemRef = useRef();
  const [value, setValue] = useState("");
  const [activeItem, setActiveItem] = useState({ value: -1, event: "" });
  const [localData, setLocalData] = useState([]);
  const checkboxes = useSelector(({ realTimeAnalytics }) => realTimeAnalytics.checkBoxData);

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
    dispatch(clearChecboxAction());
    startFilter(event, selectedValue, item);
    setValue(selectedValue);
    hideAutoComplete();
    if (pseudoname === "popl") {
      const popl = data.find((el) => el.id === item.id);
      return history.push("/popls", {
        profilesData: {
          ...popl, disabled: false,
        },
      });
    } if (pseudoname === "analytics") {
      return history.push("/analytics", item);
    }
    const connection = data.find((el) => el.id === item.id);
    history.push("/connections", { ...connection });
  };

  const setSelectedItem = (event, selectedValue, item) => {
    selectItem(event, selectedValue, item);
    customState?.setProfileCountFilter({
      changeByTap: "", changeByKey: "",
    });
  };

  const setSelectedItemByKey = (event) => {
    if (event.key === "ArrowDown") {
      if (activeItem.value >= localData.length - 1) return setActiveItem({ value: 0, event: "key" });
      setActiveItem({ value: activeItem.value + 1, event: "key" });
    }
    if (event.key === "ArrowUp") {
      if (activeItem.value <= 0) return setActiveItem({ value: localData.length - 1, event: "key" });
      setActiveItem({ value: activeItem.value - 1, event: "key" });
    }
    if (event.key === "Enter") {
      if (pseudoname === "count") {
        customState?.setProfileCountFilter((pc) => ({ ...pc, changeByKey: event.target.value }));
      }
      if (!itemRef.current) return;
      const selectedItem = data.find((item) => item.name === itemRef.current.dataset.name);
      selectItem(event, selectedItem.name, selectedItem);
    }
  };

  const clearSelectedItem = () => {
    setValue("");
    customState?.setProfileCountFilter({
      changeByTap: "", changeByKey: "",
    });
  };

  const onMouseEvent = (event) => {
    setActiveItem({ value: Number(event.target.dataset.key), event: "mouse" });
  };

  const handleChangeCheckBox = (event) => {
    dispatch(setCheckboxAction({ id: event.target.name, checked: event.target.checked }));
  };

  useEffect(() => {
    if (activeItem.event === "mouse") return;
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
        value={pseudoname === "count" ? customState?.profileCountFilter?.changeByTap : value}
        tabIndex={1}
        autoFocus
        classes={{ root: classes.outlinedInput }}
        onChange={customOnchange || handleChange}
        onKeyDown={setSelectedItemByKey}
        placeholder={label}
        variant='outlined'
        size="small"
        fullWidth
        type={pseudoname === "count" ? "number" : "text"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton aria-label="clear" size="small" onClick={clearSelectedItem}>
              <ClearIcon fontSize="inherit" />
            </IconButton>
          </InputAdornment>
        }
      />
      <div className={classes.listItemContainer}>
        {localData.length || pseudoname === "count" ? localData.map((item, key) => (
          pseudoname === "analytics"
            ? <div key={key} onMouseMove={onMouseEvent} data-key={key} ref={activeItem.value == key ? itemRef : null} data-name={item.name} className={clsx(classes.listItem, classes.dataWrapper, { [classes.activeListItem]: activeItem.value === key })} tabIndex={1} >
              <div>
                <Checkbox
                  color='primary'
                  disabled={!!filterValue}
                  checked={checkboxes[item.id] || false}
                  name={String(item.id)}
                  onChange={handleChangeCheckBox}
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
              </div>
              <div className={classes.labelContainer}>
                <p data-key={key}>{item.name}</p>
              </div>
            </div>
            : <div onMouseMove={onMouseEvent} data-key={key} ref={activeItem.value == key ? itemRef : null} data-name={item.name} className={clsx(classes.listItem, { [classes.activeListItem]: activeItem.value === key })} key={key} tabIndex={1} onClick={(event) => setSelectedItem(event, item.name, item)}>
              <p data-key={key}>{item.name}</p>
            </div>

        )) : <div className={classes.nothingFound}> Nothing found </div>}
      </div>
    </div>
  );
}

export default AutoComplete;
