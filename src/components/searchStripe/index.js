import React from "react";
import {
  Paper, InputBase, Checkbox, Button,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import clsx from "clsx";
import useStyles from "./styles/styles";
import CustomSelect from "../customSelect";
import Filters from "../filters";

function SearchStripe({
  handleOpen,
  btn_title,
  checked,
  handleCheck,
  handleSearch,
  arrowHandler = () => console.log("add event"),
  selectObject,
  disabled,
  setFilters,
  isShow,
  isFetching,
  showCRM,
  showAll = true,
  checkboxes = {},
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
          classes={{ root: "custom-checkbox-root" }}
          style={{ padding: "8px" }}
        />
        {/* <KeyboardArrowDownIcon
          style={{ color: "#7d7d7d", cursor: "pointer" }}
          onClick={() => arrowHandler(true)}
        /> */}
        {!disabled && <CustomSelect
          checkProfiles={Object.values(checkboxes).filter(({ checked }) => checked).map(({ id }) => id)}
          config={selectObject.config}
          isOpen={selectObject.openProfileSelect.open}
          events={{ checkHandler: selectObject.selectCheck, hideSelectHandler: selectObject.setOpenProfileSelect, btnHandler: selectObject.selectBtn }}
        />}
      </div>
      {!showAll && <div className={classes.buttonWrapper}>
        <Button
          variant="contained"
          color="primary"
          classes={{ root: classes.actionButton, iconSizeMedium: classes.addIcon }}
          endIcon={<KeyboardArrowDownIcon />}
          disabled={!Object.values(checkboxes).some((el) => el.checked)}
          onClick={() => arrowHandler(true)}
        >
          {"Actions"}
        </Button>
      </div>}
      <Filters
        isFetching={isFetching}
        setFilters={setFilters}
        disabled={isShow}
        showAll={showAll}
      />
      {btn_title && <div className={classes.buttonWrapper}>
        <Button
          variant="contained"
          color="primary"
          classes={{ root: classes.button, iconSizeMedium: classes.addIcon }}
          startIcon={<AddIcon />}
          onClick={handleOpen}
        >
          {btn_title}
        </Button>
      </div>}
      {showCRM && <div className={classes.buttonWrapper}>
        <Button
          variant="contained"
          color="primary"
          classes={{ root: classes.button, iconSizeMedium: classes.addIcon }}
          onClick={() => console.log("export to crm")}
        >
          Export to CRM
        </Button>
      </div>}
      <Paper component="form" className={classes.root} elevation={3}>
        <InputBase
          fullWidth
          className={classes.searchInput}
          onChange={handleSearch}
          placeholder="Search"
          inputProps={{ "aria-label": "search here" }}
        />
        <div>
          <SearchIcon style={{ cursor: "pointer" }}/>
        </div>
      </Paper>
    </div>
  );
}

export default SearchStripe;
