import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Dialog, DialogContent } from "@material-ui/core";
import { getProfileAction } from "./store/actions";
import ProfileCard from "./components/profileCard";
import PoplForm from "./components/addEditPopl";
import SearchStripe from "../../components/searchStripe";
import useStyles from "./styles/styles";

export default function Profiles() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userData = useSelector(({ authReducer }) => authReducer.signIn.data);
  const profilesData = useSelector(
    ({ profilesReducer }) => profilesReducer.dataProfiles.data
  );
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
    dispatch(getProfileAction(userData.id));
  }, []);

  useEffect(() => {
    setProfiles(profilesData);
  }, [profilesData]);

  return (
    <div className="profiles-page-container main-padding">
      <Grid container alignItems="center">
        <SearchStripe handleOpen={handleOpen} btn_title="Add new" />
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
                          src={el.logo || userData.image}
                          name={el.name}
                          businessLinks={el.business}
                          socialLinks={el.social}
                          bio={el.bioBusiness || el.bio}
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
