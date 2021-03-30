import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Grid } from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { inviteByEmailAction, clearStateAction } from "../../store/actions";
import { snackBarAction } from "../../../../store/actions";
import useStyles from "./styles";
import { getId } from "../../../../utils/uniqueId";
import Loader from "../../../../components/Loader";
import DropZone from "../../../../components/dropZone";
import SvgMaker from "../../../../components/svgMaker";

function EmailInvite() {
  const [value, setValue] = useState("");
  const [email, setEmail] = useState([]);
  const [backspaceCheck, setBackspaceCheck] = useState("");
  const [isOpenDropZone, setIsOpenDropZone] = useState(false);
  const isEmailSuccess = useSelector(({ addProfilesReducer }) => addProfilesReducer.inviteByEmail.success);
  const isFetching = useSelector(({ addProfilesReducer }) => addProfilesReducer.isFetching);
  const classes = useStyles();
  const dispatch = useDispatch();
  const regexp = /^\w([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const handleChange = (event) => {
    if (event.target.value.split(",").length > 1) {
      if (regexp.test(event.target.value.split(",")[0])) {
        setEmail((em) => ([...em, { emailString: `${event.target.value.split(",")[0]} `, id: getId(8) }]));
        return setValue("");
      }
    }
    setValue(event.target.value);
  };

  const handleInvite = () => {
    if (!email.length) return;
    dispatch(inviteByEmailAction(email, setEmail));
  };

  const handleKeyChange = (event) => {
    if (event.code === "Backspace" && !backspaceCheck) {
      setEmail((em) => em.slice(0, em.length - 1));
    }
    setBackspaceCheck(value);
  };

  const removeEmail = (id) => {
    setEmail((em) => em.filter((email) => email.id !== id));
  };

  useEffect(() => {
    if (isEmailSuccess) {
      setIsOpenDropZone(false);
      dispatch(clearStateAction("inviteByEmail"));
      dispatch(snackBarAction({
        message: "Your contacts imported successfully",
        severity: "success",
        duration: 3000,
        open: true,
      }));
    }
  }, [isEmailSuccess]);

  return (
    <div className='relative'>
      <Grid container className={classes.emailsComponentWrapper} spacing={3}>
        {isFetching
          ? <Loader styles={{ position: "absolute", top: "calc(50% - 20px)", left: "calc(50% - 20px)" }} />
          : <>
            <div className={classes.emailContainer}>
              <div className={classes.emailChipContainer}>
                {email.map(({ emailString, id }) => <div key={id} className={classes.emailChip}>
                  <p>
                    {emailString}
                  </p>
                  <HighlightOffIcon className={classes.icon} onClick={() => removeEmail(id)}/>
                </div>)}
                <input placeholder={email.length ? "" : "Enter Emails separated by commas"} className={classes.emailInput} style={email.length ? { minWidth: "10px" } : { width: "35%" }} onChange={handleChange} onKeyUp={handleKeyChange} value={value}/>
              </div>

            </div>
            <div
              className={classes.buttonsContainer}
            >
              <Button
                className={classes.emailBtn}
                variant="contained"
                color="primary"
                onClick={() => setIsOpenDropZone(true)}
              >
                Import Emails
              </Button>
              <Button
                className={classes.emailBtn}
                variant="contained"
                onClick={handleInvite}
                color="primary"
              >
                Send Invites!
              </Button>
            </div>
          </>}
      </Grid>
      {isOpenDropZone && <>
        <div className={classes.opacityBackground} onClick={() => setIsOpenDropZone(false)}></div>
        <div>
          <DropZone
            styles={{
              wrapper: classes.dropZoneWrapper,
              container: classes.dropZoneContainer,
              iconContainer: classes.dropZoneIconContainer,
            }}
            icon={<SvgMaker name={"csv"} fill='#fff' />}
          />
        </div>
      </>}
    </div>
  );
}

export default EmailInvite;
