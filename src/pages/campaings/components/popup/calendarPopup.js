import { useCallback, useEffect, useState } from "react";
import {
  Button, Paper, TextField, Checkbox, FormControlLabel, IconButton,
} from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import CloseIcon from "@material-ui/icons/Close";
import { useSelector } from "react-redux";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import useStyles from "./styles";
import accountIcon from "../../../../assets/sidebar/profiles.png";
import ProfilesList from "../../../notifications/components/Recipients/ProfilesPopUp";
import Avatar from "../../../../components/popl/Avatar";
import TimeSheduler from "../timeSheduler";
import CustomWizard from "../../../../components/wizard";
import EditLinkModal from "./components/editLink";
import RepeatSelect from "./components/RepeatSelect";
import { week } from "../../constants";
import LinkIcon from "./components/LinkIcon";
import { dateTransform, dateCalendarTrasform } from "../../helper";
import { normalizeDate } from "../../../../utils";
import icons from "../../../profiles/components/profilelsIcons/icons";

function CalendarPopup({
  closeModal, data, addEventHandler,
}) {
  const classes = useStyles();
  const [isShowProfilesList, setIsShowProfilesList] = useState(false);
  const profiles = useSelector(({ profilesReducer }) => profilesReducer.dataProfiles.data);
  const generalSettingsData = useSelector(({ generalSettingsReducer }) => generalSettingsReducer.companyInfo.data);
  const [recipients, setRecipients] = useState(data?.event?.recipients || { recipients: [] });
  const [values, setValues] = useState(data?.event?.values || {
    title: "",
    repeatOption: "Do not repeat",
    isAllDay: false,
    eventDate: data.date,
    link: null,
  });
  const [wizard, setWizard] = useState(data?.event?.wizard || {
    open: false,
    data: [],
  });
  const [isOpenEditLink, setIsOpenEditLink] = useState(false);
  const [selectedDate, handleDateChange] = useState(data?.event?.selectedDate || {
    from: {
      calendar: dateCalendarTrasform(data.date),
      dayTime: dateTransform(data.date),
    },
    to: {
      calendar: dateCalendarTrasform(data.date, undefined, -1),
      dayTime: dateTransform(data.date, undefined, -1),
    },
  });

  const testLink = () => {
    try {
      if (values.link.id === 37) {
        const url = window.URL.createObjectURL(
          new Blob([values.link.file]),
        );
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          `${values.link.file.name}`,
        );

        // Append to html link element page
        document.body.appendChild(link);

        // Start download
        link.click();

        // Clean up and remove the link
        link.parentNode.removeChild(link);
        return;
      }
      // if (linkId === 22) return downloadContacts(path, profileName);
      return window.open(icons[values.link.id].path + values.link.value);
    } catch (error) {
      console.log(error);
    }
  };

  const selectDay = useCallback((dayTimeDate, timeDirection) => {
    if (values.isAllDay) {
      if (timeDirection === "from") {
        if (new Date(dayTimeDate).getTime() > new Date(selectedDate.to.calendar).getTime()) {
          handleDateChange((prevDate) => ({
            ...selectedDate,
            from: {
              ...prevDate[timeDirection],
              calendar: selectedDate.to.calendar,
            },
          }));
        }
      } else {
        handleDateChange((prevDate) => ({
          ...selectedDate,
          [timeDirection]: {
            ...prevDate[timeDirection],
            calendar: dayTimeDate,
          },
        }));
      }
    } else {
      if (!timeDirection) {
        if (selectedDate.from.dayTime.getMinutes() % 15 !== 0) {
          return handleDateChange((prevDate) => ({
            from: {
              dayTime: new Date(`${selectedDate.from.dayTime.getMonth() + 1}/${new Date(selectedDate.from.dayTime).getDate()}/${selectedDate.from.dayTime.getFullYear()} ${selectedDate.from.dayTime.getHours()}:${30}`),
              calendar: `${new Date(dayTimeDate).getMonth() + 1}/${new Date(dayTimeDate).getDate()}/${new Date(dayTimeDate).getFullYear()} ${normalizeDate(new Date(selectedDate.from.dayTime).getHours())}:${30}`,
            },
            to: {
              dayTime: new Date(`${selectedDate.to.dayTime.getMonth() + 1}/${new Date(selectedDate.to.dayTime).getDate()}/${selectedDate.to.dayTime.getFullYear()} ${selectedDate.to.dayTime.getHours()}:${30}`),
              calendar: `${new Date(dayTimeDate).getMonth() + 1}/${new Date(dayTimeDate).getDate()}/${new Date(dayTimeDate).getFullYear()} ${normalizeDate(new Date(selectedDate.to.dayTime).getHours())}:${30}`,
            },
          }));
        }
        return handleDateChange((prevDate) => ({
          from: {
            dayTime: dateTransform(dayTimeDate, selectedDate.from.dayTime),
            calendar: dateCalendarTrasform(dayTimeDate, selectedDate.from.dayTime),
          },
          to: {
            dayTime: dateTransform(dayTimeDate, selectedDate.to.dayTime),
            calendar: dateCalendarTrasform(dayTimeDate, selectedDate.to.dayTime),
          },
        }));
      }
      if (timeDirection === "from" && (new Date(dayTimeDate).getTime() > new Date(selectedDate.to.dayTime).getTime())) {
        return handleDateChange((prevDate) => ({
          ...selectedDate,
          from: {
            dayTime: new Date(dayTimeDate),
            calendar: dayTimeDate,
          },
          to: {
            dayTime: new Date(dayTimeDate),
            calendar: dayTimeDate,
          },
        }));
      }
      handleDateChange((prevDate) => ({
        ...selectedDate,
        [timeDirection]: {
          ...prevDate[timeDirection],
          dayTime: new Date(dayTimeDate),
          calendar: dateCalendarTrasform(prevDate[timeDirection].calendar, dayTimeDate),
        },
      }));
    }
    // if (!dayTimeDate) {
    //   return handleDateChange((prevDate) => ({
    //     ...selectedDate,
    //     [timeDirection]: {
    //       ...prevDate[timeDirection],
    //       dayTime: new Date(data.date),
    //     },
    //   }));
    // }
  }, [selectedDate, values.isAllDay]);

  const handleChangeModalValues = (event) => {
    const { name, value, checked } = event.target;
    if (name === "allDay") return setValues((prev) => ({ ...prev, isAllDay: checked }));
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleDeleteRecipient = (id) => {
    setRecipients((prev) => ({ ...prev, recipients: prev.recipients.filter(({ customId }) => customId !== id) }));
  };

  useEffect(() => {
    if (profiles) setWizard((prev) => ({ ...prev, data: [profiles[0]] }));
  }, [profiles]);

  useEffect(() => {
    if (values.isAllDay) {
      handleDateChange({
        from: {
          calendar: dateCalendarTrasform(data.date),
          dayTime: dateTransform(data.date),
        },
        to: {
          calendar: dateCalendarTrasform(data.date, undefined, -1),
          dayTime: dateTransform(data.date, undefined, -1),
        },
      });
    }
  }, [values.isAllDay]);

  return (
    <>
      {wizard.open && <CustomWizard
        styles={{
          opacityBackground: {
            width: "100%", height: "100%", top: 0, left: 0,
          },
        }}
        data={wizard.data}
        setIsOpen={setWizard}
        campaingsAction={(link) => setValues((prev) => ({ ...prev, link }))}
      />}
      {isOpenEditLink && <EditLinkModal closeModal={() => setIsOpenEditLink(false)} data={values.link} action={setValues} />}
      <div className={classes.opacityBackground} onClick={closeModal}></div>

      <Paper elevation={0} className={classes.calendarModalRoot}>
        <div className={classes.closeButton} onClick={closeModal}>
          <IconButton>
            <CloseIcon fontSize='small' />
          </IconButton>
        </div>
        <TextField
          fullWidth
          name='title'
          value={values.title}
          onChange={handleChangeModalValues}
          placeholder="Add campaign title"
          InputProps={{ className: classes.titleInput }}
        // variant=''
        />

        <div className={classes.createAccountBtnWrapper}>
          <Button
            variant='contained'
            color='primary'
            disabled={!!values.link?.id}
            className={classes.createLinkBtn}
            onClick={() => setWizard((prev) => ({ ...prev, open: true }))}
          >
            Create Link
          </Button>
          {values.link?.id
            && <div className={classes.linkTestLinkBtnWrapper}>
              <LinkIcon
                editLink={() => setIsOpenEditLink(true)}
                deleteLink={() => setValues((prev) => ({ ...prev, link: null }))}
                icon={values.link.src}
                id={values.link.id}
                title={values.link.title}
              />
              <Button
                variant="text"
                size="small"
                color="primary"
                className={classes.testLinkBtn}
                onClick={testLink}
              >
                Test link
              </Button>
            </div>}
        </div>
        <div className={classes.timeWrapper}>
          <div className='flex'>
            <TimeSheduler
              selectedDate={selectedDate}
              handleDateChange={selectDay}
              date={data}
              isAllDay={values.isAllDay}
            />
          </div>
          <div className={classes.timeIcon}>
            <QueryBuilderIcon color='primary' />
          </div>
        </div>

        <div className={classes.repeatSelectRoot}>
          <FormControlLabel
            classes={{ label: classes.allDayLabel }}
            control={
              <Checkbox
                checked={values.isAllDay}
                onChange={handleChangeModalValues}
                name='allDay'
                color="primary"
                classes={{ root: classes.checkboxRoot }}
              />
            }
            label="All day"
          />
          <RepeatSelect date={data.date} value={values.repeatOption} setValue={(option) => setValues((prev) => ({ ...prev, repeatOption: option }))} />

        </div>

        <div className={classes.addAccountsWrapper}>
          <div className={classes.addAccountsBtnWrapper}>
            <Button
              variant='contained'
              color='primary'
              className={classes.createLinkBtn}
              onClick={() => setIsShowProfilesList(true)}
            >
              Add Accounts
            </Button>
            <img alt="icon" src={accountIcon} className={classes.accountIcon} />
            <div className={classes.accountsList}>
              {recipients.recipients.map(({ name, image, customId }) => (
                <div key={customId} className={classes.recipientItem}>
                  <Avatar
                    bgColor={(generalSettingsData && generalSettingsData[1] && !generalSettingsData[3]) && generalSettingsData[1]}
                    src={
                      image
                        ? `${process.env.REACT_APP_BASE_FIREBASE_PHOTOS_URL + image}?alt=media`
                        : generalSettingsData && generalSettingsData[3] && `${process.env.REACT_APP_BASE_FIREBASE_LOGOS_URL}${generalSettingsData[3]}?alt=media`
                    }
                    name={name}
                    styles={{
                      image: {
                        width: "30px", height: "30px", borderRadius: "50%", objectFit: "cover",
                      },
                      container: { marginRight: 10 },
                    }}
                  />
                  <p className={classes.recipientItemName} > {name}</p>
                  <div className={classes.recipientsDeleteIcon} onClick={() => handleDeleteRecipient(customId)} >
                    <HighlightOffIcon />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={classes.createAccountBtnWrapper}>
          <Button
            variant='contained'
            color='primary'
            className={classes.createLinkBtn}
            onClick={() => {
              console.log("closeModal");
              addEventHandler({
                values, selectedDate, wizard, recipients, eventId: data?.event?.eventId, currentDate: data.date,
              });
              closeModal();
            }}
          >
            {!data.event ? "Create campaign" : "Save campaign"}
          </Button>
          {!!data.event && <Button
            variant='contained'
            color='primary'
            className={classes.createLinkBtn}
            onClick={() => {
              data?.event?.deleteThisEvent();
              closeModal();
            }}
          >
            {"Delete campaign"}
          </Button>}
        </div>

      </Paper>
      {isShowProfilesList && <ProfilesList
        styles={{
          profilesListPopup: { boxShadow: "0px 5px 7px 18px rgba(128, 128, 128, 0.2)" },
        }}
        setIsShow={() => setIsShowProfilesList(false)}
        profiles={profiles}
        recipients={recipients.recipients}
        setRecepients={setRecipients}
      />}
    </>
  );
}

export default CalendarPopup;
