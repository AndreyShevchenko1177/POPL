/* eslint-disable operator-assignment */
import React, {
  useEffect, useState, useRef,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Paper, Button, TextField, Chip, Tooltip,
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
  setDirectAction,
  setProfileStatusAction,
  setProfileBioAcion,
  setProfileNameAcion,
  setProfileImageAction,
  setProfileEmailAcion,
  isFetchingAction,
} from "../../store/actions";
import ProfilePanel from "./controlProfilePanel";
import Loader from "../../../../components/Loader";
import addLinkIcon from "../../../../assets/add.png";
import editProfileIcon from "../../../../assets/edit_profile_card.png";
import { defineDarkColor, restrictEdit } from "../../../../utils";
import { snackBarAction } from "../../../../store/actions";

function removeBioExtraBreakLines(bio) {
  return bio.split("\r")
    .map((item) => item.trim()).join("\r")
    .replace(/\r(?=\r)/g, "");
}

export default function Card({
  isDotsRemove,
  handleClickPoplItem,
  profilesCheck,
  checkboxes,
  customId,
  name,
  email,
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
  num,
  isLinksDragging,
  currentEditedProfile,
  setCurrentEditedProfile,
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
  const {
    setProfileName, setProfileBio, setProfilePhoto, profileLinks, setProfileEmail,
  } = useSelector(({ profilesReducer }) => profilesReducer);
  const [values, setValues] = useState({
    name: name || url || "",
    bio: "",
    image,
    email: email || "",
  });
  const [editState, setEditState] = useState({
    name: false,
    bio: false,
    email: false,
  });
  const [showLinksBtn, setShowLinksBtn] = useState({
    next: false,
    back: false,
  });
  const nameField = useRef(null);
  const bioField = useRef(null);
  const fileInputRef = useRef(null);
  const linkContainerRef = useRef(null);
  const viewPortWidth = window.innerWidth;
  const userData = useSelector(({ authReducer }) => authReducer.signIn.data);

  const handleValuesChange = (event) => {
    if (restrictEdit(userData.id)) {
      return dispatch(snackBarAction({
        message: "Can not edit demo account",
        severity: "error",
        duration: 6000,
        open: true,
      }));
    }
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
    setProfileType((pt) => ({ ...pt, [id]: activeProfile }));
    setShowEditIcon(!showEditIcon);
  };

  const changeIconSize = (event, size) => {
    event.currentTarget.style.transform = `scale(${size})`;
    event.currentTarget.style.transition = "transform 0.25s";
  };

  const next = () => {
    linkContainerRef.current.scrollLeft = linkContainerRef.current.scrollLeft + 400;
  };

  const back = () => {
    linkContainerRef.current.scrollLeft = linkContainerRef.current.scrollLeft - 400;
  };

  const linksScrollHandler = (event) => {
    if (event.target.scrollLeft > 0) {
      setShowLinksBtn({ ...showLinksBtn, back: true });
    } else {
      setShowLinksBtn({ ...showLinksBtn, back: false });
    }
  };

  useEffect(() => {
    // for initial next button displaying depends on screen width
    const appropriateLinksCount = viewPortWidth > 1450 ? 11 : 8;
    const linksCount = (profileLinks && profileLinks[customId] && profileLinks[customId][personalMode.direct ? "2" : "1"]?.length) || 0;
    if (linksCount <= appropriateLinksCount) {
      return setShowLinksBtn({ ...showLinksBtn, next: false });
    }
    return setShowLinksBtn({ ...showLinksBtn, next: true, back: false });
  }, [profileLinks, personalMode]);

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
    if (activeProfile === "2") return setValues({ ...values, bio: bioBusiness ? removeBioExtraBreakLines(bioBusiness) : "" });
    return setValues({ ...values, bio: bio ? removeBioExtraBreakLines(bio) : "" });
  }, [bio, bioBusiness]);

  useEffect(() => {
    setValues({ ...values, image });
    dispatch(isFetchingAction(false, "setProfilePhoto"));
  }, [image]);

  useEffect(() => {
    if (activeProfile === "2") return setValues({ ...values, bio: bioBusiness ? removeBioExtraBreakLines(bioBusiness) : "" });
    return setValues({ ...values, bio: bio ? removeBioExtraBreakLines(bio) : "" });
  }, []);

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
                  if (restrictEdit(parentProfilefId)) {
                    return dispatch(snackBarAction({
                      message: "Can not edit demo account",
                      severity: "error",
                      duration: 6000,
                      open: true,
                    }));
                  }
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
                    style={{ width: settextFieldWidth(values?.name?.length || 0), transition: "width 0.075s linear" }}
                    classes={{ root: classes.disabledTextfield }}
                    name='name'
                    onBlur={() => {
                      if ((name && values.name === name) || (!name && url && values.name === url)) return;
                      setCurrentEditedProfile(id);
                      dispatch(setProfileNameAcion(id, personalMode.direct ? 2 : 1, values.name));
                    }}
                    onFocus={() => setEditState({ ...editState, name: true })}
                    disabled={!showEditIcon}
                    onChange={handleValuesChange}
                    onDoubleClick={editIconHandler}
                    onKeyDown={(event) => updateFieldRequest(event, () => {
                      if (event.key === "Enter") {
                        if ((name && values.name === name) || (!name && url && values.name === url)) return;
                        setCurrentEditedProfile(id);
                        dispatch(setProfileNameAcion(id, personalMode.direct ? 2 : 1, values.name));
                      }
                    })}
                    placeholder={showEditIcon ? "Enter your name" : ""}
                    InputProps={{ disableUnderline: !showEditIcon, className: classes.nameInput }}
                    value={values.name}
                    size='small'
                  />}
              </div>
              <div className={clsx(classes.section1_title)}>
                {setProfileEmail.isFetching && currentEditedProfile === id
                  ? <Loader containerStyles={{ marginLeft: 50, display: "flex", alignItems: "center" }} styles={{ width: 20, height: 20 }} />
                  : <TextField
                    style={{ width: settextFieldWidth(values?.email?.length || 0), transition: "width 0.075s linear" }}
                    classes={{ root: classes.disabledTextfieldBio }}
                    name='email'
                    onBlur={() => {
                      if (email === values.email) return;
                      setCurrentEditedProfile(id);
                      dispatch(setProfileEmailAcion(id, values.email));
                    }}
                    onFocus={() => setEditState({ ...editState, email: true })}
                    disabled={!showEditIcon}
                    onChange={handleValuesChange}
                    onDoubleClick={editIconHandler}
                    onKeyDown={(event) => updateFieldRequest(event, () => {
                      if (event.key === "Enter") {
                        if (email === values.email) return;
                        setCurrentEditedProfile(id);
                        dispatch(setProfileEmailAcion(id, values.email));
                      }
                    })}
                    placeholder={showEditIcon ? "Enter your email" : ""}
                    InputProps={{ disableUnderline: !showEditIcon, className: classes.emailInput }}
                    value={values.email}
                    size='small'
                  />}
              </div>
              <div className={classes.section3}>
                <div className={classes.bioFieldWrapper}>
                  {setProfileBio.isFetching && currentEditedProfile === id
                    ? <Loader containerStyles={{ margin: "5px 0 0 50px" }} styles={{ width: 20, height: 20 }} />
                    : showEditIcon
                      ? <TextField
                        style={{ width: settextFieldWidth(values?.bio?.length, "bio"), transition: "width 0.075s linear" }}
                        classes={{ root: classes.disabledTextfieldBio }}
                        name='bio'
                        onFocus={() => setEditState({ ...editState, bio: true })}
                        disabled={!showEditIcon}
                        onBlur={(event) => {
                          setCurrentEditedProfile(id);
                          dispatch(setProfileBioAcion(id, personalMode.direct ? 2 : 1, values.bio));
                        }}
                        multiline
                        rowsMax={2}
                        onChange={handleValuesChange}
                        onKeyDown={(event) => updateFieldRequest(event, () => {
                          if (event.key === "Enter") {
                            setCurrentEditedProfile(id);
                            dispatch(setProfileBioAcion(id, personalMode.direct ? 2 : 1, values.bio));
                          }
                        })}
                        placeholder={showEditIcon ? "Enter your bio" : ""}
                        InputProps={{ disableUnderline: !showEditIcon, className: classes.bioInput }}
                        value={values.bio}
                        size='small'
                      />
                      : <Tooltip title={values?.bio || ""} placement="top"><div onDoubleClick={editIconHandler} className={classes.bioNotEditMode}>{values.bio}</div></Tooltip>
                  }
                </div>
              </div>
            </div>
          </div>
          <div className={clsx(classes.wrapper, {
            "mt-25": isSafari,
            "h-55": isSafari,
          }, "target-element")}>
            <div className='relative' style={isLinksDragging ? { width: "100%" } : {}}>
              <div className={clsx(classes.section4, "linksContainer")} ref={linkContainerRef} onScroll={linksScrollHandler}>
                <SocialPoplsIcons
                  handleClick={handleClickPoplItem}
                  profileId={id}
                  profileName={name}
                  data={(profileLinks && profileLinks[customId] && profileLinks[customId][personalMode.direct ? "2" : "1"]) || []}
                  style={classes.linkImage}
                  showEditIcon={showEditIcon}
                  setShowEditIcon={setShowEditIcon}
                  showEditModal={showEditModal}
                  name={name}
                  num={num}
                  customId={customId}
                  isLinksDragging={isLinksDragging}
                  isDirect={directOn.direct}
                />
              </div>
              {showEditIcon && <div onClick={showAddLinkWiz} className={clsx(classes.linkClicksWrapper, classes.addLinkIcon)} >
                <div className={classes.iconItem}>
                  <img
                    alt='add-icon'
                    className={classes.linkImage}
                    src={addLinkIcon}
                  />
                </div>
                <span>Add link</span>
              </div>}
              {showLinksBtn.back && <div onClick={back} className={clsx(classes.linkClicksWrapper, classes.linksBackBtn)}>
                <ArrowBackIosIcon/>
              </div>}
              {showLinksBtn.next && <div onClick={next} style={{ right: showEditIcon ? "-115px" : "-60px" }} className={clsx(classes.linkClicksWrapper, classes.linksNextBtn)}>
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
