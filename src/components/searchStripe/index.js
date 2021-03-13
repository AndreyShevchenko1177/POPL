import React from "react";
import {
  Paper, InputBase, Checkbox, Button,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import useStyles from "./styles/styles";
import CustomSelect from "../customSelect";

function SearchStripe({
  handleOpen, btn_title, checked, handleCheck, handleSearch, searchValue, search, arrowHandler = () => console.log("add event"), selectObject, disabled,
}) {
  const classes = useStyles();
  return (
    <div className={classes.searchContainer}>
      <div className={classes.checkbox}>
        <Checkbox
          checked={checked}
          onChange={handleCheck}
          color="primary"
          inputProps={{ "aria-label": "primary checkbox" }}
          style={{ padding: "0px" }}
        />
        <KeyboardArrowDownIcon
          style={{ color: "#7d7d7d", cursor: "pointer" }}
          onClick={() => arrowHandler(true)}
        />
        {!disabled && <CustomSelect
          config={selectObject.config}
          isOpen={selectObject.openProfileSelect.open}
          events={{ checkHandler: selectObject.selectCheck, hideSelectHandler: selectObject.setOpenProfileSelect, btnHandler: selectObject.selectBtn }}
        />}
      </div>
      <Paper component="form" className={classes.root} elevation={3}>
        <InputBase
          fullWidth
          className={classes.searchInput}
          onChange={handleSearch}
          value={searchValue}
          placeholder="Search"
          inputProps={{ "aria-label": "search here" }}
        />
        <div onClick={() => search(searchValue)}>
          <SearchIcon style={{ cursor: "pointer" }}/>
        </div>

      </Paper>
      <div className={classes.buttonWrapper}>
        <Button
          variant="contained"
          color="primary"
          classes={{ root: classes.button, iconSizeMedium: classes.addIcon }}
          startIcon={<AddIcon />}
          onClick={handleOpen}
        >
          {btn_title}
        </Button>
      </div>
    </div>
  );
}

export default SearchStripe;
