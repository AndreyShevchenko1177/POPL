import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useHistory } from "react-router-dom";
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
import ProfileCard from "./components/profileCard";
import PoplForm from "./components/addEditPopl";
import useStyles from "./styles/styles";

export default function Profiles() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userData = useSelector(({ authReducer }) => authReducer.signIn.data);
  const classes = useStyles();
  const [openForm, setFormOpen] = useState(false);
  const [profiles, setProfiles] = useState([]);

  function handleOpen() {
    setFormOpen(true);
  }
  function handleClose() {
    setFormOpen(false);
  }

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = [...profiles];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setProfiles(items);
  }

  function handleClickPoplItem(id) {
    history.push(`/profiles/${id}`, userData);
  }

  useEffect(() => {
    if (userData) {
      setProfiles([
        {
          id: userData.id,
          name: userData.name,
          logo: userData.image,
          types: [
            "twitter",
            "instagram",
            "linkedin",
            "venmo",
            "snapchat",
            "twitter",
            "google",
            "youtube",
          ],
        },
      ]);
    }
  }, [userData]);

  return (
    <div className="profiles-page-container main-padding">
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
          <Paper component="form" className={classes.root}>
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
              <div
                className="full-w"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {profiles.map((el, index) => (
                  <Draggable key={el.id} draggableId={`${el.id}`} index={index}>
                    {(provided) => (
                      <div
                        // onClick={() => handleClickPoplItem(el.id)}
                        draggable="true"
                        className={classes.container}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <ProfileCard
                          id={el.id}
                          heading={el.name}
                          src={el.logo}
                          name={el.name}
                          types={el.types}
                          bio={el.bio}
                          handleClickPoplItem={() => handleClickPoplItem(el.id)}
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
