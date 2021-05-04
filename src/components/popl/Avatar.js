import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "relative",
  },
}));

export default function Avatar({
  src, name, styles, bgColor,
}) {
  const classes = useStyles();

  const imageStyles = {
    ...styles.image,
    position: bgColor ? "absolute" : "static",
    top: 0,
    left: 0,
    zIndex: 2,
  };

  const backgroundStyles = {
    position: "absolute",
    width: styles.image.width,
    height: styles.image.height,
    borderRadius: "50%",
    backgroundColor: bgColor,
    top: 0,
    left: 0,
    zIndex: 1,
  };
  return (
    <div
      className={classes.container}
      style={{ ...styles.container, width: styles.image.width, height: styles.image.height }}
    >
      <img
        className="cursor-default target-element"
        src={src}
        alt={name}
        style={imageStyles}
      />
      <div style={backgroundStyles}></div>
    </div>
  );
}
