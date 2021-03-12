import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Grid } from "@material-ui/core";
import { getProfilesIds } from "./store/actions";
import ProfileCard from "./components/profileCard";
import SearchStripe from "../../components/searchStripe";
import useStyles from "./styles/styles";
import Loader from "../../components/Loader";
import { selectConfig } from "./selectConfig";
import firebase from "../../config/firebase.config";
import { setUserProAction } from "../stripeResultPages/store/actions";

firebase.auth().signInAnonymously()
  .then((res) => {
    console.log(res);
  })
  .catch((error) => {
    let errorCode = error.code;
    let errorMessage = error.message;
    console.log(error);
    // ...
  });
// const db = firebase.firestore();

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
  const [openProfileSelect, setOpenProfileSelect] = useState(false);
  const [selectCheckboxes, setSelectCheckboxes] = useState(selectConfig);

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
      return history.push(`/profiles/popls/${id}`, profilesData.find((el) => el.id === id));
    }
    if (
      typeof event.target.className === "string"
      && event.target.className.includes("target-element")
    ) {
      history.push(`/profiles/popls/${id}`, profilesData.find((el) => el.id === id));
    }
  }

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
  };

  const searchProfile = (str) => {
    if (!str) {
      return setProfiles(profilesData);
    }
    const result = profilesData.filter((prof) => prof.name.toLowerCase().includes(str.toLowerCase()));
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

  const arrowHandler = (value) => {
    setOpenProfileSelect(value);
  };

  const selectCheck = (event, name) => {
    setSelectCheckboxes((prevSelect) => prevSelect.map((el) => (el.name === name ? ({ ...el, checked: event.target.checked }) : el)));
  };

  const selectBtn = (name) => {
    console.log(name);
  };

  useEffect(() => {
    // dispatch(setUserProAction());
    dispatch(getProfilesIds(userData.id));
    // (async () => {
    //   try {
    //    const data = await db.collection("people")
    //       .get()
    //       // .then((querySnapshot) => {
    //       //   // querySnapshot.forEach((doc) => {
    //       //   // // doc.data() is never undefined for query doc snapshots
    //       //   //   console.log(doc.id, " => ", doc.data());
    //       //   // });
    //       // })
    //       .catch((error) => {
    //         console.log("Error getting documents: ", error);
    //       });
    //   } catch (error) {
    //     console.log({ ...error });
    //   }
    // })();
  }, []);

  useEffect(() => {
    if (!profilesData) return;
    setProfiles(profilesData);
  }, [profilesData]);

  useEffect(() => {
    const checkBoxObject = {};
    profiles && profiles.forEach((el) => {
      checkBoxObject[el.customId] = false;
    });
    setCheckBoxes(checkBoxObject);
  }, [profiles]);

  useEffect(() => {
    const checkboxArray = Object.values(checkboxes);
    if (checkboxArray.every((el) => !el)) {
      setMainCheck(false);
    } else if (checkboxArray.every((el) => el)) {
      setMainCheck(true);
    } else if (checkboxArray.some((el) => !el)) {
      setMainCheck(false);
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
          search={searchProfile}
          // isProfileChecked={Object.values(checkboxes).every((el) => el)}
          checked={mainCheck}
          arrowHandler={arrowHandler}
          selectObject={{
            openProfileSelect,
            selectCheck,
            selectBtn,
            config: selectCheckboxes,
          }}
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
                      key={el.customId}
                      draggableId={`${el.customId}`}
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
                            {...el}
                            mainCheck={mainCheck}
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
        ) : (
              <div className={classes.noDataText}>
                No profiles was found
              </div>
        )
        }
      </Grid>
    </div>
  );
}
