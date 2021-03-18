import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Grid } from "@material-ui/core";
import { getProfilesIds, setDirectAction, setProfileStatusAction } from "./store/actions";
import ProfileCard from "./components/profileCard";
import SearchStripe from "../../components/searchStripe";
import useStyles from "./styles/styles";
import Loader from "../../components/Loader";
import { selectConfig } from "./selectConfig";
import CustomWizard from "../../components/wizard";
import { snackBarAction } from "../../store/actions";

export default function Profiles() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userData = useSelector(({ authReducer }) => authReducer.signIn.data);
  const profilesData = useSelector(
    ({ profilesReducer }) => profilesReducer.dataProfiles.data,
  );
  const isLoading = useSelector(({ profilesReducer }) => profilesReducer.isFetching);
  const classes = useStyles();
  const [profiles, setProfiles] = useState([]);
  const [mainCheck, setMainCheck] = useState(false);
  const [checkboxes, setCheckBoxes] = useState({});
  const [openProfileSelect, setOpenProfileSelect] = useState({ open: false, component: "" });
  const [selectCheckboxes, setSelectCheckboxes] = useState(selectConfig);
  const [wizard, setWizard] = useState({ open: false, data: [] });

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
      return history.push("/profiles/popls", { profilesData: profilesData.find((el) => el.id === id), disabled: false });
    }
    if (
      typeof event.target.className === "string"
      && event.target.className.includes("target-element")
    ) {
      history.push("/profiles/popls", { profilesData: profilesData.find((el) => el.id === id), disabled: false });
    }
  }

  const handleSearch = (event) => {
    if (!event.target.value) {
      return setProfiles(profilesData);
    }
    const result = profilesData.filter((prof) => prof.name.toLowerCase().includes(event.target.value.toLowerCase()));
    setProfiles(result);
  };

  const handleCheck = (event) => {
    setMainCheck(event.target.checked);
    const checkBoxObject = {};
    Object.keys(checkboxes).forEach((el) => {
      checkBoxObject[el] = {
        checked: event.target.checked,
        ...profilesData.find((el) => el.customId === checkBoxObject[el]),
      };
    });
    setCheckBoxes(checkBoxObject);
  };

  const profilesCheck = (event) => {
    const { name } = event.target;
    setCheckBoxes({
      ...checkboxes,
      [name]: {
        checked: !checkboxes[name].checked,
        ...profilesData.find((el) => el.customId === name),
      },
    });
  };

  const arrowHandler = (value) => {
    if (openProfileSelect.component === "select") {
      return setOpenProfileSelect({ open: false, component: "" });
    }
    setOpenProfileSelect({ open: value, component: "searchStripe" });
  };

  const selectCheck = (event, name) => {
    setSelectCheckboxes((prevSelect) => prevSelect.map((el) => (el.name === name ? ({ ...el, checked: event.target.checked }) : el)));
  };

  const selectBtn = (name, profileIds) => {
    if (Object.values(checkboxes).map((el) => el.checked).includes(true)) {
      setOpenProfileSelect({ open: false, component: "listItem" });
      if (name === "addLink") {
        const filterProfiles = profiles.filter((el) => checkboxes[el.customId].checked);
        console.log(filterProfiles);
        return setWizard({ data: filterProfiles, open: !!filterProfiles.length });
      }
      if (name === "makeDirectOn") {
        console.log(profileIds);
        dispatch(setDirectAction(profileIds, "1", userData.id));
      }
      if (name === "makeDirectOff") {
        dispatch(setDirectAction(profileIds, "0", userData.id));
      }
      if (name === "makeBusiness") {
        dispatch(setProfileStatusAction(profileIds, "2", userData.id));
      }
      if (name === "makePersonal") {
        dispatch(setProfileStatusAction(profileIds, "1", userData.id));
      }
    } else {
      dispatch(snackBarAction({
        message: "Please, select at least one profile",
        duration: 6000,
        severity: "info",
        open: true,
      }));
    }
  };

  useEffect(() => {
    dispatch(getProfilesIds(userData.id));
  }, []);

  useEffect(() => {
    if (!profilesData) return;
    setProfiles(profilesData);
  }, [profilesData]);

  useEffect(() => {
    const checkBoxObject = {};
    profiles && profiles.forEach((el) => {
      checkBoxObject[el.customId] = {
        checked: false,
        ...profilesData.find((item) => item.customId === el.customId),
      };
    });
    setCheckBoxes(checkBoxObject);
  }, [profiles]);

  useEffect(() => {
    const checkboxArray = Object.values(checkboxes);
    if (checkboxArray.every((el) => !el.checked)) {
      setMainCheck(false);
    } else if (checkboxArray.every((el) => el.checked)) {
      setMainCheck(true);
    } else if (checkboxArray.some((el) => !el.checked)) {
      setMainCheck(false);
    }
  }, [checkboxes]);

  return (
    <div className="main-padding relative full-h">
      <Grid container alignItems="center">
        {wizard.open && <CustomWizard data={wizard.data} isOpen={wizard.open} setIsOpen={setWizard}/>}
        <SearchStripe
          showAll={false}
          handleOpen={handleOpenNewProfilePage}
          btn_title="Add Profile"
          handleCheck={handleCheck}
          handleSearch={handleSearch}
          checked={mainCheck}
          checkboxes={checkboxes}
          arrowHandler={arrowHandler}
          selectObject={{
            openProfileSelect,
            setOpenProfileSelect,
            selectCheck,
            selectBtn,
            config: selectCheckboxes,
          }}
        />
        {isLoading ? (
          <Loader styles={{ position: "absolute", top: "calc(50% - 20px)", left: "calc(50% - 170px)" }} />
        ) : profiles?.length ? (
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
