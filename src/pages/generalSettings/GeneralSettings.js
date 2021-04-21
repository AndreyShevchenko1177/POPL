import { Button } from "@material-ui/core";
import { useState } from "react";
import Header from "../../components/Header";
import SettingsField from "./components/SettingsField";
import UpladImage from "./components/uploadImage";
import useStyles from "./styles";

function GeneralSettings() {
  const classes = useStyles();
  const [fieldsState, setFieldsState] = useState({
    name: "",
    websiteLink: "",
    color: "",
  });

  console.log(fieldsState);

  const handleChangeField = (event) => {
    event.persist();
    const { name, value } = event.target;
    setFieldsState({ ...fieldsState, [name]: value });
  };

  return (
    <>
      <Header
        rootLink="Settings"
        lastChild="General Settings"
        path="/settings"
      />
      <div className={classes.container}>
        <SettingsField
          title="Name"
          name="name"
          placeholder="Enter you name"
          value={fieldsState.name}
          handleChange={handleChangeField}
        />
        <SettingsField
          title="Websit URL"
          name="websiteLink"
          placeholder="Enter you website URL"
          value={fieldsState.websiteLink}
          handleChange={handleChangeField}
        />
        <SettingsField
          title="Primary Color"
          setFieldsState={setFieldsState}
          name="color"
          type="color"
          value={fieldsState.color}
          handleChange={handleChangeField}
        />
        <UpladImage />
        <div className={classes.buttonContainer}>
          <Button
            variant='contained'
            color='primary'
          >
            Save
          </Button>
        </div>
      </div>
    </>
  );
}

export default GeneralSettings;
