import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Grid } from "@material-ui/core";
import { getProfileAction } from "./store/actions";
import ProfileCard from "./components/profileCard";
import SearchStripe from "../../components/searchStripe";
import useStyles from "./styles/styles";
import Loader from "../../components/Loader";

export default function Profiles() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userData = useSelector(({ authReducer }) => authReducer.signIn.data);
  const profilesData = useSelector(
    ({ profilesReducer }) => profilesReducer.dataProfiles.data
  );
  const classes = useStyles();
  const [profiles, setProfiles] = useState([]);

  function handleOpenNewProfilePage() {
    history.push("/new-profile", { path: "/profiles", page: "Profiles" });
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
        <SearchStripe
          handleOpen={handleOpenNewProfilePage}
          btn_title="Add Profile"
        />
        {!profiles.length ? (
          <Loader styles={{ position: "absolute", top: "50%", left: "50%" }} />
        ) : (
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="list">
              {(provided) => (
                <div
                  className="full-w"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {profiles.map((el, index) => (
                    <Draggable
                      key={el.id}
                      draggableId={`${el.id}`}
                      index={index}
                    >
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
                            profileLink={userData.url}
                            businessLinks={el.business}
                            socialLinks={el.social}
                            bio={{ business: el.bioBusiness, personal: el.bio }}
                            handleClickPoplItem={(event) => {
                              if (!event.target.className.includes("section")) {
                                return;
                              }
                              handleClickPoplItem(el.id);
                            }}
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
        )}
      </Grid>
    </div>
  );
}
