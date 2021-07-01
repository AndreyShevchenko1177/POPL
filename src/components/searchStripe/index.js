/* eslint-disable guard-for-in */
import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  Paper, InputBase, Checkbox, Button,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import CloseIcon from "@material-ui/icons/Close";
import { useSelector } from "react-redux";
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
  styles,
}) {
  const classes = useStyles();
  const history = useHistory();
  const companyInfo = useSelector(({ generalSettingsReducer }) => generalSettingsReducer.companyInfo.data);

  const dataCheckboxes = useSelector(({ realTimeAnalytics }) => realTimeAnalytics.checkBoxData);
  const selectedCheckBox = Object.keys(dataCheckboxes.profiles).filter((el) => dataCheckboxes.profiles[el]).map((el) => Number(el));
  const isSelected = Object.values(dataCheckboxes.profiles).includes(true);

  return (
    <div style={styles?.containerWrapper || {}} className={classes.containerWrapper}>
      <div
        className={classes.searchContainer}
        style={{
          backgroundColor: companyInfo && companyInfo[1] ? `${companyInfo[1]}0f` : "#ffffff",
        }}
      >
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
        {showCRM && <div className={classes.buttonWrapper}>
          <Button
            variant="contained"
            color="primary"
            classes={{ root: classes.button, iconSizeMedium: classes.addIcon }}
            onClick={() => history.push("/connections/export-to-crm", { path: "/connections", rootPath: "/connections" })}
          >
          Export to CRM
          </Button>
        </div>}
        <div>
          {showAll
        && <div className='relative'>
          <div className={classes.buttonWrapper}>
            {isSelected && <div className={classes.sortText}>
              <span style={{ whiteSpace: "nowrap" }}>
                <i>{`${selectedCheckBox.length} accounts`}</i>
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
            onClick={() => history.push("/templates", { rootPath: "/accounts", path: "/accounts" })}
            name='action'
          >
            {"Templates"}
          </Button>
        </div>}
        <Paper component="form" className={classes.root} elevation={0}>
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
    </div>

  );
}

export default SearchStripe;
