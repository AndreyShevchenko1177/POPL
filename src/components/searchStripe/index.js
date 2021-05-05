import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  Paper, InputBase, Checkbox, Button,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import CloseIcon from "@material-ui/icons/Close";
import useStyles from "./styles/styles";
import CustomSelect from "../customSelect";
import Filters from "../filters";

function SearchStripe({
  handleOpen,
  btn_title,
  checked,
  handleCheck,
  searchValue,
  handleSearch,
  arrowHandler = () => console.log("add event"),
  selectObject,
  disabled,
  setFilters,
  isShow,
  isFetching,
  showCRM,
  showAll = true,
  isShowSortBtn,
  checkboxes = {},
  templates,
  filterConfig,
  autoComleteData,
}) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

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
          selectName='action'
          checkProfiles={Object.values(checkboxes).filter(({ checked }) => checked).map(({ id }) => id)}
          config={selectObject.config}
          isOpen={selectObject.openProfileSelect.action.open}
          events={{ checkHandler: selectObject.selectCheck, hideSelectHandler: selectObject.setOpenProfileSelect, btnHandler: selectObject.selectBtn }}
        />}
      </div>
      <div>
        {showAll
        && <div className='relative'>
          <div className={classes.buttonWrapper}>
            {autoComleteData && autoComleteData.some((item) => (!item.url ? item.name === location.state?.name : item.profileOwner === location.state?.profilesData?.name)) && <div className={classes.sortText}>
              <span style={{ whiteSpace: "nowrap" }}>
                <i>{location.state?.name || location.state?.profilesData?.name}</i>
              </span>
              <CloseIcon style={{
                cursor: "pointer", color: "#666666", fontSize: 20, marginLeft: 5,
              }} onClick={selectObject.clearInput}/>
            </div>}
            <Button
              variant='contained'
              color='primary'
              classes={{ root: classes.actionButton, iconSizeMedium: classes.addIcon }}
              onClick={() => arrowHandler(true, "filter")}
              endIcon={<KeyboardArrowDownIcon />}
              name='filter'
            >
            Filter
            </Button>
            {!disabled && <CustomSelect
              selectName='filter'
              config={filterConfig}
              autoComleteData={autoComleteData}
              isOpen={selectObject.openProfileSelect.filter.open}
              events={{ handleChange: selectObject.handleChange, hideSelectHandler: selectObject.setOpenProfileSelect, clearInput: selectObject.clearInput }}
            />}
          </div>
        </div>}
      </div>
      {!showAll && <div className={classes.buttonWrapper}>
        <Button
          variant="contained"
          color="primary"
          classes={{ root: classes.actionButton, iconSizeMedium: classes.addIcon }}
          endIcon={<KeyboardArrowDownIcon />}
          disabled={!Object.values(checkboxes).some((el) => el.checked)}
          onClick={() => arrowHandler(true, "action")}
          name='action'
        >
          {"Actions"}
        </Button>
      </div>}

      {isShowSortBtn && <div className='relative'>
        <div className={classes.buttonWrapper}>
          {selectObject.sortConfig.some(({ active }) => active) && <div className={classes.sortText}>
            <span>
              <i>{selectObject.sortConfig.find(({ active }) => active)?.label}</i>
            </span>
            <CloseIcon style={{
              cursor: "pointer", color: "#666666", fontSize: 20, marginLeft: 5,
            }} onClick={selectObject.resetSort}/>
          </div>}
          <Button
            variant="contained"
            color="primary"
            style={{ whiteSpace: "nowrap" }}
            classes={{ root: classes.actionButton, iconSizeMedium: classes.addIcon }}
            endIcon={<KeyboardArrowDownIcon />}
            onClick={() => arrowHandler(true, "sort")}
            name='sort'
          >
            {"Sort by"}
          </Button>
          {!disabled && <CustomSelect
            selectName='sort'
            checkProfiles={Object.values(checkboxes).filter(({ checked }) => checked).map(({ id }) => id)}
            config={selectObject.sortConfig}
            isOpen={selectObject.openProfileSelect.sort.open}
            events={{ checkHandler: selectObject.selectCheck, hideSelectHandler: selectObject.setOpenProfileSelect, btnHandler: selectObject.sortHandler }}
          />}
        </div>
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
      {templates && <div className={classes.buttonWrapper}>
        <Button
          variant="contained"
          color="primary"
          style={{ minWidth: 100 }}
          classes={{ root: classes.button, iconSizeMedium: classes.addIcon }}
          onClick={() => history.push("/templates")}
          name='action'
        >
          {"Templates"}
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
          onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
          className={classes.searchInput}
          value={searchValue}
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
