/* eslint-disable no-return-assign */
import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Grid } from "@material-ui/core";
import clsx from "clsx";
import {
  getProfilesDataAction, setDirectAction, setProfileStatusAction, turnProfileAction, changeProfileOrder, clearStateAction,
} from "./store/actions";
import Header from "../../components/Header";
import ProfileCard from "./components/profileCard";
import SearchStripe from "../../components/searchStripe";
import useStyles from "./styles/styles";
import Loader from "../../components/Loader";
import { selectConfig, sortConfig } from "./selectConfig";
import CustomWizard from "../../components/wizard";
import EditLinkModal from "./components/editLink";
import { snackBarAction } from "../../store/actions";
import { isSafari } from "../../constants";

const parentContainerStyle = {
  display: "flex",
  position: "relative",
  marginTop: 20,
  width: "100%",
  minWidth: "800px",
  WebkitBoxShadow: "0px 0px 10px 10px rgb(207 207 207 / 50%)",
  boxShadow: "0px 0px 10px 10px rgb(207 207 207 / 50%)",
  outline: "none",
};

export default function Profiles() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userData = useSelector(({ authReducer }) => authReducer.signIn.data);
  const profilesData = useSelector(
    ({ profilesReducer }) => profilesReducer.dataProfiles.data,
  );
  const { profileConnection, poplsConnection, popsConnection } = useSelector(({ systemReducer }) => systemReducer.profileInfoSideBar);
  const isLoading = useSelector(({ profilesReducer }) => profilesReducer.isFetching);
  const deleteLinkData = useSelector(({ profilesReducer }) => profilesReducer.deleteLink.data);
  const editLinkData = useSelector(({ profilesReducer }) => profilesReducer.editLink.data);
  const [searchValue, setSearchValue] = useState("");
  const classes = useStyles();
  const [profiles, setProfiles] = useState([]);
  const [mainCheck, setMainCheck] = useState(false);
  const [checkboxes, setCheckBoxes] = useState({});
  const [openProfileSelect, setOpenProfileSelect] = useState({
    action: { open: false, component: "" },
    sort: { open: false, component: "" },
  });
  const [selectCheckboxes, setSelectCheckboxes] = useState(selectConfig);
  const [sortingConfig, setSortingConfig] = useState(sortConfig);
  const [wizard, setWizard] = useState({ open: false, data: [] });
  const [editLinkModal, setEditLinkModal] = useState({ open: false, data: {} });
  const [profileType, setProfileType] = useState({}); // person or business;

  function handleOpenNewProfilePage() {
    history.push("/profiles/add-profile");
  }

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = [...profiles];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    dispatch(changeProfileOrder(items.map(({ id }) => Number(id)).filter((id) => id != userData.id)), items);
    setProfiles(items);
  }

  function handleClickPoplItem(event, id, buttonName, customId) {
    if (typeof buttonName === "function") return buttonName();
    // event.preventDefault();
    if (buttonName === "popl") {
      return history.push("/popls", { profilesData: profilesData.find((el) => el.id === id), disabled: false });
    }
    if (
      typeof event.target.className === "string"
      && (event.target.className.includes("target-element") || event.target.offsetParent?.className?.includes("target-element"))
    ) {
      setCheckBoxes((cb) => ({ ...cb, [customId]: { ...cb[customId], checked: !cb[customId].checked } }));
      // history.push("/popls", { profilesData: profilesData.find((el) => el.id === id), disabled: false });
    }
  }

  const handleSearch = (event) => {
    if (!profilesData && !profilesData.length) return;
    setSearchValue(event.target.value);
    if (!event.target.value) {
      return setProfiles(profilesData);
    }
    const result = profilesData.filter((prof) => prof.name.toLowerCase().includes(event.target.value.toLowerCase()));
    setProfiles(result);
  };

  const handleCheck = (event) => {
    setMainCheck(event.target.checked);
    setCheckBoxes((chk) => {
      const checkObject = {};
      Object.keys(chk).map((el) => checkObject[el] = ({ ...chk[el], checked: event.target.checked }));
      return checkObject;
    });
  };

  const profilesCheck = (event) => {
    const { name } = event.target;
    setCheckBoxes({
      ...checkboxes,
      [name]: {
        checked: !checkboxes[name].checked,
        ...profilesData?.find((el) => el.customId === name),
      },
    });
  };

  const arrowHandler = (value, name) => {
    if (openProfileSelect[name].component === "select" && isSafari) {
      return setOpenProfileSelect({ ...openProfileSelect, [name]: { open: false, component: "" } });
    }
    setOpenProfileSelect({ ...openProfileSelect, [name]: { open: !openProfileSelect[name].open, component: "searchStripe" } });
  };

  const selectCheck = (event, name) => {
    setSelectCheckboxes((prevSelect) => prevSelect.map((el) => (el.name === name ? ({ ...el, checked: event.target.checked }) : el)));
  };

  const addLinkClick = (id) => {
    const filterProfiles = profiles.filter((el) => el.id === id);
    return setWizard({ data: filterProfiles, open: !!filterProfiles.length });
  };

  const selectBtn = (name, profileIds, selectName) => {
    if (Object.values(checkboxes).map((el) => el.checked).includes(true)) {
      setOpenProfileSelect({ ...openProfileSelect, [selectName]: { open: false, component: "listItem" } });
      if (name === "addLink") {
        const filterProfiles = profiles.filter((el) => checkboxes[el.customId].checked);
        return setWizard({ data: filterProfiles, open: !!filterProfiles.length });
      }
      if (name === "makeDirectOn") {
        dispatch(setDirectAction(profileIds, "1"));
      }
      if (name === "makeDirectOff") {
        dispatch(setDirectAction(profileIds, "0"));
      }
      if (name === "makeBusiness") {
        dispatch(setProfileStatusAction(profileIds, "2"));
      }
      if (name === "makePersonal") {
        dispatch(setProfileStatusAction(profileIds, "1"));
      }
      if (name === "turnProfileOn") {
        dispatch(turnProfileAction(profileIds, "true"));
      }
      if (name === "turnProfileOff") {
        dispatch(turnProfileAction(profileIds, "false"));
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

  const sortHandler = (name, _, selectName) => {
    if (!Object.keys(profileConnection).length) return;
    setSortingConfig(sortConfig.map((con) => (con.name === name ? ({ ...con, active: true }) : con)));
    setProfiles((prevProfiles) => {
      const sortProfiles = [...prevProfiles].sort((a, b) => b[name] - a[name]);
      return sortProfiles;
    });
    setOpenProfileSelect({ ...openProfileSelect, [selectName]: { open: false, component: "listItem" } });
  };

  const resetSort = () => {
    setProfiles((prevProfile) => profilesData.map((prof) => ({
      ...prof,
      connectionNumber: profileConnection[prof.id],
      poplsNumber: poplsConnection[prof.id],
      popsNumber: popsConnection[prof.id],
      linkTapsNumber: [...prof.business, ...prof.social].reduce((sum, c) => sum += c.clicks, 0),
    })));
    setSortingConfig(sortConfig.map((con) => ({ ...con, active: false })));
  };

  const showEditModal = (title, value, id, clicks, currentIcon, name, hash, icon) => {
    setEditLinkModal({
      ...editLinkModal,
      open: true,
      data: {
        title, value, id, clicks, currentIcon, name, hash, icon,

      },
    });
  };

  useEffect(() => {
    setProfiles((prevProfile) => prevProfile.map((prof) => ({
      ...prof,
      connectionNumber: profileConnection[prof.id],
      poplsNumber: poplsConnection[prof.id],
      popsNumber: popsConnection[prof.id],
      linkTapsNumber: [...prof.business, ...prof.social].reduce((sum, c) => sum += c.clicks, 0),
    })));
  }, [poplsConnection]);

  useEffect(() => {
    dispatch(getProfilesDataAction(userData.id));
    // return () => dispatch(clearStateAction("deleteLink"));
  }, []);

  useEffect(() => {
    if (!profilesData) return;
    setProfiles(profilesData);
  }, [profilesData]);

  useEffect(() => {
    const checkBoxObject = {};
    profiles && profiles.forEach((el) => {
      checkBoxObject[el.customId] = {
        checked: !!checkboxes[el.customId]?.checked,
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

  // useEffect(() => {
  //   if (deleteLinkData) {
  //     setProfiles(profiles.map((item) => {
  //       if (item.id == deleteLinkData.profileId) {
  //         const business = item.business.filter((el) => el.id != deleteLinkData.linkId);
  //         const social = item.social.filter((el) => el.id != deleteLinkData.linkId);
  //         return { ...item, business, social };
  //       }
  //       return item;
  //     }));
  //   }
  // }, [deleteLinkData]);

  // useEffect(() => {
  //   if (editLinkData) {
  //     setProfiles(profiles.map((item) => {
  //       if (item.id == editLinkData.profileId) {
  //         const business = item.business.map((el) => (el.id == editLinkData.linkId ? ({ ...el, title: editLinkData.linkTitle, value: editLinkData.linkValue }) : el));
  //         const social = item.social.map((el) => (el.id == editLinkData.linkId ? ({ ...el, title: editLinkData.linkTitle, value: editLinkData.linkValue }) : el));
  //         return { ...item, business, social };
  //       }
  //       return item;
  //     }));
  //   }
  // }, [editLinkData]);

  return (
    <>
      <Header
        rootLink="Profiles"
      />
      <div className={clsx("main-padding relative", "o-none", classes.mainPageWrapper)}>
        <Grid container alignItems="center">
          {wizard.open && <CustomWizard data={wizard.data} isOpen={wizard.open} setIsOpen={setWizard}/>}
          {editLinkModal.open && <EditLinkModal allLinks={profiles.reduce((s, {
            business, social, activeProfile, id,
          }) => [...s, ...business.map((el) => ({
            ...el, linkType: activeProfile, profileId: id, linkId: el.id, linkValue: el.value, linkTitle: el.title,
          })), ...social.map((el) => ({
            ...el, linkType: activeProfile, profileId: id, linkId: el.id, linkValue: el.value, linkTitle: el.title,
          }))], [])} profileType={profileType} setEditLinkModal={setEditLinkModal} data={editLinkModal.data} isOpen={editLinkModal.open}/>}
          <SearchStripe
            showAll={false}
            isShowSortBtn
            handleOpen={handleOpenNewProfilePage}
            btn_title="Add Profile"
            handleCheck={handleCheck}
            searchValue={searchValue}
            handleSearch={handleSearch}
            checked={mainCheck}
            checkboxes={checkboxes}
            arrowHandler={arrowHandler}
            templates={true}
            selectObject={{
              openProfileSelect,
              setOpenProfileSelect,
              selectCheck,
              selectBtn,
              config: selectCheckboxes,
              sortConfig: sortingConfig,
              resetSort,
              sortHandler,
            }}
            reverse
          />
          {isLoading ? (
            <Loader styles={{ position: "absolute", top: "calc(50% - 20px)", left: "calc(50% - 170px)" }} />
          ) : profiles?.length ? (
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="list">
                {(provided) => (
                  <div
                    className="full-w pb-50"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {profiles.map((el, index) => (
                      el.id == userData.id
                        ? <div
                          key={el.customId}
                          style={parentContainerStyle}
                        >
                          <ProfileCard
                            {...el}
                            isDotsRemove
                            showEditModal={showEditModal}
                            showAddLinkWiz={() => addLinkClick(el.id)}
                            mainCheck={mainCheck}
                            handleClickPoplItem={(event, buttonName, customId) => handleClickPoplItem(event, el.id, buttonName, customId)}
                            profilesCheck={profilesCheck}
                            checkboxes={checkboxes}
                            setProfileType={setProfileType}
                          />
                        </div>
                        : <Draggable
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
                                showEditModal={showEditModal}
                                showAddLinkWiz={() => addLinkClick(el.id)}
                                mainCheck={mainCheck}
                                handleClickPoplItem={(event, buttonName, customId) => handleClickPoplItem(event, el.id, buttonName, customId)}
                                profilesCheck={profilesCheck}
                                checkboxes={checkboxes}
                                setProfileType={setProfileType}
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
          ) : profilesData?.length === 0
            ? (
              <div className={classes.noDataText}>
                    No profiles was found
              </div>
            )
            : null
          }
        </Grid>
      </div>
    </>
  );
}
