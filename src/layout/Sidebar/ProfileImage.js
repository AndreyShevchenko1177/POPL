import { makeStyles } from "@material-ui/core";
import userIcon from "../../assets/svg/user.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: "30px 10px",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: "50%",
  },
}));

function ProfileImage({ name, image }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img className={classes.image} alt='avatar' src={image || userIcon} />
      <p>{name}</p>
    </div>
  );
}

export default ProfileImage;
