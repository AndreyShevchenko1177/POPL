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
import Avatar from "../../../../components/popl/Avatar";
import useStyles from "./styles/styles";
import SocialPoplsIcons from "../profilelsIcons";
import DragDots from "../../../../components/dragDots";
import { imagesExtensions, isSafari } from "../../../../constants";
import {
  setDirectAction, setProfileStatusAction, setProfileBioAcion, setProfileNameAcion,
} from "../../store/actions";
import ProfilePanel from "./controlProfilePanel";
import Loader from "../../../../components/Loader";
import addLinkIcon from "../../../../assets/add.png";
import editProfileIcon from "../../../../assets/edit_profile_card.png";
import { defineDarkColor } from "../../../../utils";

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
  const extension = image.split(".");
  const generalSettingsData = useSelector(({ generalSettingsReducer }) => generalSettingsReducer.companyInfo.data);
  const { setProfileName, setProfileBio } = useSelector(({ profilesReducer }) => profilesReducer);
  const [values, setValues] = useState({
    name,
    bio,
    image,
  });
  const [editState, setEditState] = useState({
    name: false,
    bio: false,
  });
  const [preventBlur, setPreventBlur] = useState({
    name: false,
    bio: false,
  });
  const nameField = useRef(null);
  const bioField = useRef(null);
  const fileInputRef = useRef(null);

  const handleValuesChange = (event) => {
    event.persist();
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const settextFieldWidth = (length, bio) => {
    if (length < 10) return "110px";
    if (length > 40) return "410px";
    let result = 0;
    for (let i = 0; i < length - 10; i++) {
      result += bio ? 9 : 10;
    }
    return `${result + 110}px`;
  };

  const updateFieldRequest = (event, action) => {
    if (event.key === "Enter") action();
  };

  const handleSwitchChanger = (event, name) => {
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
              <Avatar
                bgColor={(generalSettingsData && generalSettingsData[1] && !generalSettingsData[3]) && generalSettingsData[1]}
                src={
                  imagesExtensions.includes(extension[extension.length - 1])
                    ? `${process.env.REACT_APP_BASE_IMAGE_URL}${values.image}`
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
              />
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
                  // setCompanyImage("");
                  // setFieldsState((prev) => ({ ...prev, file: null }));
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
                onChange={() => { console.log("change"); }}
              />
            </div>
            <div className='full-w target-element'>
              <div className={clsx(classes.section1_title)}>
                {setProfileName.isFetching
                  ? <Loader containerStyles={{ marginLeft: 50 }} styles={{ width: 20, height: 20 }} />
                  : <TextField
                    style={{ width: settextFieldWidth(values.name.length), transition: "width 0.075s linear" }}
                    classes={{ root: classes.disabledTextfield }}
                    name='name'
                    onBlur={() => {
                      if (preventBlur.name) return setPreventBlur({ ...preventBlur, name: false });
                      setEditState({ ...editState, name: false });
                      setValues({ ...values, name });
                    }}
                    onFocus={() => setEditState({ ...editState, name: true })}
                    disabled={!showEditIcon}
                    onChange={handleValuesChange}
                    onKeyDown={(event) => updateFieldRequest(event, () => dispatch(setProfileNameAcion(id, personalMode.direct ? 2 : 1, values.name)))}
                    placeholder={showEditIcon ? "Enter your name" : ""}
                    InputProps={{ disableUnderline: !showEditIcon, className: classes.nameInput }}
                    value={values.name}
                    size='small'
                  />}
                {editState.name && <div className={classes.checkMarkWrapper}>
                  <DoneIcon
                    onMouseDown={() => setPreventBlur({ ...preventBlur, name: true })}
                    className={classes.comfirmCheckmark}
                    onClick={() => {
                      setEditState({ ...editState, name: false });
                      dispatch(setProfileNameAcion(id, personalMode.direct ? 2 : 1, values.name));
                    }}
                  />
                </div>}
              </div>
              <div className={classes.section3}>
                <div className={classes.bioFieldWrapper}>
                  {setProfileBio.isFetching
                    ? <Loader containerStyles={{ margin: "5px 0 0 50px" }} styles={{ width: 20, height: 20 }} />
                    : <TextField
                      style={{ width: settextFieldWidth(values.bio.length, "bio"), transition: "width 0.075s linear" }}
                      classes={{ root: classes.disabledTextfieldBio }}
                      name='bio'
                      onFocus={() => setEditState({ ...editState, bio: true })}
                      disabled={!showEditIcon}
                      onBlur={(event) => {
                        if (preventBlur.bio) return setPreventBlur({ ...preventBlur, bio: false });
                        setEditState({ ...editState, bio: false });
                        setValues({ ...values, bio: personalMode.direct ? bioBusiness : bio });
                      }}
                      multiline
                      rowsMax={2}
                      onChange={handleValuesChange}
                      onKeyDown={(event) => updateFieldRequest(event, () => dispatch(setProfileBioAcion(id, personalMode.direct ? 2 : 1, values.bio)))}
                      placeholder={showEditIcon ? `Enter your ${personalMode.direct ? "bio business" : "bio personal"}` : ""}
                      InputProps={{ disableUnderline: !showEditIcon, className: classes.bioInput }}
                      value={values.bio}
                      size='small'
                    />}
                  {editState.bio && <div className={classes.checkMarkWrapper}>
                    <DoneIcon
                      onMouseDown={() => setPreventBlur({ ...preventBlur, bio: true })}
                      style={{ bottom: "5px" }}
                      className={classes.comfirmCheckmark}
                      onClick={() => {
                        setEditState({ ...editState, bio: false });
                        dispatch(setProfileBioAcion(id, personalMode.direct ? 2 : 1, values.bio));
                      }}
                    />
                  </div>}
                </div>
              </div>
            </div>
          </div>
          <div className={clsx(classes.wrapper, {
            "mt-25": isSafari,
            "h-55": isSafari,
          }, "target-element")}>
            <div className={clsx(classes.section4)}>
              <SocialPoplsIcons
                handleClick={handleClickPoplItem}
                profileId={id}
                profileName={name}
                data={personalMode.direct
                  ? business
                  : social
                }
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
              handleClickPoplItem={handleClickPoplItem}
              handleSwitchChanger={handleSwitchChanger}
              directOn={directOn}
              personalMode={personalMode}
              section2={classes.section2}
            />
          </div>
        </div>
      </Paper>
    </>
  );
}
