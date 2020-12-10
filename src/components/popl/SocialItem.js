import React from "react";
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  iconContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    padding: 8,
    borderRadius: "8px",
    boxShadow: "0 0 24px rgb(0 0 0 / 18%)",
    marginRight: 15,
  },
}));

const applications = [
  { src: "assets/img/fb.png", title: "Facebook" },
  { src: "assets/img/twiter.png", title: "Twitter" },
  { src: "assets/img/message.png", title: "Text" },
  { src: "assets/img/insta.png", title: "Instagram" },
  { src: "assets/img/sc.png", title: "Snapchat" },
  { src: "assets/img/venmo-icon 1.png", title: "Venmo" },
  { src: "assets/img/linked.png", title: "LinkedIn" },
];

export default function SocialItem(props) {
  const { application } = props;
  const classes = useStyles();
  const app = applications.find(
    (d) => d.title.toLowerCase() === application.toLowerCase()
  );
  const { src, title } = app;
  return (
    <>
      {app !== -1 && (
        <div className={classes.iconContainer}>
          <img src={src} alt={title} width="42px" height="42px" />
          <Typography variant="caption">{title}</Typography>
        </div>
      )}
    </>
  );
}
