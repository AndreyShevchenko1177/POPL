import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import SettingsField from "./components/SettingsField";
import TeamMembers from "./components/TeamMembers";
import { updateUserProfile, getCompanyInfoAction, deleteProfileAction } from "./store/actions";
import Loader from "../../components/Loader";
import UpladImage from "./components/uploadImage";
import useStyles from "./styles";
import ConfirmModal from "../../components/ConfirmModal";
import { restrictEdit } from "../../utils";
import { snackBarAction } from "../../store/actions";

function GeneralSettings() {
  const classes = useStyles();
  const [fieldsState, setFieldsState] = useState({
    name: "",
    color: "",
    websiteLink: "",
    file: null,
  });
  const dispatch = useDispatch();
  const companyInfo = useSelector(({ generalSettingsReducer }) => generalSettingsReducer.companyInfo.data);
  const parentProfilefId = useSelector(({ authReducer }) => authReducer.signIn.data.id);
  const { isFetching } = useSelector(({ generalSettingsReducer }) => generalSettingsReducer);
  const [conFirmModal, setConfirmModal] = useState({ open: false, data: null });

  const handleChangeField = (event) => {
    event.persist();
    if (restrictEdit(parentProfilefId)) {
      return dispatch(snackBarAction({
        message: "Can not edit demo account",
        severity: "error",
        duration: 6000,
        open: true,
      }));
    }
    const { name, value } = event.target;
    setFieldsState({ ...fieldsState, [name]: value });
  };

  const handleSave = () => dispatch(updateUserProfile(fieldsState));

  const onConfirmModal = (id) => {
    setConfirmModal({ open: !conFirmModal.open, data: id });
  };

  const onOk = () => {
    dispatch(deleteProfileAction(conFirmModal.data));
    setConfirmModal({ open: !conFirmModal.open, data: null });
  };

  const onCancel = () => {
    setConfirmModal({ open: !conFirmModal.open, data: null });
  };

  useEffect(() => {
    dispatch(getCompanyInfoAction());
  }, []);

  useEffect(() => {
    if (companyInfo) {
      let result = {};
      Object.keys(fieldsState).forEach((key, i) => {
        result[key] = companyInfo[i];
      });
      setFieldsState(result);
    }
  }, [companyInfo]);

  return (
    <>
      <Header
        rootLink="Settings"
        lastChild="General Settings"
        path="/settings"
      />
      <ConfirmModal
        open={conFirmModal.open}
        onClose={onConfirmModal}
        dialogTitle='Do you really want to delete this profile?'
        okButtonTitle='OK'
        cancelButtonTitle='Cancel'
        onOk={onOk}
        onCancel={onCancel}
      />
      {isFetching
        ? <Loader styles={{ position: "absolute", top: "calc(50% - 20px)", left: "calc(50% - 170px)" }}/>
        : <div className={classes.container}>
          <UpladImage image={companyInfo && companyInfo[3]} setFieldsState={setFieldsState} />
          <SettingsField
            title="Name"
            name="name"
            placeholder="Enter you name"
            value={fieldsState.name}
            handleChange={handleChangeField}
          />
          <SettingsField
            title="Website URL"
            name="websiteLink"
            placeholder="Enter you website URL"
            value={fieldsState.websiteLink}
            handleChange={handleChangeField}
          />
          <TeamMembers showConfirmModal={onConfirmModal}/>
          <SettingsField
            title="Primary Color"
            setFieldsState={setFieldsState}
            name="color"
            type="color"
            value={fieldsState.color}
            handleChange={handleChangeField}
          />
          <div className={classes.buttonContainer}>
            <Button
              variant='contained'
              color='primary'
              onClick={handleSave}
              style={{ width: 200 }}
            >
            Save
            </Button>
          </div>
        </div>}
    </>
  );
}

export default GeneralSettings;
