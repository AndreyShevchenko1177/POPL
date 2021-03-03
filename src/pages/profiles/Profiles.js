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
    ({ profilesReducer }) => profilesReducer.dataProfiles.data,
  );
  const classes = useStyles();
  const [profiles, setProfiles] = useState(null);
  const [mainCheck, setMainCheck] = useState(false);
  const [checkboxes, setCheckBoxes] = useState({});
  const [searchValue, setSearchValue] = useState("");

  function handleOpenNewProfilePage() {
    history.push("/profiles/new-profile");
  }

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = [...profiles];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setProfiles(items);
  }

  function handleClickPoplItem(event, id, buttonName) {
    if (typeof buttonName === "function") return buttonName();
    event.preventDefault();
    if (buttonName === "popl") {
      return history.push("/profiles/popls", userData);
    }
    if (
      typeof event.target.className === "string"
      && event.target.className.includes("target-element")
    ) {
      history.push("/profiles/popls", userData);
    }
  }

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
  };

  const searchProfile = (str) => {
    if (!str) {
      return setProfiles(profilesData);
    }
    const result = profilesData.filter((prof) => prof.name.slice(0, str.length).toLowerCase() === str.toLowerCase());
    setProfiles(result);
  };

  const handleCheck = (event) => {
    setMainCheck(event.target.checked);
    const checkBoxObject = {};
    Object.keys(checkboxes).forEach((el) => {
      checkBoxObject[el] = event.target.checked;
    });
    setCheckBoxes(checkBoxObject);
  };

  const profilesCheck = (event) => {
    const { name } = event.target;
    setCheckBoxes({ ...checkboxes, [name]: !checkboxes[name] });
  };

  useEffect(() => {
    dispatch(getProfileAction(userData.id));
  }, []);

  useEffect(() => {
    if (!profilesData) return;
    setProfiles(profilesData);
    // const prof1 = profilesData.map((el) => ({ ...el, id: 123213, name: "Vit9" }));
    // setProfiles([...profilesData, ...prof1]);
  }, [profilesData]);

  useEffect(() => {
    const checkBoxObject = {};
    profiles && profiles.forEach((el) => {
      checkBoxObject[el.name] = false;
    });
    setCheckBoxes(checkBoxObject);
  }, [profiles]);

  useEffect(() => {
    if (Object.values(checkboxes).every((el) => !el)) {
      setMainCheck(false);
    } else if (Object.values(checkboxes).every((el) => el)) {
      setMainCheck(true);
    }
  }, [checkboxes]);

  return (
    <div className="profiles-page-container main-padding">
      <Grid container alignItems="center">
        <SearchStripe
          handleOpen={handleOpenNewProfilePage}
          btn_title="Add Profile"
          handleCheck={handleCheck}
          handleSearch={handleSearch}
          searchValue={searchValue}
          searchProfile={searchProfile}
          // isProfileChecked={Object.values(checkboxes).every((el) => el)}
          checked={mainCheck}
        />
        {!profiles ? (
          <Loader styles={{ position: "absolute", top: "50%", left: "50%" }} />
        ) : profiles.length ? (
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
                          draggable="true"
                          className={classes.container}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <ProfileCard
                            id={el.id}
                            heading={el.name}
                            src={userData.image}
                            mainCheck={mainCheck}
                            name={el.name}
                            profileLink={userData.url}
                            businessLinks={el.business}
                            socialLinks={el.social}
                            bio={{ business: el.bioBusiness, personal: el.bio }}
                            handleClickPoplItem={(event, buttonName) => handleClickPoplItem(event, el.id, buttonName)}
                            profilesCheck={profilesCheck}
                            checkboxes={checkboxes}
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
        ) : (<div className={classes.noDataText}>
              No profiles was found
            </div>)
        }
      </Grid>
    </div>
  );
}
