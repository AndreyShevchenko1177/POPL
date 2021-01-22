import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Grid,
  InputBase,
  Paper,
  Checkbox,
  Dialog,
  DialogContent,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import Header from "./components/header";
import PoplCard from "./components/poplCard";
import PoplForm from "./components/addEditPopl";
import useStyles from "./styles/styles";
import { getPoplsAction } from "./store/actions";

export default function Popls() {
  const dispatch = useDispatch();
  const data = useSelector(({ poplsReducer }) => poplsReducer.allPopls.data);
  const classes = useStyles();
  const [openForm, setFormOpen] = useState(false);

  function handleOpen() {
    setFormOpen(true);
  }
  function handleClose() {
    setFormOpen(false);
  }

  useEffect(() => {
    dispatch(getPoplsAction());
  }, [dispatch]);

  return (
    <>
      <div className={classes.toolbar}>
        <Header title="Profile" />
      </div>
      <Grid container alignItems="center">
        <div className={classes.searchContainer}>
          <Grid item xs={1}>
            <div className={classes.checkbox}>
              <Checkbox
                // checked={checked}
                // onChange={handleChange}
                color="primary"
                inputProps={{ "aria-label": "primary checkbox" }}
              />
              <KeyboardArrowDownIcon
                style={{ color: "#7d7d7d", cursor: "pointer" }}
              />
            </div>
          </Grid>
          <Grid item xs={9} container justify="center">
            <Paper component="form" fullWidth className={classes.root}>
              <InputBase
                fullWidth
                className={classes.searchInput}
                placeholder="Search"
                inputProps={{ "aria-label": "search here" }}
              />
              <SearchIcon />
            </Paper>
          </Grid>
          <Grid item xs={1} container justify="center">
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              startIcon={<AddIcon />}
              onClick={handleOpen}
            >
              Add New
            </Button>
          </Grid>
        </div>
        {data.map((el) => (
          <PoplCard
            key={el.id}
            heading={el.name}
            src={el.logo}
            name={el.name}
            types={el.types}
          />
        ))}
      </Grid>
      <Dialog open={openForm} onClose={handleClose} maxWidth="md">
        <DialogContent>
          <PoplForm handleClose={handleClose} />
        </DialogContent>
      </Dialog>
    </>
  );
}
