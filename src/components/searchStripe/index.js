import React from "react";
import { Paper, InputBase, Checkbox, Button } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import useStyles from "./styles/styles";

function SearchStripe({ handleOpen, btn_title }) {
  const classes = useStyles();

  return (
    <div className={classes.searchContainer}>
      <div className={classes.checkbox}>
        <Checkbox
          // checked={checked}
          // onChange={handleChange}
          color="primary"
          inputProps={{ "aria-label": "primary checkbox" }}
          style={{ padding: "0px" }}
        />
        <KeyboardArrowDownIcon
          style={{ color: "#7d7d7d", cursor: "pointer" }}
        />
      </div>
      <Paper component="form" className={classes.root} elevation={3}>
        <InputBase
          fullWidth
          className={classes.searchInput}
          placeholder="Search"
          inputProps={{ "aria-label": "search here" }}
        />
        <SearchIcon />
      </Paper>
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
  );
}

export default SearchStripe;
