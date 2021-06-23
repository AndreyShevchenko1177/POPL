import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button, Paper, TextField, Typography,
} from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import userIcon from "../../../assets/svg/user.svg";
import useStyles from "./styles";
import Loader from "../../../components/Loader";
import { restrictEdit } from "../../../utils";
import { snackBarAction } from "../../../store/actions";
import Avatar from "../../../components/popl/Avatar";

function TeamMembers({ showConfirmModal }) {
  const [isShow, setIsShow] = useState(false);
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const ref = useRef();
  const [profilesList, setProfilesList] = useState([]);
  const classes = useStyles();
  const profiles = useSelector(({ profilesReducer }) => profilesReducer.dataProfiles.data);
  const isFetchingProfiles = useSelector(({ profilesReducer }) => profilesReducer.isFetching);
  const generalSettingsData = useSelector(({ generalSettingsReducer }) => generalSettingsReducer.companyInfo.data);
  const userId = useSelector(({ authReducer }) => authReducer.signIn.data.id);
  const parentProfilefId = useSelector(({ authReducer }) => authReducer.signIn.data.id);

  useEffect(() => {
    if (profiles) setProfilesList([...profiles.map((el) => (el.activeProfile === "2" ? ({ ...el, name: el.nameBusiness, image: el.imageBusiness }) : el))]);
  }, [profiles]);

  const handleChange = (event) => {
    event.persist();
    const { value } = event.target;
    setSearchValue(value);
    setProfilesList(value ? profilesList.filter(({ name }) => name.toLowerCase().includes(value.toLowerCase())) : [...profiles]);
  };

  const deleteProfile = (id) => {
    if (restrictEdit(parentProfilefId)) {
      return dispatch(snackBarAction({
        message: "Can not edit demo account",
        severity: "error",
        duration: 6000,
        open: true,
      }));
    }
    showConfirmModal(id);
  };

  useEffect(() => {
    ref.current?.focus();
  }, [isShow]);

  return (
    <div className={classes.fieldContainer}>
      <div className={classes.paddingWrapper}>
        <Typography variant="subtitle1" classes={{ subtitle1: classes.fieldTitle }}>Team Members</Typography>
        {/* <div
          onClick={() => setIsShow(true)}
          style={{ border: "1px solid #bababa" }}
          className={classes.colorElement}
        >
          View and manage team members
        </div> */}
        <Button
          onClick={() => setIsShow(true)}
          variant='contained'
          color='primary'
          style={{ width: "70%" }}
        >
        View and manage team members
        </Button>
      </div>
      {isShow && (
        <Paper className={classes.teamMembersPopup} tabIndex={1} ref={ref} onBlur={(event) => {
          if (event.currentTarget.contains(event.relatedTarget)) return;
          setIsShow(false);
        }}>
          <CancelIcon className={classes.closeIcon} onClick={() => setIsShow(false)} />
          <div className={classes.searchInputWrapper}>
            <TextField
              placeholder='Search'
              variant='outlined'
              value={searchValue}
              onChange={handleChange}
              fullWidth
              size='small'
              className={classes.searchInput}
            />
          </div>
          {isFetchingProfiles
            ? <Loader containerStyles={{
              position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
            }} />
            : <>
              <div className={classes.content}>
                {profilesList.map(({
                  customId, name, image, id, url,
                }) => (
                  <div key={customId} className={classes.memberWrapper}>
                    <Paper elevation={10} className={classes.memberItem}>
                      {userId !== id && <div className={classes.deleteIcon} onClick={() => deleteProfile(id)} >
                        <HighlightOffIcon />
                      </div>}
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
                      <p className={classes.nameItemName} > {name || url}</p>
                    </Paper>
                  </div>
                ))}
              </div>
            </>}
        </Paper>)}
    </div>
  );
}

export default TeamMembers;
