import React, { useRef, useState, useEffect } from "react";
import RemoveIcon from "@material-ui/icons/RemoveCircleOutlineSharp";
import { useDispatch } from "react-redux";
import { Button, Chip, Typography } from "@material-ui/core";
import { nanoid } from "nanoid";
import clsx from "clsx";
import { snackBarAction } from "../../store/actions";
import useStyles from "./styles";

const DropZone = ({
  name, styles, quantity, type, multiple, icon,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [files, setFiles] = useState();
  const [icons] = useState({
    pdf: "../../../../images/pdf.png",
    doc: "../../../../images/doc.png",
    xls: "../../../../images/xls.png",
    unknown: "../../../../images/unknown.png",
  });
  const [dragHover, setDragHower] = useState(false);
  const [validation, setValidation] = useState({
    quantity: false,
    fileType: false,
  });

  const handleDeleteFile = (key) => {
    const result = { ...files };
    delete result[key];
    Object.keys(result).length > 0 ? setFiles(result) : setFiles();
  };

  const readImage = (file, index) => {
    // Check if the file is an image.
    if (file.type && file.type.indexOf("image") === -1) {
      let src = "";
      if (file.type.indexOf("pdf")) src = icons.pdf;
      if (file.type.indexOf("vnd")) {
        const type = file.type.split(".");
        if (type[type.length - 1] === "document") src = icons.doc;
        if (type[type.length - 1] === "sheet") src = icons.xls;
      }
      if (src === "") src = icons.unknown;
      return setFiles((prev) => ({ ...prev, [nanoid(5)]: { file, src } }));
    }
    const reader = new FileReader();
    reader.addEventListener("load", (event) => {
      setFiles((prev) => ({ ...prev, [nanoid(5)]: { file, src: event.target.result } }));
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

  const onDrop = (event) => {
    stopEvent(event);
    const file = event.dataTransfer.files;
    if (quantity && files && Object.keys(files).length >= quantity) {
      setValidation((prev) => ({ ...prev, quantity: true }));
      setDragHower(false);
      return;
    }
    if (type && file && file[0].type && file[0].type.indexOf(type) === -1) {
      setValidation((prev) => ({ ...prev, fileType: true }));
      setDragHower(false);
      return;
    }
    setValidation((prev) => ({ ...prev, quantity: false }));
    setValidation((prev) => ({ ...prev, fileType: false }));
    handleFilesObject(file);

    setDragHower(false);
  };

  const openFileDialog = () => {
    fileInputRef.current.click();
  };

  const onFilesAdded = (event) => {
    event.persist();
    const file = event.target.files;
    if (quantity && files && Object.keys(files).length >= quantity) {
      setValidation((prev) => ({ ...prev, quantity: true }));
      return;
    }
    if (type && file && file[0].type && file[0].type.indexOf(type) === -1) {
      setValidation((prev) => ({ ...prev, fileType: true }));
      return;
    }
    setValidation((prev) => ({ ...prev, quantity: false }));
    setValidation((prev) => ({ ...prev, fileType: false }));
    handleFilesObject(file);
  };

  // useEffect(() => {
  //   if (files) {
  //     const result = [];
  //     Object.keys(files).forEach((item) => {
  //       result.push(files[item].file);
  //     });
  //     dispatch(dropZoneAction({ [name]: result }));
  //   } else dispatch(dropZoneAction({ [name]: null }));
  // }, [files]);

  useEffect(() => {
    validation.fileType && dispatch(snackBarAction({
      message: "Invalid file type",
      severity: "error",
      duration: 3000,
      open: true,
    }));
    validation.quantity && dispatch(snackBarAction({
      message: `Maximum files quantity is ${quantity}`,
      severity: "error",
      duration: 3000,
      open: true,
    }));
  });

  return (
    <div className={styles.wrapper}>
      <div
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onClick={openFileDialog}
        className={styles.container}
        style={files ? { justifyContent: "space-between", borderColor: dragHover ? "#0238e8" : " #d0d0d0" } : { margin: 0, justifyContent: "center", borderColor: dragHover ? "#0238e8" : " #d0d0d0" }}
      >
        { !files
          ? <div className={styles.iconContainer}>{icon || <img alt='clip icon' src='../../../../images/clip.png' />}</div>
          : <div className={classes.previewContainer} >
            {
              Object.keys(files).map((file) => (
                <div key={file} className={classes.imageContainer}>
                  {console.log(files[file].src)}
                  <img className={classes.image} alt='preview' src={files[file].src} />
                  <Chip
                    className={classes.chipButton}
                    deleteicon={<RemoveIcon />}
                    size='medium'
                    onDelete={() => handleDeleteFile(file)}
                  />
                </div>
              ))
            }
          </div>
        }
        <input
          ref={fileInputRef}
          type='file'
          multiple={!!multiple}
          onChange={onFilesAdded}
        />
        <div className={classes.dragFilesHeader}>
          <p>Drag and drop CSV here</p>
          <p>or select from computer</p>
        </div>
        <div className={classes.textInstructionContainer}>
          <Typography variant='h5'>File Format:</Typography>
          <ol>
            <li>Must be CSV</li>
            <li>First row is column header</li>
            <li>One of the header must be "Email" or "Email Address"</li>
          </ol>
        </div>
        <Button
          className={classes.buttonWrapper}
          onClick={(e) => e.stopPropagation()}
          variant="contained"
          color="primary"
        >
            Import File
        </Button>
      </div>
    </div>
  );
};

export default DropZone;
