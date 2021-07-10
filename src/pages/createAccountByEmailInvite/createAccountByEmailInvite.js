/* eslint-disable no-useless-return */
/* eslint-disable no-return-assign */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Button, Grid, Typography } from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import clsx from "clsx";
import {
  inviteByEmailAction, clearAction, removeFileAction, addFileNewProfileAction,
} from "./store/actions";
import { snackBarAction } from "../../store/actions";
import useStyles from "./styles";
import { getId } from "../../utils/uniqueId";
import Loader from "../../components/Loader";
import DropZone from "../../components/dropZone";
import SvgMaker from "../../components/svgMaker";
import Preview from "../../components/dropZone/components/Preview";
import Header from "../../components/Header";

function CreateAccountByEmailIvite() {
  const location = useLocation();
  const [value, setValue] = useState("");
  const [email, setEmail] = useState([]);
  const [backspaceCheck, setBackspaceCheck] = useState("");
  const [isOpenDropZone, setIsOpenDropZone] = useState(false);
  const { isFetching, filesList } = useSelector(({ createAccountByEmailInvite }) => createAccountByEmailInvite);
  const classes = useStyles();
  const dispatch = useDispatch();
  const regexp = /@\w+([\.-]?\w+)/;

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
    const emailsList = Object.values(filesList).reduce((acc, file) => acc = [...acc, ...file], []);
    // when user didn't distinguished typed email with "Tab" or comma
    // and there are no other distinguished this way emails check validity of email and send it
    if (!email.length && regexp.test(value)) {
      emailsList.push(value);
    }
    if (!emailsList.length && !email.length) return;
    dispatch(inviteByEmailAction([...emailsList, ...email.map((el) => el.emailString)], () => {
      setValue("");
      setEmail([]);
      dispatch(clearAction("inviteByEmail"));
      dispatch(removeFileAction(Object.keys(filesList)[0]));
    }));
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

  return (
    <React.Fragment>
      <Header
        firstChild
        path={location.pathname === location.state.path ? location.state.rootPath : location.state.path}
      />
      <div className={classes.rootDiv}>
        <Typography variant='subtitle1' classes={{ subtitle1: classes.heading }}>Invite users to add or create Popl accounts via email</Typography>
        {isFetching && <Loader styles={{ position: "absolute", top: "calc(50% - 20px)", left: "calc(50% - 20px)" }} />}
        <div className={classes.rootWrapper}>
          <Grid container className={classes.emailsComponentWrapper}>
            <div className={classes.emailContainer}>
              <div className={classes.emailChipContainer}>
                {email.map(({ emailString, id }) => <div key={id} className={classes.emailChip}>
                  <p>
                    {emailString}
                  </p>
                  <HighlightOffIcon className={classes.icon} onClick={() => removeEmail(id)}/>
                </div>)}
                <input placeholder={email.length ? "" : "Enter emails separated by commas"} className={classes.emailInput} style={email.length ? { minWidth: "10px" } : { width: "40%", backgroundColor: "transparent" }} onChange={handleChange} onKeyDown={handleKeyDownChange} onKeyUp={handleKeyChange} value={value}/>
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
                  disabled={isFetching}
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
                disabled={isFetching}
              >
                Send invite
              </Button>
            </div>
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
                addFileAction={addFileNewProfileAction}
                isFetching={isFetching}
                filesList={filesList}
              />
            </div>
          </>}
        </div>
      </div>
    </React.Fragment>
  );
}

export default CreateAccountByEmailIvite;
