import { useState } from "react";
import { useSelector } from "react-redux";
import {
  Button, Paper, TextField, Typography,
} from "@material-ui/core";
import Header from "../../components/Header";
import useStyles from "./styles";
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
    personalLinks: [],
    businessLinks: [],
  });
  const [wizard, setWizard] = useState({ open: false, data: [], card: "personal" });
  // const [parentProfile] = useSelector(({ profilesReducer }) => profilesReducer?.dataProfiles?.data);

  const handleChange = (event) => {
    event.persist();
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };

  const openWizard = (card) => {
    setWizard({ ...wizard, open: !wizard.open, card });
  };

  console.log(values.personalLinks);
  return (
    <>
      <Header
        rootLink="Templates"
        lastChild="Add Template"
        path="/templates"
      />
      {wizard.open && <CustomWizard
        disabled data={[]}
        isOpen={wizard.open}
        setIsOpen={setWizard}
        action={(link) => setValues((prev) => ({ ...prev, [`${wizard.card}Links`]: [...prev[`${wizard.card}Links`], link] }))}
      />}
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
            links={values.personalLinks}
            setValues={setValues}
          />
          <TemplateCard
            cardTitle='Business'
            setImage={(value) => setValues({ ...values, personalImage: value })}
            handleChange={handleChange}
            values={values}
            openWizard={openWizard}
            links={values.businessLinks}
            setValues={setValues}
          />
        </div>
        <Button
          variant='contained'
          color='primary'
        >
          Save Template
        </Button>
      </div>
    </>
  );
}

export default AddTemplate;