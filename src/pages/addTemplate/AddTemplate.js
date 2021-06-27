import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Button, Paper, TextField,
} from "@material-ui/core";
import Header from "../../components/Header";
import useStyles from "./styles";
import TemplateCard from "./components/TemplateCard";
import CustomWizard from "../../components/wizard";
import AssignTemplate from "./components/AssignTemplate";

function AddTemplate() {
  const classes = useStyles();
  const [values, setValues] = useState({
    name: "",
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
  const [isShowAssign, setIsShowAssign] = useState(false);
  const location = useLocation();

  const handleChange = (event) => {
    event.persist();
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };

  const openWizard = (card) => {
    setWizard({ ...wizard, open: !wizard.open, card });
  };

  useEffect(() => {
    if (location.state) {
      let result = {};
      Object.keys(values).forEach((key) => {
        if (key in location.state) return result[key] = location.state[key];
        result[key] = values[key];
      });
      setValues(result);
    }
  }, [location]);

  return (
    <>
      <Header
        firstChild
        path={location.pathname === location.state.path ? location.state.rootPath : location.state.path}
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
            name='name'
            value={values.name}
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
        <Button
          className={classes.assignButton}
          variant='contained'
          color='primary'
          onClick={() => setIsShowAssign(true)}
        >
          Assign Template
        </Button>
        <AssignTemplate isShow={isShowAssign} handleClose={() => setIsShowAssign(false)} />
      </div>
    </>
  );
}

export default AddTemplate;
