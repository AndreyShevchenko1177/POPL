import clsx from "clsx";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
import useStyles from "../styles";
import icons from "../../../../profiles/components/profilelsIcons/icons";
import { isSafari } from "../../../../../constants";

function LinkIcon({
  icon, id, title, editLink, deleteLink, eventPopupMode = false,
}) {
  const classes = useStyles();

  // handleClickEditIcon(title, value, id, clicks, icons[id], name, hash, icon)

  return (
    <div className={clsx(classes.linkClicksWrapper, { [classes.safariLinks]: isSafari })}>
      {!eventPopupMode && <div className={clsx(classes.linksEditWrapper, classes.linksBtnWrapper)} onClick={editLink}>
        <EditIcon style={{ width: 15, height: 15 }} />
      </div>}
      {!eventPopupMode && <div className={clsx(classes.linksDeleteWrapper, classes.linksBtnWrapper)} onClick={deleteLink}>
        <CloseIcon style={{ width: 15, height: 15 }} />
      </div>}
      <div
        // onClick={(event) => handleClick(event, () => linkRedirect(id === 22 ? icons[id].path + profileId : icons[id].path + value, id, value))}
        className={clsx(classes.iconItem, (eventPopupMode ? classes.iconItemEventPopupMode : ""))}
      >
        <img
          className={classes.linkIcon}
          src={icon || icons[id]?.icon}
          alt={title}
        />
      </div>
      {/* <span className={classes.clicksText}>{`${clicks}`}</span> */}
    </div>
  );
}

export default LinkIcon;
