import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button, Paper, TextField, Checkbox,
} from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import userIcon from "../../../assets/svg/user.svg";
import useStyles from "../styles";

function TeamMembers({ isShow, handleClose }) {
  const [searchValue, setSearchValue] = useState("");
  const [profilesList, setProfilesList] = useState([]);
  const classes = useStyles();
  const dispatch = useDispatch();
  const profiles = useSelector(({ profilesReducer }) => profilesReducer.dataProfiles.data);
  const userId = useSelector(({ authReducer }) => authReducer.signIn.data.id);

  useEffect(() => {
    if (profiles) setProfilesList([...profiles]);
  }, [profiles]);

  const handleChange = (event) => {
    event.persist();
    const { value } = event.target;
    setSearchValue(value);
    setProfilesList(value ? profilesList.filter(({ name }) => name.toLowerCase().includes(value.toLowerCase())) : [...profiles]);
  };

  return (
    <>
      {isShow && <Paper className={classes.assignPopup}>
        <CancelIcon className={classes.assignCloseIcon} onClick={handleClose} />
        <div className={classes.assignSearchInputWrapper}>
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
        <div className={classes.assignContent}>
          {profilesList.map(({
            customId, name, image, id,
          }) => (
            <div key={customId} className={classes.assignProfileWrapper}>
              <Paper elevation={10} className={classes.assignProfileItem}>
                <img alt='userIcon' className={classes.assignProfileImage} src={image ? process.env.REACT_APP_BASE_IMAGE_URL + image : userIcon} />
                <p className={classes.assignNameItemName} > {name}</p>
                <Checkbox className={classes.assignCheckbox} checked={false} onChange={() => {}} />
              </Paper>
            </div>
          ))}
        </div>
        <Button
          className={classes.assignConfirmButton}
          variant='contained'
          color='primary'
          onClick={handleClose}
        >
          Confirm
        </Button>
      </Paper>}
    </>
  );
}

export default TeamMembers;
