import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    top: "63%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: "30px 10px",
    "@media (max-height:800px)": {
      padding: "15px 0",
      position: "static",
    },
  },
  wrapper: {
    width: "80%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: "50%",
  },
  name: {
    paddingLeft: 10,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontSize: 16,
    fontWeight: "bold",
  },
  circle: {
    width: 70,
    height: 70,
    borderRadius: "50%",
  },
}));

function ProfileImage({ name, image, color }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        {image && <img className={classes.image} alt='avatar' src={`${process.env.REACT_APP_BASE_FIREBASE_CUSTOM_ICON}${image}?alt=media`} />}
        {color && !image && <div className={classes.circle} style={{ backgroundColor: color }}></div>}
        <p className={classes.name}>{name}</p>
      </div>
    </div>
  );
}

export default ProfileImage;
