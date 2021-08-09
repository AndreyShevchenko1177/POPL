/* eslint-disable import/no-webpack-loader-syntax */
import React, {
  useRef, useState, useEffect,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@material-ui/core";
import clsx from "clsx";
import worker from "workerize-loader!../../../../worker";
import { snackBarAction } from "../../../../store/actions";
import { isFileConvertingAction } from "../../store/actions";
import useStyles from "./styles";
import { getId } from "../../../../utils/uniqueId";
import SvgMaker from "../../../../components/svgMaker";
import { restrictEdit } from "../../../../utils";
import Loader from "../../../../components/Loader";

function OptionDialog({
  onDelete, onEdit, top = 40, right = 45, deleteBtnTItle = "Remove Image", editBtnTitle = "Edit Image",
}) {
  const classes = useStyles({ top, right });
  return (
    // added class dialog-popup in index.css
    <div className={clsx(classes.dialogContainer, "dialog-popup")}>
      <div className={classes.dialogOptions}>
        <div onClick={onDelete}>{deleteBtnTItle}</div>
        <div onClick={onEdit}>{editBtnTitle}</div>
      </div>
    </div>
  );
}

const DropZone = ({
  quantity, multiple, setFieldsState, image,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const logoFileInputRef = useRef(null);
  const [optionDialog, setOptionDialog] = useState({ logo: false, companyImage: false });
  const [files, setFiles] = useState({});
  const [logoFiles, setLogosFiles] = useState({});
  const { isFileConverting } = useSelector(({ generalSettingsReducer }) => generalSettingsReducer);

  const [validation, setValidation] = useState({
    quantity: false,
    fileType: false,
    duplicated: false,
  });
  const [companyImage, setCompanyImage] = useState("");
  const [companyLogo, setCompanyLogo] = useState("");
  const parentProfilefId = useSelector(({ authReducer }) => authReducer.signIn.data.id);

  const handleDeleteFile = (key) => {
    const result = { ...files };
    delete result[key];
    Object.keys(result).length > 0 ? setFiles(result) : setFiles({});
    setFieldsState((prev) => ({ ...prev, file: null }));
  };

  const readImage = (file, index, inputName) => {
    // Check if the file is an image with heic/heif extension.
    const fileName = file?.name.split(".")[file?.name.split(".").length - 1];
    console.log(fileName, file);
    if (["heif", "heic"].includes(fileName.toLowerCase())) {
      dispatch(isFileConvertingAction(true));
      let workerInstance = worker();
      setFieldsState((fs) => ({ ...fs, file }));
      return workerInstance.heicToJpg(file).then((convertedFile) => {
        const reader = new FileReader();
        reader.addEventListener("load", (event) => {
          if (inputName) setLogosFiles({ [getId(12)]: { file, src: event.target.result } });
          else {
            setFiles((prev) => ({ [getId(12)]: { file, src: event.target.result } }));
          }

          dispatch(isFileConvertingAction(false));
        });
        const blobFile = new Blob([convertedFile]);
        reader.readAsDataURL(blobFile);
      });
    }
    setFieldsState((fs) => ({ ...fs, file }));
    const reader = new FileReader();
    reader.addEventListener("load", (event) => {
      if (inputName) setLogosFiles({ [getId(12)]: { file, src: event.target.result } });
      else {
        setFiles((prev) => ({ [getId(12)]: { file, src: event.target.result } }));
      }
    });
    reader.readAsDataURL(file);
  };

  const handleFilesObject = (files, inputName) => {
    if (!files) return;
    const result = {};
    Object.values(files).forEach((file, i) => {
      result[i] = { file };
      readImage(file, i, inputName);
    });
  };

  const openFileDialog = (isLogo) => {
    if (restrictEdit(parentProfilefId)) {
      return dispatch(snackBarAction({
        message: "Can not edit demo account",
        severity: "error",
        duration: 6000,
        open: true,
      }));
    }
    setOptionDialog({ logo: false, companyImage: false });
    if (isLogo) {
      return logoFileInputRef.current?.click();
    }
    console.log("click");
    fileInputRef.current?.click();
  };

  const onFilesAdded = async (event) => {
    event.persist();
    const inputName = event.target.name;
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
    !inputName && setCompanyImage("");
    handleFilesObject(file, inputName);
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
  }, []);

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
          <Typography variant="subtitle1" classes={{ subtitle1: classes.fieldTitle }}>Company Images</Typography>
          <div className={classes.logoContainer} >
            {!companyLogo
              ? (!Object.keys(logoFiles).length
                ? (
                  <div className='relative' onClick={() => openFileDialog(true)}>
                    <div className={clsx(classes.IconTextWrapper, classes.logoWrapper)} >
                      <SvgMaker name="uploadCloud" fill="#999a9b" width={20} height={20} />
                    </div>
                    {/* <Typography variant='subtitle1' classes={{ subtitle1: classes.logoImageText }}>Logo</Typography> */}
                  </div>
                )
                : <>
                  <OptionDialog
                    deleteBtnTItle='Delete Logo'
                    editBtnTitle='Edit Logo'
                    top={10}
                    right={-140}
                    onDelete={() => {
                      setCompanyLogo("");
                      setLogosFiles({});
                      setOptionDialog({ ...optionDialog, logo: false });
                      //   setFieldsState((prev) => ({ ...prev, file: null }));
                    }}
                    onEdit={() => {
                      openFileDialog(true);
                      setOptionDialog({ logo: false, companyImage: false });
                    }}
                  />
                  {
                    Object.keys(logoFiles).map((key) => (
                      <div className='h-30' key={key} onClick={() => setOptionDialog({ ...optionDialog, logo: true })}>
                        <img alt='logo' className={classes.logoImage} src={logoFiles[key].src}/>
                        {/* <Preview openFileDialog={openFileDialog} file={logoFiles[key]} deleteAction={() => handleDeleteFile(key)} /> */}
                      </div>
                    ))
                  }
                </>)
              : <>
                <div onClick={() => setOptionDialog({ ...optionDialog, logo: true })}>
                  <OptionDialog
                    deleteBtnTItle='Delete Logo'
                    editBtnTitle='Edit Logo'
                    onDelete={() => {
                      setCompanyLogo("");
                      setOptionDialog({ ...optionDialog, logo: false });
                      //   setFieldsState((prev) => ({ ...prev, file: null }));
                    }}
                    onEdit={() => {
                      openFileDialog(true);
                      setOptionDialog({ logo: false, companyImage: false });
                    }}
                  />
                </div>

              </>

            }

          </div>
          {
            !companyImage
              ? <div
                onClick={Object.keys(files).length ? () => setOptionDialog({ ...optionDialog, companyImage: true }) : () => openFileDialog()}
                className={classes.dashedContainer}
              >
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
                          <OptionDialog
                            top={60}
                            onDelete={() => {
                              handleDeleteFile(key);
                              setOptionDialog({ logo: false, companyImage: false });
                            }}
                            onEdit={(event) => {
                              event.stopPropagation();
                              openFileDialog();
                              setOptionDialog({ logo: false, companyImage: false });
                            }}
                          />
                          <img alt='logo' className={classes.image} src={files[key].src} />
                        </div>
                      ))
                    }
                  </div>
                }
              </div>
              : <div className={clsx(classes.headingDropZoneWrapper, classes.companyImageWrapper, "relative")} onClick={(event) => {
                setOptionDialog({ ...optionDialog, companyImage: true });
              }
              }>
                <OptionDialog
                  top={40}
                  onDelete={() => {
                    setCompanyImage("");
                    setOptionDialog({ logo: false, companyImage: false });
                    setFieldsState((prev) => ({ ...prev, file: null }));
                  }}
                  onEdit={(event) => {
                    event.stopPropagation();
                    openFileDialog();
                    setOptionDialog({ logo: false, companyImage: false });
                  }}
                />
                <img className={classes.image} alt='avatar' src={`${process.env.REACT_APP_BASE_FIREBASE_LOGOS_URL}${image}?alt=media`} />
              </div>
          }
          <input
            ref={fileInputRef}
            type='file'
            multiple={!!multiple}
            onChange={onFilesAdded}
          />
          <input
            ref={logoFileInputRef}
            name='logo'
            type='file'
            multiple={!!multiple}
            onChange={onFilesAdded}
          />
        </div>}
    </div>
  );
};

export default DropZone;
