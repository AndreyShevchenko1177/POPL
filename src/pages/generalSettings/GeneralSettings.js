import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import SettingsField from "./components/SettingsField";
import TeamMembers from "./components/TeamMembers";
import { updateUserProfile, getCompanyInfoAction } from "./store/actions";
import Loader from "../../components/Loader";
import UpladImage from "./components/uploadImage";
import useStyles from "./styles";

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
  const { isFetching } = useSelector(({ generalSettingsReducer }) => generalSettingsReducer);

  const handleChangeField = (event) => {
    event.persist();
    const { name, value } = event.target;
    setFieldsState({ ...fieldsState, [name]: value });
  };

  const handleSave = () => dispatch(updateUserProfile(fieldsState));

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
      {isFetching
        ? <Loader styles={{ position: "absolute", top: "calc(50% - 20px)", left: "calc(50% - 170px)" }}/>
        : <div className={classes.container}>
          <UpladImage setFieldsState={setFieldsState} />
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
          <TeamMembers />
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
            >
            Save
            </Button>
          </div>
        </div>}
    </>
  );
}

export default GeneralSettings;
