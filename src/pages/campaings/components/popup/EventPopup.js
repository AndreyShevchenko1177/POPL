import React from "react";
import Paper from "@material-ui/core/Paper";
import { IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import moment from "moment";
import useStyles from "./styles";
import LinkIcon from "./components/LinkIcon";
import ContactsEventPopup from "./ContactsEventPopup";

export default function EventPopup({
  data, closeModalEvent, onModalHandler, addEventHandler,
}) {
  const classes = useStyles();

  return (
    <>
      <div className={classes.opacityBackground} onClick={closeModalEvent}></div>
      <Paper elevation={5} className={classes.eventPopup}>
        <div>
          <div className={classes.closeButton} onClick={closeModalEvent}>
            <IconButton>
              <CloseIcon fontSize='small' />
            </IconButton>
          </div>
          <div className={classes.deleteButton} onClick={() => { closeModalEvent(); addEventHandler({ ...data?.event, currentDate: "DELETE_EVENT_BY_ID" }); }}>
            <IconButton>
              <DeleteForeverOutlinedIcon fontSize='small' />
            </IconButton>
          </div>
          <div className={classes.editButton} onClick={() => { closeModalEvent(); onModalHandler(data, true); }}>
            <IconButton>
              <EditOutlinedIcon fontSize='small' />
            </IconButton>
          </div>

          <div className={classes.wrapperTitleEventPopup}>
            <div className={classes.sqrEventPopup}></div>
            <div className={classes.titleEventPopup}>
              {data?.event?.values?.title}
            </div>
            <div className={classes.linkEventPopup}>

              {data?.event?.values?.link?.id
                && <div className={classes.linkTestLinkBtnWrapper}>
                  <LinkIcon
                    eventPopupMode={true}
                    editLink={() => {}}
                    deleteLink={() => {}}
                    icon={data?.event?.values?.link?.src}
                    id={data?.event?.values?.link?.id}
                    title={data?.event?.values?.link?.title}
                  />
                </div>}
            </div>
          </div>

          <div className={classes.restDataWrapperEventPopup}>
            <div className={classes.dateTimeWrapperEventPopup}>
              <div className={classes.dateEventPopup}>
                {`${moment(data?.event?.selectedDate?.from?.dayTime).format("dddd, MMMM D, YYYY")}`}
              </div>
              <div className={classes.roundEventPopup}></div>
              <div className={classes.timeEventPopup}>
                {data?.event?.values?.isAllDay
                  ? "All day"
                  : `${moment(data?.event?.selectedDate?.from?.dayTime).format("LT")} - ${moment(data?.event?.selectedDate?.to?.dayTime).format("LT")}`}
              </div>
            </div>

            <div>
              <div className={classes.repeatEventPopup}>
                {`Repeat: ${data?.event?.values?.repeatOption ?? "Do not repeat"}`}
              </div>
            </div>

            <div>
              <ContactsEventPopup recipientsArr={data?.event?.recipients?.recipients}>
                <div className={classes.accountsEventPopup}>
                  {`Accounts (${data?.event?.recipients?.recipients.length || 0})`}
                  <IconButton>
                    <ArrowDropDownIcon fontSize='small' />
                  </IconButton>
                </div>
              </ContactsEventPopup>

            </div>
          </div>
        </div>

      </Paper>

    </>
  );
}
