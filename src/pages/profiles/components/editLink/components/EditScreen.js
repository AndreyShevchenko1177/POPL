/* eslint-disable import/no-webpack-loader-syntax */
import React, { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import {
  TextField, Button, Typography, IconButton, Chip,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import RemoveIcon from "@material-ui/icons/Remove";
import worker from "workerize-loader!../../../../../worker";
import useStyles from "../styles/styles";
import Popup from "../../../../../components/popup";
import { snackBarAction } from "../../../../../store/actions";
import Loader from "../../../../../components/Loader";
import UploadFile from "../../../../../components/wizard/components/uploadFile";
import fileIcon from "../../../../../assets/file.png";

function EditScreen({
  currentIcon,
  icon,
  id,
  title,
  value,
  hash,
  isDeleteTab,
  profileBtnTitle,
  allProfilesBtnTitle,
  profileBtnEvent,
  allProfileBtnEvent,
  deleteBtnTitle,
  deleteAction,
  deleteAllLinksAction,
  setLinkOrdering,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState({ title: "", value: "" });
  const [isValid, setIsValid] = useState({ title: true, value: true });
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [src, setSrc] = useState("");
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const [isFileConverting, setIsFileConverting] = useState(false);
  const isEditLinksFetching = useSelector(({ profilesReducer }) => profilesReducer.editLink.isFetching);
  const isDeleteLinksFetching = useSelector(({ profilesReducer }) => profilesReducer.deleteLink.isFetching);
  const [uploadedFiles, setUploadedFiles] = useState({});

  const handleOpenPopup = () => setIsOpenPopup(!isOpenPopup);

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
          setSrc(evt.target.result);
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
      setSrc(evt.target.result);
    });
    reader.readAsDataURL(file);
    event.target.value = "";
  };

  const popupConfig = [
    {
      id: 1,
      name: deleteBtnTitle,
      onClick: () => deleteAction(hash, inputValue.value || value, inputValue.title || title),
    },
    {
      id: 2,
      name: "Delete link from all profiles",
      onClick: () => deleteAllLinksAction(hash, id, title, value, inputValue.value || value, inputValue.title || title),
    },
  ];

  const handleSetLinkUrl = (event) => {
    event.persist();
    setInputValue({ ...inputValue, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    setInputValue({ title: title || "", value: value || "" });
    const fileName = value?.split("%5E")[1];
    setUploadedFiles([{ file: { name: fileName || value || "" }, src: fileIcon }]);
  }, []);

  useEffect(() => {
    if (isDeleteLinksFetching) setIsOpenPopup(false);
  }, [isDeleteLinksFetching]);

  return (
    <div style={{ justifyContent: isDeleteTab ? "center" : "space-between" }} className={classes.linkContainer}>
      <div style={isDeleteTab ? { height: "auto", paddingBottom: 60 } : {}} className={classes.linkImageValueContainer}>
        {isFileConverting
          ? <Loader
            containerStyles={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 200,
              height: 200,
            }}
            styles={{
              width: 30,
              height: 30,
            }}
          />
          : <div className={classes.secondPageLink}>
            <Popup
              config={popupConfig}
              isOpen={isOpenPopup}
              handleClose={handleOpenPopup}
              styles={classes.popup}
            />

            <IconButton
              className={classes.removeButton}
              onClick={() => setIsOpenPopup(!isOpenPopup)}
            >
              <RemoveIcon className={classes.removeIcon} />
            </IconButton>
            {!file
              ? <div className={classes.editIconWrapper} onClick={() => fileInputRef.current?.click()}>
                <EditIcon className={classes.editIcon}/>
              </div>
              : <Chip
                className={classes.chipButton}
                size='medium'
                onDelete={() => {
                  setSrc("");
                  setFile(null);
                }}
              />}
            <img className={classes.secondScreenLinkImage} src={src || (icon
              ? `${process.env.REACT_APP_BASE_FIREBASE_CUSTOM_ICON}${icon}?alt=media`
              : currentIcon.icon)} alt={id} />
          </div>}
        {!isDeleteTab && <div className={classes.linkInputsWrapper}>
          <div className={classes.labelContainer}>
            <Typography variant='h5'>Title</Typography>
          </div>
          <div className={clsx(classes.linkValue, "mb-10", !isValid.title && classes.borderRed)}>
            <TextField
              fullWidth
              value={inputValue.title}
              name='title'
              placeholder='Link Title'
              onChange={handleSetLinkUrl}
              InputProps={{
                disableUnderline: true,
              }}
            />
          </div>
          {id === 37
            ? <UploadFile
              styles={{
                dashedContainer: { height: 60 },
                image: { width: 30, height: 30 },
                chipButton: { top: "-16px", right: "10px" },
                container: { width: "100%" },
              }}
              files={uploadedFiles}
              setFiles={setUploadedFiles}

            />
            : <>
              <div className={classes.labelContainer}>
                <Typography variant='h5'>Url</Typography>
              </div>
              <div className={clsx(classes.linkValue, !isValid.value && classes.borderRed)}>
                <TextField
                  fullWidth
                  value={inputValue.value}
                  name='value'
                  placeholder={currentIcon.placeholder}
                  onChange={handleSetLinkUrl}
                  InputProps={{
                    disableUnderline: true,
                  }}
                />
                {(!isValid.value || !isValid.title) && <span className={classes.errorText}>Mandatory field</span>}
              </div>
            </>}
        </div>}
      </div>
      <div className={classes.btnContainer}>
        <div>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            disabled={isEditLinksFetching || isDeleteLinksFetching}
            style={{ whiteSpace: "nowrap", width: 218, height: 36 }}
            className={classes.editLink}
            onClick={() => {
              if (!Object.values(uploadedFiles).length) {
                return dispatch(snackBarAction({
                  message: "File is required",
                  severity: "error",
                  duration: 12000,
                  open: true,
                }));
              }
              profileBtnEvent(hash, inputValue.value || value, inputValue.title || title, file, Object.values(uploadedFiles)[0].file);
            }}
          >
            {(isEditLinksFetching || isDeleteLinksFetching) && <Loader
              containerStyles={{
                position: "absolute",
                top: 10,
                left: 99,
                height: 20,
              }}
              size={20}
            />}
            {(!isEditLinksFetching || isDeleteLinksFetching) && profileBtnTitle}
          </Button>
        </div>
        <div>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            disabled={isEditLinksFetching || isDeleteLinksFetching}
            className={classes.editLink}
            style={{ whiteSpace: "nowrap", width: 218, height: 36 }}
            onClick={() => {
              if (!Object.values(uploadedFiles).length) {
                return dispatch(snackBarAction({
                  message: "File is required",
                  severity: "error",
                  duration: 12000,
                  open: true,
                }));
              }
              allProfileBtnEvent(hash, id, title, value, inputValue.value || value, inputValue.title || title, file, Object.values(uploadedFiles)[0].file);
            }}
          >
            {(isEditLinksFetching || isDeleteLinksFetching) && <Loader
              containerStyles={{
                position: "absolute",
                top: 10,
                left: 99,
                height: 20,
              }}
              size={20}
            />}
            {(!isEditLinksFetching || !isDeleteLinksFetching) && allProfilesBtnTitle}
          </Button>
        </div>
        <div>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            disabled={isEditLinksFetching || isDeleteLinksFetching}
            style={{ whiteSpace: "nowrap", width: 218, height: 36 }}
            className={classes.editLink}
            onClick={() => setLinkOrdering(id)}
          >
            {(isEditLinksFetching || isDeleteLinksFetching) && <Loader
              containerStyles={{
                position: "absolute",
                top: 10,
                left: 99,
                height: 20,
              }}
              size={20}
            />}
            {(!isEditLinksFetching || !isDeleteLinksFetching) && "Make link first for all profiles"}
          </Button>
        </div>
      </div>
      <input
        style={{ display: "none" }}
        ref={fileInputRef}
        type='file'
        multiple={false}
        onChange={onIconAdded}
      />
    </div>
  );
}
export default EditScreen;
