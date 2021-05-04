import Header from "../../components/Header";
import useStyles from "./styles/styles";

function MyTemplates() {
  const classes = useStyles();
  return (
    <>
      <Header
        rootLink="Templates"
        path='/templates'
        lastChild="My Templates"
      />
      <div className={classes.container}>
        <h2 style={{ padding: "40px 40px" }}>Coming Soon</h2>
      </div>
    </>
  );
}

export default MyTemplates;
