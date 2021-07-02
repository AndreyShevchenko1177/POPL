import React, {
  useRef, useState, useEffect,
} from "react";
import { useDispatch } from "react-redux";
import { Typography, Chip } from "@material-ui/core";
import RemoveIcon from "@material-ui/icons/RemoveCircleOutlineSharp";
import CreateIcon from "@material-ui/icons/Create";
import clsx from "clsx";
import { snackBarAction } from "../../../../store/actions";
import useStyles from "./styles";
import { getId } from "../../../../utils";
import Preview from "./components/Preview";
import SvgMaker from "../../../svgMaker";
import fileIcon from "../../../../assets/file.png";

const UploadFile = ({
  quantity = 1, multiple, files, setFiles,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const [validation, setValidation] = useState({
    quantity: false,
    fileType: false,
    duplicated: false,
  });
  const [dragHover, setDragHower] = useState(false);

  const readImage = (file, index) => {
    // Check if the file is an image.
    if (file.type && file.type.indexOf("image") === -1) return setFiles((prev) => ({ [getId(12)]: { file, src: fileIcon } }));

    const reader = new FileReader();
    reader.addEventListener("load", (event) => {
      setFiles((prev) => ({ [getId(12)]: { file, src: event.target.result } }));
    });
    reader.readAsDataURL(file);
  };

  const handleFilesObject = (files) => {
    if (!files) return;
    const result = {};
    Object.values(files).forEach((file, i) => {
      result[i] = { file };
      readImage(file, i);
    });
  };

  const stopEvent = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const onDragOver = (event) => {
    stopEvent(event);
    setDragHower(true);
  };

  const onDragLeave = (event) => {
    stopEvent(event);
    setDragHower(false);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const onDrop = (event) => {
    stopEvent(event);

    const file = event.dataTransfer.files;
    if (quantity && files && Object.keys(files).length >= quantity) {
      setValidation((prev) => ({ ...prev, quantity: true }));
      return;
    }
    console.log("file", file, event.target);
    setValidation((prev) => ({
      ...prev, quantity: false, fileType: false, duplicated: false,
    }));
    handleFilesObject(file);
    event.target.value = "";
    setDragHower(false);
  };

  const onFilesAdded = async (event) => {
    const file = event.target.files;
    if (quantity && files && Object.keys(files).length >= quantity) {
      setValidation((prev) => ({ ...prev, quantity: true }));
      return;
    }
    setValidation((prev) => ({
      ...prev, quantity: false, fileType: false, duplicated: false,
    }));
    handleFilesObject(file);
    event.target.value = "";
  };

  useEffect(() => {
    if (validation.fileType) {
      validation.fileType && dispatch(snackBarAction({
        message: "Invalid file type",
        severity: "error",
        duration: 6000,
        open: true,
      }));
      setValidation({ ...validation, fileType: false });
    }
    if (validation.quantity) {
      validation.quantity && dispatch(snackBarAction({
        message: "You can add only one file in one time",
        severity: "error",
        duration: 6000,
        open: true,
      }));
      setValidation({ ...validation, quantity: false });
    }
    if (validation.duplicated) {
      validation.duplicated && dispatch(snackBarAction({
        message: "You already uploaded this file",
        severity: "error",
        duration: 6000,
        open: true,
      }));
      setValidation({ ...validation, duplicated: false });
    }
  }, [validation]);

  return (
    <div className={classes.container}>
      <div
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onClick={openFileDialog}
        className={classes.headingDropZoneWrapper}
      >
        <div style={dragHover ? { borderColor: "#3da5f5" } : {}} className={classes.dashedContainer}>
          { !Object.keys(files).length
            ? (
              <div className={classes.IconTextWrapper}>
                <Typography variant='body2'>Drag and drop your file here</Typography>
                <p className={classes.selectLink}>Or select it from your computer</p>
              </div>
            )
            : <div className={classes.previewContainer}>
              {
                Object.keys(files).map((file) => (
                  <div key={file} >
                    <Preview file={Object.values(files)[0]} deleteAction={() => setFiles({})} />
                  </div>
                ))
              }
            </div>
          }
        </div>
        { <input
          ref={fileInputRef}
          type='file'
          multiple={!!multiple}
          onChange={onFilesAdded}
        />}
      </div>
    </div>
  );
};

export default UploadFile;
