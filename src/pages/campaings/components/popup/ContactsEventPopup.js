import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
// import Typography from "@material-ui/core/Typography";
// import Button from "@material-ui/core/Button";
import { useSelector } from "react-redux";
// import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import Avatar from "../../../../components/popl/Avatar";
import useStyles from "./styles";

export default function ContactsEventPopup({ children, recipientsArr = [] }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const generalSettingsData = useSelector(({ generalSettingsReducer }) => generalSettingsReducer.companyInfo.data);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <div onClick={handleClick}>
        {children}
        {/* <Button aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
                Open Popover
            </Button> */}
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        {recipientsArr.map(({ name, image, customId }) => (
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

          </div>
        ))}

      </Popover>
    </div >
  );
}
