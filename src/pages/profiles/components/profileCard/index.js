import React, {
  useEffect, useState, useRef,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Paper, Button, TextField, Chip,
} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import EditIcon from "@material-ui/icons/Edit";
import clsx from "clsx";
import DoneIcon from "@material-ui/icons/Done";
import { Done } from "@material-ui/icons";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Avatar from "../../../../components/popl/Avatar";
import useStyles from "./styles/styles";
import SocialPoplsIcons from "../profilelsIcons";
import DragDots from "../../../../components/dragDots";
import { isSafari } from "../../../../constants";
import {
  setDirectAction, setProfileStatusAction, setProfileBioAcion, setProfileNameAcion, setProfileImageAction, isFetchingAction,
} from "../../store/actions";
import ProfilePanel from "./controlProfilePanel";
import Loader from "../../../../components/Loader";
import addLinkIcon from "../../../../assets/add.png";
import editProfileIcon from "../../../../assets/edit_profile_card.png";
import { defineDarkColor, restrictEdit } from "../../../../utils";
import { snackBarAction } from "../../../../store/actions";

export default function Card({
  isDotsRemove,
  handleClickPoplItem,
  profilesCheck,
  checkboxes,
  customId,
  name,
  url,
  image,
  business,
  social,
  activeProfile,
  bio,
  bioBusiness,
  direct,
  id,
  profileOff,
  showEditModal,
  setProfileType,
  showAddLinkWiz,
  isFetching,
  poplsNumber,
  connectionNumber,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [directOn, setDirectOn] = useState({
    direct: false,
    text: "Direct",
  });
  const [personalMode, setPersonalMode] = useState({
    direct: false,
    text: "Personal",
  });
  const [showEditIcon, setShowEditIcon] = useState(false);
  const parentProfilefId = useSelector(({ authReducer }) => authReducer.signIn.data.id);
  const generalSettingsData = useSelector(({ generalSettingsReducer }) => generalSettingsReducer.companyInfo.data);
  const { setProfileName, setProfileBio, setProfilePhoto } = useSelector(({ profilesReducer }) => profilesReducer);
  const [values, setValues] = useState({
    name: name || url,
    bio,
    image,
  });
  const [editState, setEditState] = useState({
    name: false,
    bio: false,
  });
  const [links, setLinks] = useState({
    links: [],
    localLinks: [],
    count: 0,
  });
  const [showLinksBtn, setShowLinksBtn] = useState({
    next: false,
    back: false,
  });
  const [currentEditedProfile, setCurrentEditedProfile] = useState(0);
  const nameField = useRef(null);
  const bioField = useRef(null);
  const fileInputRef = useRef(null);
  const viewPortWidth = window.innerWidth;

  const handleValuesChange = (event) => {
    event.persist();
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const settextFieldWidth = (length, bio) => {
    if (length < 10) return bio ? "130px" : "110px";
    if (length > 40) return "410px";
    let result = 0;
    for (let i = 0; i < length - 10; i++) {
      result += bio ? 9 : 10;
    }
    return `${result + (bio ? 130 : 110)}px`;
  };

  const updateFieldRequest = (event, action) => {
    if (event.key === "Enter") action();
  };

  const handleSwitchChanger = (event, name) => {
    if (parentProfilefId == id && restrictEdit(parentProfilefId)) {
      return dispatch(snackBarAction({
        message: "Can not edit demo account",
        severity: "error",
        duration: 6000,
        open: true,
      }));
    }
    if (name === "dir2") {
      return dispatch(setProfileStatusAction([id], personalMode.direct ? "1" : "2", "single"));
    }
    return dispatch(setDirectAction([id], directOn.direct ? "0" : "1", "single"));
  };

  const editIconHandler = () => {
    if (restrictEdit(parentProfilefId)) {
      return dispatch(snackBarAction({
        message: "Can not edit demo account",
        severity: "error",
        duration: 6000,
        open: true,
      }));
    }
    setProfileType((pt) => ({ ...pt, [id]: activeProfile }));
    setShowEditIcon(!showEditIcon);
  };

  const changeIconSize = (event, size) => {
    event.currentTarget.style.transform = `scale(${size})`;
    event.currentTarget.style.transition = "transform 0.25s";
  };

  const next = () => {
    if (links.localLinks.length - links.links.length > 0) {
      setShowLinksBtn({ ...showLinksBtn, back: true });
      if (viewPortWidth < 1600) {
        setLinks({ ...links, links: [...links.localLinks].slice(links.links.length, links.links.length + 10), count: links.count + 10 });
      } else {
        setLinks({ ...links, links: [...links.localLinks].slice(links.links.length, links.links.length + 15), count: links.count + 15 });
      }
    }
  };

  const back = () => {
    if (links.localLinks.length - links.links.length > 0) {
      setShowLinksBtn({ ...showLinksBtn, back: true });
      if (viewPortWidth < 1600) {
        setLinks({ ...links, links: [...links.localLinks].reverse().slice(links.links.length, links.links.length + 10).reverse(), count: links.count - 10 });
      } else {
        setLinks({ ...links, links: [...links.localLinks].reverse().slice(links.links.length, links.links.length + 15).reverse(), count: links.count - 15 });
      }
    }
  };

  useEffect(() => {
    if (viewPortWidth < 1600) {
      if (links.links.length <= 10 && (links.localLinks.length - links.count) < 10) {
        return setShowLinksBtn({ ...showLinksBtn, next: false });
      }
      return setShowLinksBtn({ ...showLinksBtn, next: true, back: false });
    }
    if (links.links.length <= 15 && (links.localLinks.length - links.count) < 15) {
      return setShowLinksBtn({ ...showLinksBtn, next: false });
    }
    return setShowLinksBtn({ ...showLinksBtn, next: true, back: false });
  }, [links]);

  useEffect(() => {
    let localLinks;
    if (personalMode.direct) {
      localLinks = business;
    } else {
      localLinks = social;
    }
    if (localLinks.length > 15) {
      if (viewPortWidth < 1600) {
        setLinks({ links: [...localLinks].slice(0, 10), localLinks, count: 0 });
      } else {
        setLinks({ links: [...localLinks].slice(0, 15), localLinks, count: 0 });
      }
      return setShowLinksBtn({ back: false, next: true });
    }
    setLinks({ links: localLinks, localLinks, count: 0 });
  }, [personalMode.direct]);

  useEffect(() => {
    if (activeProfile === "2") {
      setPersonalMode({ direct: true, text: "Business" });
      setValues({ ...values, bio: bioBusiness || bio });
    } else {
      setPersonalMode({ direct: false, text: "Personal" });
      setValues({ ...values, bio: bio || "" });
    }
  }, [activeProfile]);

  useEffect(() => {
    if (direct === "1") setDirectOn({ direct: true, text: "Direct On" });
    else setDirectOn({ direct: false, text: "Direct Off" });
  }, [direct]);

  useEffect(() => {
    if (editState.name) nameField.current?.focus();
    if (editState.bio) bioField.current?.focus();
  }, [editState]);

  useEffect(() => {
    if (!showEditIcon) setEditState({ name: false, bio: false });
  }, [showEditIcon]);

  useEffect(() => {
    setValues({ ...values, name });
  }, [name]);

  useEffect(() => {
    if (activeProfile === "2") return setValues({ ...values, bio: bioBusiness });
    return setValues({ ...values, bio });
  }, [bio, bioBusiness]);

  useEffect(() => {
    setValues({ ...values, image });
    dispatch(isFetchingAction(false, "setProfilePhoto"));
  }, [image]);

  return (
    <>
      {!isDotsRemove && <DragDots position="center" />}
      <Paper
        elevation={checkboxes[customId]?.checked ? 20 : 0}
        className={clsx(classes.root, profileOff === "1" ? classes.rootProfileOffBackground : (personalMode.direct && classes.rootBusinessModeBackground))}
        onClick={(event) => handleClickPoplItem(event, undefined, customId)}
      >
        <div className={classes.mainContent}>
          {profileOff === "1" && <span className={classes.profileOff}>OFF</span>}
          <div className={clsx(classes.section1, "target-element")}>
            <div
              className={classes.section1_editIcon}
              onClick={editIconHandler}
              onMouseUp={(event) => changeIconSize(event, 1)}
              onMouseDown={(event) => changeIconSize(event, 0.7)}
            >
              <img
                style={{ width: 25, height: 25, cursor: "pointer" }}
                alt='edit'
                src={editProfileIcon}
              />
            </div>
            <div className={clsx(classes.section1_avatar)}>
              {setProfilePhoto.isFetching && currentEditedProfile === id
                ? <Loader containerStyles={{
                  marginLeft: 50, width: 80, display: "flex", justifyContent: "center",
                }} styles={{ width: 20, height: 20 }} />
                : <Avatar
                  bgColor={(generalSettingsData && generalSettingsData[1] && !generalSettingsData[3]) && generalSettingsData[1]}
                  src={
                    values.image
                      ? `${process.env.REACT_APP_BASE_FIREBASE_PHOTOS_URL + values.image}?alt=media`
                      : generalSettingsData && generalSettingsData[3]
                        ? `${process.env.REACT_APP_BASE_FIREBASE_CUSTOM_ICON}${generalSettingsData[3]}?alt=media`
                        : {
                          name: "userIcon",
                          fill: generalSettingsData && generalSettingsData[1] ? defineDarkColor(generalSettingsData[1]) : "#000000",
                          width: 80,
                          height: 80,
                        }
                  }
                  name={name}
                  styles={{
                    image: {
                      width: "80px", height: "80px", borderRadius: "50%", objectFit: "cover",
                    },
                    container: { marginLeft: "49px" },
                  }}
                />}
              <div className={clsx(classes.checkboxWrapper, {
                "mt-10": isSafari,
              })}>
                <Checkbox
                  color="primary"
                  inputProps={{ "aria-label": "primary checkbox" }}
                  onClick={profilesCheck}
                  name={customId}
                  style={{ padding: "8px" }}
                  classes={{ root: "custom-checkbox-root" }}
                  checked={checkboxes[customId]?.checked || false}
                />
              </div>
              {showEditIcon && <Chip
                className={classes.chipButton}
                size='medium'
                onDelete={() => {
                  setCurrentEditedProfile(id);
                  dispatch(setProfileImageAction(id, personalMode.direct ? 2 : 1, "", setCurrentEditedProfile));
                }}
              />}
              {showEditIcon && <div style={{ top: 64, right: "-7px" }} className={classes.linksEditWrapper} onClick={() => fileInputRef.current?.click()}>
                <EditIcon style={{ width: 15, height: 15 }}/>
              </div>}
              <input
                style={{ display: "none" }}
                ref={fileInputRef}
                type='file'
                multiple={false}
                onChange={(event) => {
                  event.persist();
                  setCurrentEditedProfile(id);
                  return dispatch(setProfileImageAction(id, personalMode.direct ? 2 : 1, event.target.files[0], setCurrentEditedProfile));
                }}
              />
            </div>
            <div className='full-w target-element'>
              <div className={clsx(classes.section1_title)}>
                {setProfileName.isFetching && currentEditedProfile === id
                  ? <Loader containerStyles={{ marginLeft: 50 }} styles={{ width: 20, height: 20 }} />
                  : <TextField
                    style={{ width: settextFieldWidth(values.name.length), transition: "width 0.075s linear" }}
                    classes={{ root: classes.disabledTextfield }}
                    name='name'
                    onBlur={() => {
                      setCurrentEditedProfile(id);
                      dispatch(setProfileNameAcion(id, personalMode.direct ? 2 : 1, values.name));
                      // if (preventBlur.name) return setPreventBlur({ ...preventBlur, name: false });
                      // setEditState({ ...editState, name: false });
                      // setValues({ ...values, name });
                    }}
                    onFocus={() => setEditState({ ...editState, name: true })}
                    disabled={!showEditIcon}
                    onChange={handleValuesChange}
                    onDoubleClick={editIconHandler}
                    onKeyDown={(event) => updateFieldRequest(event, () => {
                      if (event.key === "Enter") dispatch(setProfileNameAcion(id, personalMode.direct ? 2 : 1, values.name));
                    })}
                    placeholder={showEditIcon ? "Enter your name" : ""}
                    InputProps={{ disableUnderline: !showEditIcon, className: classes.nameInput }}
                    value={values.name}
                    size='small'
                  />}
                {/* {editState.name && <div className={classes.checkMarkWrapper}>
                  <DoneIcon
                    onMouseDown={() => setPreventBlur({ ...preventBlur, name: true })}
                    className={classes.comfirmCheckmark}
                    onClick={() => {
                      setEditState({ ...editState, name: false });
                      dispatch(setProfileNameAcion(id, personalMode.direct ? 2 : 1, values.name));
                    }}
                  />
                </div>} */}
              </div>
              <div className={classes.section3}>
                <div className={classes.bioFieldWrapper}>
                  {setProfileBio.isFetching && currentEditedProfile === id
                    ? <Loader containerStyles={{ margin: "5px 0 0 50px" }} styles={{ width: 20, height: 20 }} />
                    : <TextField
                      style={{ width: settextFieldWidth(values.bio.length, "bio"), transition: "width 0.075s linear" }}
                      classes={{ root: classes.disabledTextfieldBio }}
                      name='bio'
                      onFocus={() => setEditState({ ...editState, bio: true })}
                      disabled={!showEditIcon}
                      onBlur={(event) => {
                        setCurrentEditedProfile(id);
                        dispatch(setProfileBioAcion(id, personalMode.direct ? 2 : 1, values.bio));
                        // if (preventBlur.bio) return setPreventBlur({ ...preventBlur, bio: false });
                        // setEditState({ ...editState, bio: false });
                        // setValues({ ...values, bio: personalMode.direct ? bioBusiness : bio });
                      }}
                      multiline
                      rowsMax={2}
                      onChange={handleValuesChange}
                      onDoubleClick={editIconHandler}
                      onKeyDown={(event) => updateFieldRequest(event, () => dispatch(setProfileBioAcion(id, personalMode.direct ? 2 : 1, values.bio)))}
                      placeholder={showEditIcon ? "Enter your bio" : ""}
                      InputProps={{ disableUnderline: !showEditIcon, className: classes.bioInput }}
                      value={values.bio}
                      size='small'
                    />}
                  {/* {editState.bio && <div className={classes.checkMarkWrapper}>
                    <DoneIcon
                      onMouseDown={() => setPreventBlur({ ...preventBlur, bio: true })}
                      style={{ bottom: "5px" }}
                      className={classes.comfirmCheckmark}
                      onClick={() => {
                        setEditState({ ...editState, bio: false });
                        dispatch(setProfileBioAcion(id, personalMode.direct ? 2 : 1, values.bio));
                      }}
                    />
                  </div>} */}
                </div>
              </div>
            </div>
          </div>
          <div className={clsx(classes.wrapper, {
            "mt-25": isSafari,
            "h-55": isSafari,
          }, "target-element")}>
            <div className={clsx(classes.section4)}>
              {showLinksBtn.back && <div onClick={back} style={{
                position: "absolute", left: "-35px", top: 25, cursor: "pointer",
              }} className={classes.linkClicksWrapper}>
                <ArrowBackIosIcon/>
              </div>}
              <SocialPoplsIcons
                handleClick={handleClickPoplItem}
                profileId={id}
                profileName={name}
                data={links.links}

                style={classes.linkImage}
                showEditIcon={showEditIcon}
                setShowEditIcon={setShowEditIcon}
                showEditModal={showEditModal}
                name={name}
              />
              {showEditIcon && <div onClick={showAddLinkWiz} className={classes.linkClicksWrapper}>
                <div className={classes.iconItem}>
                  <img
                    alt='add-icon'
                    className={classes.linkImage}
                    src={addLinkIcon}
                  />
                </div>
                <span>Add link</span>
              </div>}
              {showLinksBtn.next && <div onClick={next} style={{
                position: "absolute", right: "-35px", top: 25, cursor: "pointer",
              }} className={classes.linkClicksWrapper}>
                <ArrowForwardIosIcon/>
              </div>}
            </div>
            <div className={clsx(classes.section6)}>
              <Button
                variant="text"
                size="small"
                color="primary"
                // startIcon={<ArrowDropDownIcon />}
                onClick={() => url && window.open(`${process.env.REACT_APP_BASE_PROFILE_URL}${url}`)}
              >
                  View Profile
              </Button>
            </div>
          </div>
        </div>

        <div className={clsx(classes.section5, "target-element")}>
          <div className={classes.buttonsContainer}>
            <ProfilePanel
              id={id}
              business={business}
              social={social}
              name={name}
              url={url}
              handleClickPoplItem={handleClickPoplItem}
              handleSwitchChanger={handleSwitchChanger}
              directOn={directOn}
              personalMode={personalMode}
              section2={classes.section2}
              isFetching={isFetching}
              connectionNumber={connectionNumber}
              poplsNumber={poplsNumber}
            />
          </div>
        </div>
      </Paper>
    </>
  );
}
