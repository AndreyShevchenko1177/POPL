import React, {
  useRef, useState, useEffect,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Typography } from "@material-ui/core";
import Papa from "papaparse";
import { snackBarAction } from "../../store/actions";
import useStyles from "./styles";
import Loader from "../Loader";
import { addFileAction } from "../../pages/newProfile/store/actions";
import { getId } from "../../utils/uniqueId";
import Preview from "./components/Preview";

const DropZone = ({
  name, styles, quantity, type = ["vnd.ms-excel", "text/csv"], multiple, icon, handleClose,
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
    duplicated: false,
  });
  const { isFetching, filesList } = useSelector(({ addProfilesReducer }) => addProfilesReducer);
  const userData = useSelector(({ authReducer }) => authReducer.signIn.data);

  const handleDeleteFile = (key) => {
    const result = { ...files };
    delete result[key];
    Object.keys(result).length > 0 ? setFiles(result) : setFiles({});
  };

  const handleUpload = (e) => {
    dispatch(snackBarAction({
      message: "File uploaded",
      severity: "success",
      duration: 3000,
      open: true,
    }));
    importCsv(e);
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
    if (file && file[0] && file[0].name && file[0].name.split(".")[file[0].name.split(".").length - 1] !== "csv") {
      setValidation((prev) => ({ ...prev, fileType: true }));
      setDragHower(false);
      event.target.value = "";
      return;
    }
    setValidation((prev) => ({
      ...prev, quantity: false, fileType: false, duplicated: false,
    }));
    const config = {
      complete(results, files) {
        setParseCsv(results.data);
        handleFilesObject(file);
        event.target.value = "";
      },
    };
    Papa.parse(file[0], config);

    setDragHower(false);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const onFilesAdded = async (event) => {
    event.persist();
    const file = event.target.files;
    if (quantity && files && Object.keys(files).length >= quantity) {
      setValidation((prev) => ({ ...prev, quantity: true }));
      return;
    }
    if (file && file[0] && file[0].name && file[0].name.split(".")[file[0].name.split(".").length - 1] !== "csv") {
      setValidation((prev) => ({ ...prev, fileType: true }));
      event.target.value = "";
      return;
    }
    if (Object.keys(filesList).includes(file[0].name)) {
      setValidation((prev) => ({ ...prev, duplicated: true }));
      setDragHower(false);
      event.target.value = "";
      return;
    }
    setValidation((prev) => ({
      ...prev, quantity: false, fileType: false, duplicated: false,
    }));
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
    let [header, ...emails] = parseCsv;
    header = header.map((el) => el.toLowerCase());
    let index = header.indexOf("email") !== -1
      ? header.indexOf("email")
      : header.indexOf("email address") !== -1
        ? header.indexOf("email address")
        : -1;

    if (index >= 0) {
      const result = emails.map((el) => el[index]).filter((el, i, array) => el && array.indexOf(el) === i);
      if (!result.length) {
        return dispatch(snackBarAction({
          message: "No emails was found",
          severity: "error",
          duration: 3000,
          open: true,
        }));
      }
      dispatch(addFileAction({ fileName: Object.values(files)[0].file.name, emails: result }));
      return handleClose();
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
    if (validation.quantity) {
      validation.quantity && dispatch(snackBarAction({
        message: "You can add only one file in one time",
        severity: "error",
        duration: 3000,
        open: true,
      }));
      setValidation({ ...validation, quantity: false });
    }
    if (validation.duplicated) {
      validation.duplicated && dispatch(snackBarAction({
        message: "You already uploaded this file",
        severity: "error",
        duration: 3000,
        open: true,
      }));
      setValidation({ ...validation, duplicated: false });
    }
  }, [validation]);

  return (
    <div className={styles.wrapper}>
      <div
        tabIndex={1}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onClick={openFileDialog}
        className={styles.container}
      >
        <div style={dragHover ? { borderColor: "#3da5f5" } : {}} className={classes.dashedContainer}>
          { !Object.keys(files).length
            ? (
              <div className={classes.IconTextWrapper}>
                <div className={styles.iconContainer}>{icon}</div>
                <Typography variant='body2'>Drag and drop your CSV here</Typography>
                <p className={classes.selectLink}>Or select it from your computer</p>
              </div>
            )
            : <div className={classes.previewContainer}>
              {
                Object.keys(files).map((file) => (
                  <div key={file} >
                    <Preview fileName={Object.values(files)[0].file.name} deleteAction={() => handleDeleteFile(file)} />
                  </div>
                ))
              }
            </div>
          }
        </div>
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
          {isFetching
            ? <Loader />
            : <>
              <Typography variant='h5'>File Format:</Typography>
              <ol>
                <li>Must be CSV</li>
                <li>Maximum file size is <b>50MB</b></li>
                <li>First row is column header</li>
                <li>One of the header must be "Email" or "Email Address"</li>
              </ol>
            </>}
        </div>
        {!isFetching && !!Object.keys(files).length && <Button
          className={classes.buttonWrapper}
          onClick={(e) => handleUpload(e)}
          variant="contained"
          color="primary"
        >
          Upload File
        </Button>}
      </div>
    </div>
  );
};

export default DropZone;
