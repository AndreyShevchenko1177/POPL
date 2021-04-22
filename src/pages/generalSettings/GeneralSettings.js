import { Button } from "@material-ui/core";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Header from "../../components/Header";
import SettingsField from "./components/SettingsField";
import TeamMembers from "./components/TeamMembers";
import { updateUserProfile } from "./store/actions";
import UpladImage from "./components/uploadImage";
import useStyles from "./styles";

function GeneralSettings() {
  const classes = useStyles();
  const [fieldsState, setFieldsState] = useState({
    name: "",
    websiteLink: "",
    color: "",
  });
  const dispatch = useDispatch();

  console.log(fieldsState);

  const handleChangeField = (event) => {
    event.persist();
    const { name, value } = event.target;
    setFieldsState({ ...fieldsState, [name]: value });
  };

  const handleSave = () => dispatch(updateUserProfile(fieldsState));

  return (
    <>
      <Header
        rootLink="Settings"
        lastChild="General Settings"
        path="/settings"
      />
      <div className={classes.container}>
        <UpladImage />
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
      </div>
    </>
  );
}

export default GeneralSettings;
