import React from "react";
import { Button, makeStyles, Paper, Typography } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/MoreVert";
import EditIcon from "@material-ui/icons/Edit";
import Switch from "@material-ui/core/Switch";
import Checkbox from "@material-ui/core/Checkbox";
import { ArrowRight, DragIndicator } from "@material-ui/icons";
import { Link } from "react-router-dom";
import SocialItem from "./SocialItem";
import Avatar from "./Avatar";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "10px 20px 30px 40px",
    borderRadius: 10,
    width: "100%",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 50,
    width: "100%",
  },
  head: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  itemBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "20px 15px",
  },
  headItem: {
    margin: 0,
    display: "flex",
    alignItems: "center",
    padding: 4,
  },
  applicationList: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  applicationBtnContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  applicationBtn: {
    margin: "0px 6px",
  },
  directOfBbtn: {
    border: "2px solid black",
    borderRadius: 6,
    padding: "4px 20px",
    fontSize: 13,
    fontWeight: 600,
    textTransform: "uppercase",
    margin: "0 18px",
    width: "120px",
  },
  footer: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    marginTop: 20,
  },
  description: {
    display: "flex",
    margin: "0px 0 15px",
  },
  para: {
    color: "#656565",
    fontSize: 14,
    width: "70%",
    margin: "0px 8px",
  },
  dragIcon: {
    color: "#d8dbe0",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    position: "relative",
    top: "-22px",
    transform: "translateX(-50%)rotate(90deg)",
  },
  viewMoreLink: {
    textAlign: "right",
    display: "flex",
    alignItems: "center",
  },
}));

export default function Card({ heading, types, src, name }) {
  const classes = useStyles();
  const [directOn, setDirectOn] = React.useState(false);
  return (
    <div className={classes.container}>
      <Paper elevation={5} className={classes.root}>
        <div className={classes.head}>
          <div className={classes.itemBox}>
            <div className={classes.headItem}>
              <Typography variant="h5">{heading}</Typography>
            </div>
            <div className={classes.headItem}>
              <Button
                variant={directOn ? "contained" : "outlined"}
                color="primary"
                className={classes.directOfBbtn}
                onClick={() => setDirectOn(!directOn)}
              >
                {directOn ? "DIRECT ON" : "DIRECT OFF"}
              </Button>
            </div>
          </div>
          <div className={classes.itemBox}>
            <div className={classes.dragIcon}>
              <DragIndicator style={{ fontSize: 36 }} />
            </div>
          </div>
          <div className={classes.itemBox}>
            <div className={classes.headItem}>
              <EditIcon />
            </div>
            <div className={classes.headItem}>
              <Switch
                // checked={state.checkedB}
                // onChange={handleChange}
                color="primary"
                name="switch"
                inputProps={{ "aria-label": "checkbox" }}
              />
            </div>
            <div className={classes.headItem}>
              <MenuIcon />
            </div>
          </div>
        </div>
        <div className={classes.description}>
          <Checkbox
            // checked={checked}
            // onChange={handleChange}
            color="primary"
            inputProps={{ "aria-label": "primary checkbox" }}
          />
          <Avatar src={src} name={name} />
          <div className={classes.para}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut dictum
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut dictum
          </div>
        </div>
        <div className={classes.applicationBtnContainer}>
          {types.map((item) => (
            <div className={classes.applicationBtn}>
              <SocialItem application={item} />
            </div>
          ))}
        </div>
        <div className={classes.footer}>
          <div>
            <Link to={"#1"} className={classes.viewMoreLink}>
              View More <ArrowRight />
            </Link>
          </div>
        </div>
      </Paper>
    </div>
  );
}
