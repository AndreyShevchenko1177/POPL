import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";
import moment from "moment";
import LinkIcon from "../popup/components/LinkIcon";
import ListEventPopup from "../popup/ListEventPopup";
import useStyles from "../popup/styles";

const EventListItem = function ({ event = {}, onModalHandler }) {
  const classes = useStyles();

  return <>
    <div className={classes.EventListItemWrapper}>
      <div className={classes.EventListItemTitle}>
        {event?.event?.values?.title || "No title"}
      </div>

      <div>
        {event?.event?.values?.link?.id
          && <div className={classes.linkTestLinkBtnWrapper}>
            <LinkIcon
              eventPopupMode={true}
              editLink={() => {}}
              deleteLink={() => {}}
              icon={event?.event?.values?.link?.src}
              id={event?.event?.values?.link?.id}
              title={event?.event?.values?.link?.title}
            />
          </div>}
      </div>

      <div>
        <div>
          {`${moment(event?.event?.selectedDate?.from?.dayTime).format("dddd, MMMM D, YYYY")}`}
        </div>
        <div>
          {event?.event?.values?.isAllDay
            ? "All day"
            : `${moment(event?.event?.selectedDate?.from?.dayTime).format("LT")} - ${moment(event?.event?.selectedDate?.to?.dayTime).format("LT")}`}
        </div>
      </div>

      <div>
        {`${event?.event?.recipients?.recipients.length} account${event?.event?.recipients?.recipients.length === 1 ? " linked" : "s linked"}`}
      </div>

      <div>
        <ListEventPopup onModalHandler={onModalHandler} event={event}>
          <div className={classes.hoverPointer}>
            <MoreVertOutlinedIcon fontSize='medium' />
          </div>
        </ListEventPopup>
      </div>

    </div>
  </>;
};

export default EventListItem;
