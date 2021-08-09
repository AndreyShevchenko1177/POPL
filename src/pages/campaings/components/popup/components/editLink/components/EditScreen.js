/* eslint-disable import/no-webpack-loader-syntax */
import React, { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import {
  TextField, Button, Typography, IconButton, Chip,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import RemoveIcon from "@material-ui/icons/Remove";
import worker from "workerize-loader!../../../../../../../worker";
import useStyles from "../styles/styles";
import Popup from "../../../../../../../components/popup";
import { snackBarAction } from "../../../../../../../store/actions";
import Loader from "../../../../../../../components/Loader";
import UploadFile from "../../../../../../../components/wizard/components/uploadFile";
import fileIcon from "../../../../../../../assets/file.png";
import { uploadImage } from "../../../../../../../config/firebase.query";
import icons from "../../../../../../profiles/components/profilelsIcons/icons";

function EditScreen({
  id,
  title,
  value,
  action,
  closeModal,
  ...rest
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isValid, setIsValid] = useState({ title: true, value: true });
  const [src, setSrc] = useState("");
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const [isFileConverting, setIsFileConverting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState({});

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

  useEffect(() => {
    if (rest.src) setSrc(rest.src);
    if (id === 37) {
      setUploadedFiles([{ file: { name: rest.file?.name }, src: fileIcon }]);
    }
  }, []);

  return (
    <div style={{ justifyContent: "space-between" }} className={classes.linkContainer}>
      <div className={classes.linkImageValueContainer}>
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
            <img className={classes.secondScreenLinkImage} src={src || icons[id].icon} alt={id} />
          </div>}
        <div className={classes.linkInputsWrapper}>
          <div className={classes.labelContainer}>
            <Typography variant='h5'>Title</Typography>
          </div>
          <div className={clsx(classes.linkValue, "mb-10", !isValid.title && classes.borderRed)}>
            <TextField
              fullWidth
              value={title}
              name='title'
              placeholder='Link Title'
              onChange={(event) => action((prev) => ({ ...prev, link: { ...prev.link, title: event.target.value } }))}
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
                  value={value}
                  name='value'
                  placeholder="Link value"
                  onChange={(event) => action((prev) => ({ ...prev, link: { ...prev.link, value: event.target.value } }))}
                  InputProps={{
                    disableUnderline: true,
                  }}
                />
                {(!isValid.value || !isValid.title) && <span className={classes.errorText}>Mandatory field</span>}
              </div>
            </>}
        </div>
      </div>
      <div className={classes.btnContainer}>
        <div>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            style={{ whiteSpace: "nowrap", width: 218, height: 36 }}
            className={classes.editLink}
            onClick={() => {
              if (id === 37 && !Object.values(uploadedFiles).length) {
                return dispatch(snackBarAction({
                  message: "File is required",
                  severity: "error",
                  duration: 12000,
                  open: true,
                }));
              }
              action((prev) => ({
                ...prev,
                link: {
                  ...prev.link, value, title, src, icon: file, file: Object.values(uploadedFiles)[0]?.file,
                },
              }));
              closeModal();
            }}
          >
            Edit Link
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
