import { Paper, TextField, Typography } from "@material-ui/core";
import UploadImage from "../../../components/uploadImage";
import useStyles from "../styles";

function TemplateCard({
  cardTitle, setImage, handleChange, values,
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
          name={cardTitle.toLowerCase()}
          value={values[`${cardTitle.toLowerCase()}Name`]}
          onChange={handleChange}
          size="small"
        />
      </div>
      <div className={classes.itemWrapper}>
        <Typography variant="subtitle1" classes={{ subtitle1: classes.fieldTitle }}>Bio</Typography>
        <TextField
          variant="outlined"
          placeholder='Enter your Name'
          name={cardTitle.toLowerCase()}
          value={values[`${cardTitle.toLowerCase()}Name`]}
          onChange={handleChange}
          size="small"
        />
      </div>
      <div className={classes.itemWrapper}>
        <Typography variant="subtitle1" classes={{ subtitle1: classes.fieldTitle }}>Add Links</Typography>
        <div
          onClick={() => {}}
          style={{ border: "1px solid #bababa" }}
          className={classes.addLinkButton}
        >
          Tap to add Link
        </div>
      </div>
    </Paper>
  );
}

export default TemplateCard;
