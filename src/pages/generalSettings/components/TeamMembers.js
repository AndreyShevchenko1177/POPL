import { useEffect, useState } from "react";
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

function TeamMembers({ showConfirmModal }) {
  const [isShow, setIsShow] = useState(false);
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const [profilesList, setProfilesList] = useState([]);
  const classes = useStyles();
  const profiles = useSelector(({ profilesReducer }) => profilesReducer.dataProfiles.data);
  const isFetchingProfiles = useSelector(({ profilesReducer }) => profilesReducer.isFetching);
  const userId = useSelector(({ authReducer }) => authReducer.signIn.data.id);
  const parentProfilefId = useSelector(({ authReducer }) => authReducer.signIn.data.id);

  useEffect(() => {
    if (profiles) setProfilesList([...profiles]);
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
        <Paper className={classes.teamMembersPopup}>
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
                  customId, name, image, id,
                }) => (
                  <div key={customId} className={classes.memberWrapper}>
                    <Paper elevation={10} className={classes.memberItem}>
                      {userId !== id && <div className={classes.deleteIcon} onClick={() => deleteProfile(id)} >
                        <HighlightOffIcon />
                      </div>}
                      <img alt='userIcon' className={classes.nameItemImage} src={image ? process.env.REACT_APP_BASE_IMAGE_URL + image : userIcon} />
                      <p className={classes.nameItemName} > {name}</p>
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
