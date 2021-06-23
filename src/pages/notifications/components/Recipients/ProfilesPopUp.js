import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button, Checkbox, Paper, TextField, Typography,
} from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import userIcon from "../../../../assets/svg/user.svg";
import useStyles from "../styles";
import Loader from "../../../../components/Loader";
import Avatar from "../../../../components/popl/Avatar";

function ProfilesList({
  setIsShow, profiles, setRecepients, recipients,
}) {
  const [searchValue, setSearchValue] = useState("");
  const [profilesList, setProfilesList] = useState([]);
  const classes = useStyles();
  const isFetchingProfiles = useSelector(({ profilesReducer }) => profilesReducer.isFetching);
  const generalSettingsData = useSelector(({ generalSettingsReducer }) => generalSettingsReducer.companyInfo.data);
  const [checked, setIsChecked] = useState({});
  const [checkedProfiles, setCheckedProfiles] = useState([...recipients]);

  const handleChange = (event) => {
    const { value } = event.target;
    setSearchValue(value);
    setProfilesList(value ? profilesList.filter(({ name }) => name.toLowerCase().includes(value.toLowerCase())) : [...profiles]);
  };

  const handleChangeCheckbox = (event) => {
    const { checked, name } = event.target;
    setIsChecked((prev) => ({ ...prev, [name]: checked }));
    if (checked) {
      setCheckedProfiles((prev) => ([...prev, profiles.find(({ customId }) => customId == name)]));
    } else {
      setCheckedProfiles((prev) => ([...prev.filter(({ customId }) => customId != name)]));
    }
  };

  const handleConfirm = () => {
    setRecepients((prev) => ({ ...prev, recipients: checkedProfiles }));
    setIsShow(false);
  };

  const handleSelectAll = () => {
    const result = {};
    Object.keys(checked).forEach((key) => result[key] = true);
    setIsChecked(result);
    setCheckedProfiles(profilesList);
  };

  useEffect(() => {
    if (profiles) {
      const result = {};
      setProfilesList([...profiles].map((el) => (el.activeProfile === "2" ? ({ ...el, name: el.nameBusiness, image: el.imageBusiness }) : el)));
      profiles.forEach((profile) => {
        const isProfileInRecipients = recipients.find(({ customId }) => customId === profile.customId);
        result[profile.customId] = !!isProfileInRecipients;
      });
      setIsChecked(result);
    }
  }, [profiles]);

  return (
    <Paper className={classes.profilesListPopup}>
      <CancelIcon className={classes.profilesListCloseIcon} onClick={() => setIsShow(false)} />
      <div className={classes.profilesListSearchInputWrapper}>
        <TextField
          placeholder='Search'
          variant='outlined'
          value={searchValue}
          onChange={handleChange}
          fullWidth
          size='small'
        />
      </div>
      {isFetchingProfiles
        ? <Loader containerStyles={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
        }} />
        : <>
          <div className={classes.profilesListContent}>
            {profilesList.map(({
              customId, name, image, id, url,
            }) => (
              <div key={customId} className={classes.profilesListMemberWrapper}>
                <Paper elevation={10} className={classes.profilesListMemberItem}>
                  <Avatar
                    bgColor={(generalSettingsData && generalSettingsData[1] && !generalSettingsData[3]) && generalSettingsData[1]}
                    src={
                      image
                        ? `${process.env.REACT_APP_BASE_FIREBASE_PHOTOS_URL + image}?alt=media`
                        : generalSettingsData && generalSettingsData[3] && `${process.env.REACT_APP_BASE_FIREBASE_LOGOS_URL}${generalSettingsData[3]}?alt=media`
                    }
                    name={name}
                    styles={{
                      image: {
                        width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover",
                      },
                      container: {
                        marginRight: "10px",
                      },
                    }}
                  />
                  <p className={classes.profilesListNameItemName} > {name || url}</p>
                  <Checkbox
                    color="primary"
                    name={customId.toString()}
                    className={classes.profilesListCheckbox}
                    checked={checked[customId]}
                    onChange={handleChangeCheckbox}
                  />
                </Paper>
              </div>
            ))}
          </div>
        </>}
      {!isFetchingProfiles && <div className={classes.profilesListBtnWrapper}>
        <Button
          className={classes.profilesListBtn}
          variant='contained'
          color="primary"
          onClick={handleSelectAll}
        >
          Select all
        </Button>
        <Button
          className={classes.profilesListBtn}
          variant='contained'
          color="primary"
          onClick={handleConfirm}
        >
          Confirm
        </Button>
      </div>}
    </Paper>
  );
}

export default ProfilesList;
