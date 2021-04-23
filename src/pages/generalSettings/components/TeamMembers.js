import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Paper, TextField, Typography } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import { getProfilesDataAction } from "../../profiles/store/actions";
import userIcon from "../../../assets/svg/user.svg";
import useStyles from "./styles";

function TeamMembers() {
  const [isShow, setIsShow] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [profilesList, setProfilesList] = useState([]);
  const classes = useStyles();
  const dispatch = useDispatch();
  const profiles = useSelector(({ profilesReducer }) => profilesReducer.dataProfiles.data);
  const userId = useSelector(({ authReducer }) => authReducer.signIn.data.id);

  useEffect(() => {
    dispatch(getProfilesDataAction(userId));
  }, []);

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
    <div className={classes.fieldContainer}>
      <div className={classes.paddingWrapper}>
        <Typography variant="subtitle1" classes={{ subtitle1: classes.fieldTitle }}>Team Members</Typography>
        <div
          onClick={() => setIsShow(true)}
          style={{ border: "1px solid #bababa" }}
          className={classes.colorElement}
        >
          View and manage team members
        </div>
      </div>
      {isShow && <Paper className={classes.teamMembersPopup}>
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
        <div className={classes.content}>
          {profilesList.map(({ customId, name, image }) => (
            <div key={customId} className={classes.memberWrapper}>
              <Paper elevation={10} className={classes.memberItem}>
                <img alt='userIcon' className={classes.nameItemImage} src={image ? process.env.REACT_APP_BASE_IMAGE_URL + image : userIcon} />
                <p className={classes.nameItemName} > {name}</p>
              </Paper>
            </div>
          ))}
        </div>
      </Paper>}
    </div>
  );
}

export default TeamMembers;
