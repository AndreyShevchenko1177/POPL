import { Paper } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import useStyles from "../styles";
import icons from "../../profiles/components/profilelsIcons/icons";

function LinksCard({ links, deleteAction }) {
  const classes = useStyles();

  return (
    <Paper className={classes.linksContainer}>
      {links.map(({
        value, title, id, customId,
      }) => (
        <div key={customId} className={classes.linkItemPadding}>
          <div className={classes.linksItemWrapper}>
            <CancelIcon className={classes.closeIcon} onClick={() => deleteAction(customId)} />
            <div
              className={classes.iconItem}
            >
              <img
                className={classes.linkImage}
                src={icons[id]?.icon} alt={title}
              />
            </div>
            <div className={classes.textContainer}>
              <p>{title}</p>
              <p>{value}</p>
            </div>
          </div>
        </div>
      ))}
    </Paper>
  );
}

export default LinksCard;
