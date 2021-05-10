import {
  Button, Paper, TextField, Typography,
} from "@material-ui/core";
import UploadImage from "../../../components/uploadImage";
import useStyles from "../styles";
import LinksCard from "./LinksCard";

function TemplateCard({
  cardTitle, setImage, handleChange, values, openWizard, links, setValues,
}) {
  const classes = useStyles();

  return (
    <Paper elevation={10} className={classes.contentSideContainer}>
      <Typography>{cardTitle}</Typography>
      <div className={classes.itemWrapper}>
        <Typography variant="subtitle1" classes={{ subtitle1: classes.fieldTitle }}>Profile Image</Typography>
        <UploadImage setFieldsState={(value) => setImage(value)} />
      </div>
      <div className={classes.itemWrapper}>
        <Typography variant="subtitle1" classes={{ subtitle1: classes.fieldTitle }}>Name</Typography>
        <TextField
          variant="outlined"
          placeholder='Enter your Name'
          name={`${cardTitle.toLowerCase()}Name`}
          value={values[`${cardTitle.toLowerCase()}Name`]}
          onChange={handleChange}
          size="small"
        />
      </div>
      <div className={classes.itemWrapper}>
        <Typography variant="subtitle1" classes={{ subtitle1: classes.fieldTitle }}>Bio</Typography>
        <TextField
          variant="outlined"
          placeholder='Enter your Bio'
          name={`${cardTitle.toLowerCase()}Bio`}
          value={values[`${cardTitle.toLowerCase()}Bio`]}
          onChange={handleChange}
          size="small"
        />
      </div>
      <div className={classes.itemWrapper}>
        <Typography variant="subtitle1" classes={{ subtitle1: classes.fieldTitle }}>Add Links</Typography>
        <Button
          variant='contained'
          color='primary'
          onClick={() => openWizard(cardTitle.toLowerCase())}
        >
          Tap to add Link
        </Button>
      </div>
      {!!links.length && <LinksCard
        links={links}
        deleteAction={(id) => setValues((prev) => ({ ...prev, [`${cardTitle.toLowerCase()}Links`]: prev[`${cardTitle.toLowerCase()}Links`].filter((el) => el.customId !== id) }))}
      />}
    </Paper>
  );
}

export default TemplateCard;
