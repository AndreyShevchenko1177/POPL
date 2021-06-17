/* eslint-disable import/no-webpack-loader-syntax */
import React, {
  useRef, useState, useEffect,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Chip } from "@material-ui/core";
import RemoveIcon from "@material-ui/icons/RemoveCircleOutlineSharp";
import CreateIcon from "@material-ui/icons/Create";
import clsx from "clsx";
import worker from "workerize-loader!../../../../worker";
import { snackBarAction } from "../../../../store/actions";
import { isFileConvertingAction } from "../../store/actions";
import useStyles from "./styles";
import { getId } from "../../../../utils/uniqueId";
import Preview from "./components/Preview";
import SvgMaker from "../../../../components/svgMaker";
import { restrictEdit } from "../../../../utils";
import Loader from "../../../../components/Loader";

const DropZone = ({
  quantity, multiple, setFieldsState, image,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [files, setFiles] = useState({});
  const { isFileConverting } = useSelector(({ generalSettingsReducer }) => generalSettingsReducer);

  const [validation, setValidation] = useState({
    quantity: false,
    fileType: false,
    duplicated: false,
  });
  const [companyImage, setCompanyImage] = useState("");
  const parentProfilefId = useSelector(({ authReducer }) => authReducer.signIn.data.id);

  const handleDeleteFile = (key) => {
    const result = { ...files };
    delete result[key];
    Object.keys(result).length > 0 ? setFiles(result) : setFiles({});
    setFieldsState((prev) => ({ ...prev, file: null }));
  };

  const readImage = (file, index) => {
    // Check if the file is an image with heic/heif extension.
    if (["heif", "heic"].includes(file?.name.split(".")[file?.name.split(".").length - 1])) {
      dispatch(isFileConvertingAction(true));
      let workerInstance = worker();
      return workerInstance.heicToJpg(file).then((convertedFile) => {
        const reader = new FileReader();
        reader.addEventListener("load", (event) => {
          setFiles((prev) => ({ [getId(12)]: { file, src: event.target.result } }));
          dispatch(isFileConvertingAction(false));
        });
        const blobFile = new Blob([convertedFile]);
        reader.readAsDataURL(blobFile);
      });
    }
    setFieldsState((fs) => ({ ...fs, file }));
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
    if (restrictEdit(parentProfilefId)) {
      return dispatch(snackBarAction({
        message: "Can not edit demo account",
        severity: "error",
        duration: 6000,
        open: true,
      }));
    }
    fileInputRef.current?.click();
  };

  const onFilesAdded = async (event) => {
    event.persist();
    const file = event.target.files;
    if (quantity && files && Object.keys(files).length >= quantity) {
      setValidation((prev) => ({ ...prev, quantity: true }));
      return;
    }
    if (!file[0]?.type.includes("image") && (!["heif", "heic"].includes(file[0]?.name.split(".")[file[0]?.name.split(".").length - 1]))) {
      setValidation((prev) => ({ ...prev, fileType: true }));
      event.target.value = "";
      return;
    }
    setValidation((prev) => ({
      ...prev, quantity: false, fileType: false, duplicated: false,
    }));
    setCompanyImage("");
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

  useEffect(() => {
    if (image) {
      setCompanyImage(image);
    }
  }, [image]);

  return (
    <div className={classes.container}>
      {isFileConverting
        ? <Loader styles={{
          position: "absolute", top: 50, left: "calc(50% - 15px)", width: 30, height: 30,
        }} />
        : <div
          // onClick={companyImage ? () => {} : openFileDialog}
          className={classes.headingDropZoneWrapper}
        >
          <Typography variant="subtitle1" classes={{ subtitle1: classes.fieldTitle }}>Team Logo</Typography>
          {
            !companyImage
              ? <div onClick={companyImage ? () => {} : openFileDialog} className={classes.dashedContainer}>
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
                    setFieldsState((prev) => ({ ...prev, file: null }));
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
        </div>}
    </div>
  );
};

export default DropZone;
