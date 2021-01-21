import React from "react";
import { Button, Paper, Typography } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/MoreVert";
import EditIcon from "@material-ui/icons/Edit";
import Switch from "@material-ui/core/Switch";
import Checkbox from "@material-ui/core/Checkbox";
import { ArrowRight, DragIndicator } from "@material-ui/icons";
import { Link } from "react-router-dom";
import SocialItem from "../../../../components/popl/SocialItem";
import Avatar from "../../../../components/popl/Avatar";
import useStyles from "./styles/styles";

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
