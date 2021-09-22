import userIcon from "../../../../assets/images/popl_white.png";
import useStyles from "./styles/styles";
import { formatDateConnections } from "../../../../utils/dates";

const ConnectedWithField = function ({ names }) {
  const classes = useStyles();

  if (!names || !Object.values(names).length) return <></>;

  let leftover = 0;
  let newNames = Object.values(names)?.sort((a, b) => new Date(formatDateConnections(b.connected)) - new Date(formatDateConnections(a.connected)));
  if (newNames.length > 6) {
    leftover = newNames.length - 5;
    newNames = newNames.slice(0, 5);
  }

  return <>
    <div className={classes.ConnectedWithField}>

      {newNames.map((el, key) => (
        <div key={key}>
          <img alt='userIcon' className={classes.nameItemImage} src={el.image ? process.env.REACT_APP_BASE_IMAGE_URL + el.image : userIcon} style={el.image ? { objectFit: "cover" } : {}} />
        </div>
      ))}
      {!!leftover && <div className={classes.leftover}>{`+${leftover}`}</div>}
    </div>
  </>;
};

export default ConnectedWithField;
