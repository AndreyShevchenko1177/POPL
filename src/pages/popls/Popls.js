import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
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
  const [popls, setPopls] = useState([]);

  function handleOpen() {
    setFormOpen(true);
  }
  function handleClose() {
    setFormOpen(false);
  }

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = [...popls];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setPopls(items);
  }

  useEffect(() => {
    dispatch(getPoplsAction());
  }, [dispatch]);

  useEffect(() => {
    setPopls(data);
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
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="list">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {popls.map((el, index) => (
                  <Draggable key={el.id} draggableId={el.id + ""} index={index}>
                    {(provided) => (
                      <div
                        draggable="true"
                        className={classes.container}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <PoplCard
                          id={el.id}
                          heading={el.name}
                          src={el.logo}
                          name={el.name}
                          types={el.types}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </Grid>
      <Dialog open={openForm} onClose={handleClose} maxWidth="md">
        <DialogContent>
          <PoplForm handleClose={handleClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
