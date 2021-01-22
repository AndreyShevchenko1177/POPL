import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  root: {
    display: "flex",
    padding: "30px 20px 30px 40px",
    borderRadius: 10,
    width: "100%",
  },
  container: {
    display: "flex",
    marginTop: 50,
    width: "100%",
  },
  section1: {
    display: "flex",
    flexDirection: "column",
    paddingRight: "10px",
  },
  section1_title: {
    paddingBottom: "20px",
  },
  section1_avatar: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  wrapper: {
    width: "100%",
  },
  section2: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    paddingBottom: "15px",
  },
  section2_icon: {
    backgroundColor: "#f1f4f6",
    marginRight: "5px",
    padding: "6px",
  },
  section3: {
    paddingBottom: "35px",
  },
  section3_text: {
    color: "#666666",
    fontSize: 14,
  },
  section4: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    paddingBottom: "35px",
  },
  section5: {
    display: "flex",
    justifyContent: "flex-end",
    fontWeight: "700",
    color: "#4f4f4f",
  },
}));
