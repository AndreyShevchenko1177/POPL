import { makeStyles } from "@material-ui/core";
import SvgMaker from "../svgMaker";

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
    boxShadow: "0px 0px 8px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)",
  };
  return (
    <div
      className={classes.container}
      style={{ ...styles.container, width: styles.image.width, height: styles.image.height }}
    >
      {
        typeof src !== "object"
          ? <img
            className="cursor-default target-element"
            src={src}
            alt={name}
            style={imageStyles}
          />
          : <div style={imageStyles}>
            {/* bgColor is company image color. when it's absent, we showing user icon */}
            {!bgColor && <SvgMaker name={src.name} fill={src.fill} width={src.width} height={src.height} />}
          </div>
      }
      {bgColor && <div style={backgroundStyles}></div>}
    </div>
  );
}
