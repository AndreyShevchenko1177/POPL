import React, {
  useRef, useState, useEffect,
} from "react";
import { useDispatch } from "react-redux";
import { Typography, Chip } from "@material-ui/core";
import RemoveIcon from "@material-ui/icons/RemoveCircleOutlineSharp";
import CreateIcon from "@material-ui/icons/Create";
import clsx from "clsx";
import { snackBarAction } from "../../store/actions";
import useStyles from "./styles";
import { getId } from "../../utils";
import Preview from "./components/Preview";
import SvgMaker from "../svgMaker";

const UploadImage = ({
  quantity, multiple, setFieldsState, image,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [files, setFiles] = useState({});
  const [icons] = useState({
    pdf: "../../../../images/pdf.png",
    doc: "../../../../images/doc.png",
    xls: "../../../../images/xls.png",
    unknown: "../../../../images/unknown.png",
  });
  const [validation, setValidation] = useState({
    quantity: false,
    fileType: false,
    duplicated: false,
  });
  const [companyImage, setCompanyImage] = useState("");

  const handleDeleteFile = (key) => {
    const result = { ...files };
    delete result[key];
    Object.keys(result).length > 0 ? setFiles(result) : setFiles({});
    // if (image) setFieldsState((fs) => ({ ...fs, file: image }));
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
      return setFiles((prev) => ({ [getId(12)]: { file, src } }));
    }
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
    if (!file[0]?.type.includes("image")) {
      setValidation((prev) => ({ ...prev, fileType: true }));
      event.target.value = "";
      return;
    }
    setValidation((prev) => ({
      ...prev, quantity: false, fileType: false, duplicated: false,
    }));
    setFieldsState(file[0]);
    setCompanyImage("");
    handleFilesObject(file);
    event.target.value = "";
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

  useEffect(() => {
    if (image) {
      setCompanyImage(image);
    }
  }, [image]);

  return (
    <div className={classes.container}>
      <div
        onClick={companyImage ? () => {} : openFileDialog}
        className={classes.headingDropZoneWrapper}
      >
        {
          !companyImage
            ? <div className={classes.dashedContainer}>
              { !Object.keys(files).length
                ? (
                  <div className={classes.IconTextWrapper}>
                    <div className={classes.iconContainer}>
                      <SvgMaker name="uploadCloud" fill="#999a9b" width={30} height={30} />
                    </div>
                    <Typography variant='subtitle1' classes={{ subtitle1: classes.uploadImageText }}>Upload</Typography>
                  </div>
                )
                : <div className={classes.previewContainer}>
                  {
                    Object.keys(files).map((key) => (
                      <div key={key} >
                        <Preview openFileDialog={openFileDialog} file={files[key]} deleteAction={() => handleDeleteFile(key)} />
                      </div>
                    ))
                  }
                </div>
              }
            </div>
            : <div className={clsx(classes.headingDropZoneWrapper, classes.companyImageWrapper, "relative")}>
              <Chip
                className={classes.chipButton}
                deleteiicon={<RemoveIcon />}
                size='medium'
                onDelete={() => {
                  setCompanyImage("");
                  setFieldsState(null);
                }}
              />
              <img className={classes.image} alt='avatar' src={`${process.env.REACT_APP_BASE_FIREBASE_CUSTOM_ICON}${image}?alt=media`} />
              <Chip
                className={classes.chipButtonEdit}
                deleteIcon={<CreateIcon />}
                size='medium'
                onDelete={() => openFileDialog()}
              />
            </div>
        }
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

export default UploadImage;
