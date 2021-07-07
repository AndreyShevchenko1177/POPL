import {
  Button, TextField, Typography, SvgIcon,
} from "@material-ui/core";
import React, {
  useEffect, useState, useRef, useCallback, memo,
} from "react";
import clsx from "clsx";
import { useLocation, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import ImageIcon from "@material-ui/icons/Image";
import NotificationModal from "../notifications/components/NotificationModal";
import PreviewEmail from "../notifications/components/PreviewEmail";
import useStyles from "./styles/styles";
import Header from "../../components/Header";
import fileIcon from "../../assets/file.png";
import { getId } from "../../utils";

const Chip = memo(({ onRemove, id, iconStyle }) => (
  <div className={iconStyle} data-customid={id} onClick={onRemove} >
    <HighlightOffIcon />
  </div>
));

const FilePreview = memo(({ files, style, onRemove }) => (
  <div className={style.filePreviewContainer}>

    {
      Object.keys(files).map((key) => (
        <div key={key} style={{ position: "relative" }}>
          <img alt='logo' src={files[key].file.type.split("/")[0] === "image" ? files[key].src : fileIcon} />
          <Chip
            iconStyle={style.iconStyle}
            onRemove={onRemove}
            id={key}
          />
        </div>
      ))
    }
  </div>
));

function EmailNotifications() {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const fileRef = useRef(null);
  const imageRef = useRef(null);
  const messageAreaRef = useRef(null);
  const emails = location.state || [];
  const defaultValues = {
    title: "",
    message: "",
    recipients: [],
    sendAs: 2,
  };
  const [values, setValues] = useState({
    title: "",
    message: "",
    recipients: emails,
    sendAs: 2,
  });
  const [files, setFiles] = useState({});
  const [isShowModal, setIsShowModal] = useState(false);
  const userData = useSelector(({ profilesReducer }) => profilesReducer.dataProfiles.data);
  const companyInfo = useSelector(({ generalSettingsReducer }) => generalSettingsReducer.companyInfo.data);
  // const [isScrollBarVisible, setIsScrollBarVisible] = useState(false);

  const scrollbarVisible = (element) => element.scrollHeight > element.clientHeight;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
    // if (scrollbarVisible(event.target)) {
    //   return setIsScrollBarVisible(true);
    // }
    // setIsScrollBarVisible(false);
  };

  const removeResepient = useCallback((event) => {
    setValues({ ...values, recipients: values.recipients.filter(({ customId }) => customId != event.currentTarget.dataset.customid) });
  }, [values.recipients]);

  const closeModal = (isCancel) => {
    if (!isCancel) {
      setValues(defaultValues);
      setFiles({});
    }
    setIsShowModal(false);
  };

  const onFilesAdded = async (event) => {
    handleFilesObject(event.target.files);
  };

  const removeFile = useCallback((event) => {
    const { [event.currentTarget.dataset.customid]: removeFile, ...restFiles } = files;
    setFiles(restFiles);
  }, [files]);

  const readImage = (file, index) => {
    const reader = new FileReader();
    reader.addEventListener("load", (event) => {
      // setFiles((prev) => ({ ...prev, [getId(12)]: { file, src: event.target.result } }));
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

  useEffect(() => {
    history.replace({ ...history.location, state: values.recipients });
  }, [values.recipients]);

  useEffect(() => {
    if (messageAreaRef.current) {
      messageAreaRef.current.children[0].style = "padding-bottom: 35px";
    }
  }, []);

  return (
    <>
      <Header
        path="/connections"
        firstChild
        leftPadding="5px"
      />
      <div className={classes.root}>
        <div className={classes.rootFieldsWrapper}>
          <div className={classes.rootFields}>
            <div className={classes.fieldWrapper}>
              <Typography variant='subtitle1' classes={{ subtitle1: classes.formLabels }}>Subject *</Typography>
              <TextField
                placeholder={"Subject"}
                name="title"
                value={values.title}
                onChange={handleChange}
                fullWidth
                variant='outlined'
                size="small"
              />
            </div>
            <div className={classes.fieldWrapper}>
              <div className={clsx(classes.attachment)}>
                <input
                  ref={fileRef}
                  type='file'
                  onChange={onFilesAdded}
                />
                <input
                  ref={imageRef}
                  type='file'
                  accept="image/png, image/jpeg"
                  onChange={onFilesAdded}
                />
                <SvgIcon htmlColor="grey" onClick={() => fileRef.current?.click()}>
                  <AttachFileIcon/>
                </SvgIcon>
                <SvgIcon htmlColor="grey" onClick={() => imageRef.current?.click()}>
                  <ImageIcon/>
                </SvgIcon>
              </div>

              <Typography variant='subtitle1' classes={{ subtitle1: classes.formLabels }}>Message *</Typography>
              <TextField
                placeholder='Message'
                name="message"
                value={values.message}
                onChange={handleChange}
                multiline
                rows={8}
                fullWidth
                variant='outlined'
                size="small"
                ref={messageAreaRef}
              />
            </div>
            <div className={classes.fieldWrapper}>

              <Typography variant='subtitle1' classes={{ subtitle1: classes.formLabels }}>{emails.length > 1 ? "Recepients" : "Recepient"}{values.recipients.length ? `(${values.recipients.length})` : ""}</Typography>
              {/* <div className={classes.emailListRoot}> */}

              <div className={classes.emailListContainer}>
                {/* <div className={clsx(classes.emailRow, classes.emailHeader)}>
                  <Typography variant='h5'>Account name</Typography>
                  <Typography variant='h5'>Account email</Typography>
                </div> */}
                {values.recipients.map(({ email, name, customId }) => (
                  <div className={classes.emailRow} key={customId}>
                    <p variant='h6'>{name || "no name"}</p>
                    <p variant='h6'>{email}</p>
                    <Chip onRemove={removeResepient} id={customId} iconStyle={classes.deleteIcon}/>
                  </div>
                ))}
              </div>
              <div className={clsx(classes.borderWrapper, { [classes.fullBorderWidth]: values.recipients.length < 6 })}></div>
              {/* </div> */}
            </div>
            <div className={classes.fieldWrapper}>
              <div className={classes.confirmBtnWrapper}>
                <Button
                  className={classes.confirmBtn}
                  variant='contained'
                  color="primary"
                  onClick={() => setIsShowModal(true)}
                  disabled={!values.recipients.length || (!values.message && !Object.keys(files).length) || !values.title}
                >
                  Schedule/Send now
                </Button>
              </div>
            </div>
          </div>
        </div>
        <PreviewEmail message={values.message} title={values.title} fromText={((companyInfo || "") && companyInfo[0]) || "via Popl Enterprise"}>
          <FilePreview files={files} style={{ filePreviewContainer: classes.filePreview, iconStyle: classes.deleteFile }} onRemove={removeFile}/>
        </PreviewEmail>
        {isShowModal && <>
          <div className={classes.opacityBackground} onClick={() => setIsShowModal(false)}></div>
          <div className={classes.wizardContainer} tabIndex={1}>
            <NotificationModal closeModal={closeModal} data={values} file={Object.values(files)[0]?.file}/>
          </div>
        </>}
      </div>
    </>
  );
}

export default EmailNotifications;
