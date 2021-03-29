import React, {
  useRef, useState, useEffect,
} from "react";
import RemoveIcon from "@material-ui/icons/RemoveCircleOutlineSharp";
import { useDispatch } from "react-redux";
import { Button, Chip, Typography } from "@material-ui/core";
import Papa from "papaparse";
import { snackBarAction } from "../../store/actions";
import useStyles from "./styles";
import SvgMaker from "../svgMaker/SvgMaker";
import { inviteByEmailAction } from "../../pages/newProfile/store/actions";
import { getId } from "../../utils/uniqueId";

const DropZone = ({
  name, styles, quantity, type = "vnd.ms-excel", multiple, icon, zoneRef, onBlur, blur, setBlur,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [files, setFiles] = useState({});
  const [parseCsv, setParseCsv] = useState();
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
    Object.keys(result).length > 0 ? setFiles(result) : setFiles({});
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
      return setFiles((prev) => ({ ...prev, [getId(12)]: { file, src } }));
    }
    const reader = new FileReader();
    reader.addEventListener("load", (event) => {
      setFiles((prev) => ({ ...prev, [getId(12)]: { file, src: event.target.result } }));
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
      event.target.value = "";
      return;
    }
    setValidation((prev) => ({ ...prev, quantity: false, fileType: false }));
    handleFilesObject(file);

    setDragHower(false);
  };

  const openFileDialog = () => {
    setBlur(true);
    fileInputRef.current?.click();
  };

  const onFilesAdded = async (event) => {
    event.persist();
    const file = event.target.files;
    if (quantity && files && Object.keys(files).length >= quantity) {
      setValidation((prev) => ({ ...prev, quantity: true }));
      return;
    }
    if (type && file && file[0] && file[0].type && file[0].type.indexOf(type) === -1) {
      setValidation((prev) => ({ ...prev, fileType: true }));
      event.target.value = "";
      return;
    }
    setValidation((prev) => ({ ...prev, quantity: false }));
    setValidation((prev) => ({ ...prev, fileType: false }));
    const config = {
      complete(results, files) {
        setParseCsv(results.data);
        handleFilesObject(file);
        event.target.value = "";
      },
    };
    Papa.parse(file[0], config);
  };

  const importCsv = (event) => {
    event.stopPropagation();
    // const correctEmailsArray;
    const [header, ...emails] = parseCsv;
    let index = header.indexOf("Email") || header.indexOf("Email Address");
    if (index !== -1) {
      const result = emails.map((el) => el[index]).filter((el) => el);
      if (!result.length) {
        return dispatch(snackBarAction({
          message: "No emails was found",
          severity: "error",
          duration: 3000,
          open: true,
        }));
      }
      return dispatch(inviteByEmailAction(result));
    }
    return dispatch(snackBarAction({
      message: "No \"Email\" or \"Email Address\" column was found",
      severity: "error",
      duration: 3000,
      open: true,
    }));
  };

  useEffect(() => {
    if (validation.fileType) {
      validation.fileType && dispatch(snackBarAction({
        message: "Invalid file type",
        severity: "error",
        duration: 3000,
        open: true,
      }));
      setValidation({ ...validation, fileType: false });
    }
  }, [validation]);

  return (
    <div className={styles.wrapper}>
      <div
        ref={zoneRef}
        onBlur={(event) => onBlur(event, blur)}
        tabIndex={1}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onClick={openFileDialog}
        className={styles.container}
        style={files ? { justifyContent: "space-between", borderColor: dragHover ? "#0238e8" : " #d0d0d0" } : { margin: 0, justifyContent: "center", borderColor: dragHover ? "#0238e8" : " #d0d0d0" }}
      >
        { !Object.keys(files).length
          ? <div className={styles.iconContainer}>{icon}</div>
          : <div className={classes.previewContainer}>
            {
              Object.keys(files).map((file) => (
                <div key={file} >
                  <div className={classes.imageContainer}>
                    <SvgMaker name={"csv"} fill='#fff' width={"50px"} height={"50px"} />
                    <Chip
                      className={classes.chipButton}
                      deleteicon={<RemoveIcon />}
                      size='medium'
                      onDelete={() => handleDeleteFile(file)}
                    />
                    <div className={classes.fileName}>{Object.values(files)[0].file.name}</div>
                  </div>
                </div>
              ))
            }
          </div>
        }
        { !Object.keys(files).length && <input
          ref={fileInputRef}
          type='file'
          multiple={!!multiple}
          onChange={onFilesAdded}
        />}
        {!files && <div className={classes.dragFilesHeader}>
          <p>Drag and drop CSV here</p>
          <p>or select from computer</p>
        </div>}
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
          onClick={(e) => importCsv(e)}
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
