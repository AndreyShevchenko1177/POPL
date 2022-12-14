/* eslint-disable import/no-webpack-loader-syntax */
import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Chip, TextField } from "@material-ui/core";
import clsx from "clsx";
import EditIcon from "@material-ui/icons/Edit";
import worker from "workerize-loader!../../../worker";
import useStyles from "../styles/styles";
import { snackBarAction } from "../../../store/actions";
import Loader from "../../Loader";
import { addLinkAction, clearStateAction } from "../../../pages/profiles/store/actions";
import { getId } from "../../../utils";
import UploadFile from "./uploadFile";

function ScreenTwo({
  icon, id, closeWizard, profileData, action, campaingsAction,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const addLinkSuccess = useSelector(({ profilesReducer }) => profilesReducer.addLink.data);
  const isAddLinkFetching = useSelector(({ profilesReducer }) => profilesReducer.addLink.isFetching);
  const [values, setValues] = useState({ title: "", value: "", src: "" });
  const [file, setFile] = useState(null); // custom link icon property
  const [isValid, setIsValid] = useState({ title: true, value: true });
  const fileInputRef = useRef(null);
  const [isFileConverting, setIsFileConverting] = useState(false);
  const [files, setFiles] = useState({}); // for icon type file

  const handleSetLinkUrl = (event) => {
    event.persist();
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onIconAdded = (event) => {
    event.persist();
    // Check if the file is an image.
    const file = event.target?.files[0];
    if ((file?.type.indexOf("image") === -1) && (!["heif", "heic"].includes(file?.name.split(".")[file?.name.split(".").length - 1]))) {
      return dispatch(snackBarAction({
        message: "Invalid file type",
        severity: "error",
        duration: 12000,
        open: true,
      }));
    }

    if (["heif", "heic"].includes(file?.name.split(".")[file?.name.split(".").length - 1])) {
      setIsFileConverting(true);
      let workerInstance = worker();
      return workerInstance.heicToJpg(file).then((convertedFile) => {
        const reader = new FileReader();
        reader.addEventListener("load", (evt) => {
          setValues((prev) => ({ ...prev, src: evt.target.result }));
          setFile(file);
          setIsFileConverting(false);
        });
        const blobFile = new Blob([convertedFile]);
        reader.readAsDataURL(blobFile);
        event.target.value = "";
      });
    }

    setFile(event.target?.files[0]);
    const reader = new FileReader();
    reader.addEventListener("load", (evt) => {
      setValues((prev) => ({ ...prev, src: evt.target.result }));
    });
    reader.readAsDataURL(file);
    event.target.value = "";
  };

  const addLink = () => {
    console.log("addlink");
    if (id === 37) {
      const validation = { value: true, title: true };
      if (!values.title) validation.title = false;
      setIsValid(validation);

      if (!Object.values(files).length) {
        return dispatch(snackBarAction({
          message: "File is required",
          severity: "error",
          duration: 12000,
          open: true,
        }));
      }
      if (Object.values(validation).includes(false)) return;
      setIsValid({ title: true, value: true });
      if (campaingsAction) {
        campaingsAction({
          value: values.value, title: values.title, id, icon: file, file: Object.values(files)[0].file, src: values.src,
        });
        closeWizard();
      } else {
        dispatch(addLinkAction(values.value, values.title, profileData, id, file, Object.values(files)[0].file));
      }
    } else {
      const validation = { value: true, title: true };
      if (!values.value) validation.value = false;
      if (!values.title) validation.title = false;
      setIsValid(validation);
      if (Object.values(validation).includes(false)) return;
      setIsValid({ title: true, value: true });
      if (campaingsAction) {
        campaingsAction({
          value: values.value, title: values.title, id, icon: file, src: values.src,
        });
        closeWizard();
      } else {
        dispatch(addLinkAction(values.value, values.title, profileData, id, file));
      }
    }
  };

  useEffect(() => {
    if (addLinkSuccess === "success") closeWizard();
  }, [addLinkSuccess]);

  useEffect(() => () => {
    dispatch(clearStateAction("addLink"));
  }, []);

  return (
    <div className={classes.linkContainer}>
      <div className={classes.linkImageValueContainer}>
        {isFileConverting
          ? <Loader
            containerStyles={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 170,
              height: 170,
            }}
            styles={{
              width: 30,
              height: 30,
            }}
          />
          : <div className={clsx(classes.secondPageLink)}>
            <img className={values.src ? classes.secondScreenCustomImage : classes.secondScreenLinkImage} src={values.src || icon.icon} alt={id} />
            <div className={classes.editIconWrapper} onClick={() => fileInputRef.current?.click()}>
              <EditIcon className={classes.editIcon}/>
            </div>
            <Chip
              className={classes.chipButton}
              size='medium'
              onDelete={() => {
                setValues({ ...values, src: "" });
                setFile(null);
              }}
            />
            <input
              style={{ display: "none" }}
              ref={fileInputRef}
              type='file'
              multiple={false}
              onChange={onIconAdded}
            />
          </div>}
        {id === 37
          ? <div className={classes.titleUploadWrapper}>
            <div className={clsx(classes.linkValue, "mb-10", !isValid.title && classes.borderRed)}>
              <TextField
                fullWidth
                value={values.title}
                name='title'
                placeholder='Link Title'
                onChange={handleSetLinkUrl}
                InputProps={{
                  disableUnderline: true,
                }}
              />
            </div>
            <UploadFile files={files} setFiles={setFiles} />
          </div>
          : <div className={classes.linkInputsWrapper}>
            <div className={clsx(classes.linkValue, "mb-10", !isValid.title && classes.borderRed)}>
              <TextField
                fullWidth
                value={values.title}
                name='title'
                placeholder='Link Title'
                onChange={handleSetLinkUrl}
                InputProps={{
                  disableUnderline: true,
                }}
              />
            </div>
            <div className={clsx(classes.linkValue, !isValid.value && classes.borderRed)}>
              <TextField
                fullWidth
                value={values.value}
                name='value'
                placeholder={icon.placeholder}
                onChange={handleSetLinkUrl}
                InputProps={{
                  disableUnderline: true,
                }}
              />
              {(!isValid.value || !isValid.title) && <span className={classes.errorText}>Mandatory field</span>}
            </div>
          </div>}
      </div>
      <div className={classes.btnContainer}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          disabled={isAddLinkFetching}
          style={{ height: 36, width: 175 }}
          onClick={action
            ? () => {
              action({ ...values, id, customId: getId(8) });
              closeWizard();
            }
            : addLink
          }
        >
          {isAddLinkFetching && <Loader
            containerStyles={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              height: 20,
            }}
            size={20}
          />}
          {!isAddLinkFetching && "Add link"}
        </Button>
      </div>
    </div>
  );
}

export default ScreenTwo;
