import { useState } from "react";
import { Paper, TextField, Typography } from "@material-ui/core";
import Header from "../../components/Header";
import useStyles from "./styles";
import UploadImage from "../../components/uploadImage";
import TemplateCard from "./components/TemplateCard";

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

  const handleChange = (event) => {
    event.persist();
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <>
      <Header
        rootLink="Templates"
        lastChild="Add Template"
        path="/templates"
      />
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
            values={values}
          />
          <TemplateCard
            cardTitle='Business'
            setImage={(value) => setValues({ ...values, personalImage: value })}
            handleChange={handleChange}
            values={values}
          />
        </div>
      </div>
    </>
  );
}

export default AddTemplate;
