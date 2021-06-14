/* eslint-disable no-return-assign */
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Grid } from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import {
  inviteByEmailAction, clearStateAction, removeFileAction,
} from "../../store/actions";
import { snackBarAction } from "../../../../store/actions";
import useStyles from "./styles";
import { getId } from "../../../../utils/uniqueId";
import Loader from "../../../../components/Loader";
import DropZone from "../../../../components/dropZone";
import SvgMaker from "../../../../components/svgMaker";
import Preview from "../../../../components/dropZone/components/Preview";

function EmailInvite() {
  const [value, setValue] = useState("");
  const [email, setEmail] = useState([]);
  const [backspaceCheck, setBackspaceCheck] = useState("");
  const [isOpenDropZone, setIsOpenDropZone] = useState(false);
  const isEmailSuccess = useSelector(({ addProfilesReducer }) => addProfilesReducer.inviteByEmail.success);
  const { isFetching, filesList } = useSelector(({ addProfilesReducer }) => addProfilesReducer);
  const userData = useSelector(({ authReducer }) => authReducer.signIn.data);
  const classes = useStyles();
  const dispatch = useDispatch();
  // const regexp = /^\w([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const regexp = /@\w+([\.-]?\w+)/;

  const handleChange = (event) => {
    if (event.target.value.split(",").length > 1) {
      if (regexp.test(event.target.value.split(",")[0])) {
        setEmail((em) => ([...em, { emailString: `${event.target.value.split(",")[0]} `, id: getId(8) }]));
        // dispatch(addEmailAction({ emailString: `${event.target.value.split(",")[0]} `, id: getId(8) }));
        return setValue("");
      }
    }
    setValue(event.target.value);
  };

  const handleInvite = () => {
    const emailsList = Object.values(filesList).reduce((acc, file) => acc = [...acc, ...file], []);
    if (!email.length && regexp.test(value)) {
      emailsList.push({ emailString: value, id: getId(8) });
    }
    if (!emailsList.length && !email.length) return;
    dispatch(inviteByEmailAction([...emailsList, ...email.map((el) => el.emailString)], userData, () => setEmail([])));
  };

  const handleKeyChange = (event) => {
    if (event.code === "Backspace" && !backspaceCheck) {
      setEmail((em) => em.slice(0, em.length - 1));
    }
    setBackspaceCheck(value);
  };

  const handleKeyDownChange = (event) => {
    if (event.code === "Tab" || event.code === "Space") {
      event.preventDefault();
      if (regexp.test(event.target.value)) {
        setEmail((em) => ([...em, { emailString: `${event.target.value} `, id: getId(8) }]));
        return setValue("");
      }
    }
  };

  const handleDeletePreviewFile = (name) => dispatch(removeFileAction(name));

  const removeEmail = (id) => {
    setEmail((em) => em.filter((email) => email.id !== id));
  };

  useEffect(() => {
    if (isEmailSuccess) {
      // setIsOpenDropZone(false);
      setValue("");
      setEmail([]);
      dispatch(clearStateAction("inviteByEmail"));
      dispatch(snackBarAction({
        message: "Invites sent successfully",
        severity: "success",
        duration: 6000,
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
                <input placeholder={email.length ? "" : "Enter emails separated by commas"} className={classes.emailInput} style={email.length ? { minWidth: "10px" } : { width: "35%" }} onChange={handleChange} onKeyDown={handleKeyDownChange} onKeyUp={handleKeyChange} value={value}/>
              </div>

            </div>
            <div
              className={classes.buttonsContainer}
            >
              <div className={classes.importPreviewContainer}>
                <Button
                  className={classes.emailBtn}
                  variant="contained"
                  color="primary"
                  onClick={() => setIsOpenDropZone(true)}
                >
                Import Emails
                </Button>
                <div className={classes.preview}>
                  {Object.keys(filesList).map((file) => (
                    <div className={classes.previewItem} key={file}>
                      <Preview small={true} deleteAction={() => handleDeletePreviewFile(file)} width="50px" height="50px" fileName={file} />
                    </div>
                  ))}
                </div>
              </div>

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
            quantity={1}
            handleClose={() => setIsOpenDropZone(false)}
          />
        </div>
      </>}
    </div>
  );
}

export default EmailInvite;
