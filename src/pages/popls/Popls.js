import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import clsx from "clsx";
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
  const [characters, updateCharacters] = useState([]);
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [dragActiveClassName, setDragActiveClassName] = useState(false);

  function handleOpen() {
    setFormOpen(true);
  }
  function handleClose() {
    setFormOpen(false);
  }

  useEffect(() => {
    dispatch(getPoplsAction());
  }, [dispatch]);

  useEffect(() => {
    updateCharacters(data);
  }, [data]);

  return (
    <div className="profiles-page-container">
      <div className={classes.toolbar} style={{ minHeight: "80px" }}>
        <Header title="Profile" />
      </div>
      <Grid container alignItems="center">
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
          <Paper component="form" fullWidth className={classes.root}>
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
            Add New
          </Button>
        </div>
        {characters.map((el, index) => (
          <div
            className={clsx(classes.container, {
              [classes.activeDragContainer]: dragActiveClassName,
            })}
            key={el.id}
            data-index={index}
            draggable="true"
            onDragStart={(e) => setFrom(Number(e.currentTarget.dataset.index))}
            onDragOver={(e) => {
              e.preventDefault();
              if (from !== to && index === to) setDragActiveClassName(true);
              setTo(Number(e.currentTarget.dataset.index));
            }}
            onDragEnd={() => {
              const items = Array.from(characters);
              [items[from], items[to]] = [items[to], items[from]];
              updateCharacters(items);
              setDragActiveClassName(false);
              setFrom(null);
              setTo(null);
            }}
          >
            <PoplCard
              id={el.id}
              heading={el.name}
              src={el.logo}
              name={el.name}
              types={el.types}
            />
          </div>
        ))}
      </Grid>
      <Dialog open={openForm} onClose={handleClose} maxWidth="md">
        <DialogContent>
          <PoplForm handleClose={handleClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
