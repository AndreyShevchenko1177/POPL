import { useState } from "react";
import { useSelector } from "react-redux";
import { Paper, TextField, Typography } from "@material-ui/core";
import Header from "../../components/Header";
import useStyles from "./styles";
import UploadImage from "../../components/uploadImage";
import TemplateCard from "./components/TemplateCard";
import CustomWizard from "../../components/wizard";

function AddTemplate() {
  const classes = useStyles();
  const [values, setValues] = useState({
    tempName: "",
    personalImage: null,
    personalName: "",
    personalBio: "",
    businessImage: null,
    businessName: "",
    businessBio: "",
  });
  const [wizard, setWizard] = useState({ open: false, data: [] });
  const [parentProfile] = useSelector(({ profilesReducer }) => profilesReducer.dataProfiles.data);

  const handleChange = (event) => {
    event.persist();
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };

  const openWizard = () => {
    setWizard({ ...wizard, open: !wizard.open });
  };
  return (
    <>
      <Header
        rootLink="Templates"
        lastChild="Add Template"
        path="/templates"
      />
      {wizard.open && <CustomWizard disabled data={[parentProfile]} isOpen={wizard.open} setIsOpen={setWizard}/>}
      <div className={classes.container}>
        <Paper elevation={10} className={classes.tempNameInputWrapper}>
          <TextField
            variant="outlined"
            placeholder='Template Name'
            name={values.tempName}
            onChange={handleChange}
            size="small"
          />
        </Paper>
        <div className={classes.contentWrapper}>
          <TemplateCard
            cardTitle='Personal'
            setImage={(value) => setValues({ ...values, personalImage: value })}
            handleChange={handleChange}
            openWizard={openWizard}
            values={values}
          />
          <TemplateCard
            cardTitle='Business'
            setImage={(value) => setValues({ ...values, personalImage: value })}
            handleChange={handleChange}
            values={values}
            openWizard={openWizard}
          />
        </div>
      </div>
    </>
  );
}

export default AddTemplate;
