import React from "react";
import {
  Button,
  Grid,
  InputBase,
  Paper,
  Checkbox,
  Dialog,
  DialogContent,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Header from "./components/header";
import PoplCard from "./components/poplCard";
import PoplForm from "../add-edit-popl/PoplForm";
import useStyles from "./styles/styles";

export default function Popls() {
  const classes = useStyles();
  const [openForm, setFormOpen] = React.useState(false);

  function handleOpen() {
    setFormOpen(true);
  }
  function handleClose() {
    setFormOpen(false);
  }
  return (
    <>
      <div className={classes.toolbar}>
        <Header title="POPL" />
      </div>
      <Grid container alignItems="center">
        <Grid item xl={1} lg={1} md={1} sm={1} xs={1}>
          <div className={classes.checkbox}>
            <Checkbox
              // checked={checked}
              // onChange={handleChange}
              color="primary"
              inputProps={{ "aria-label": "primary checkbox" }}
            />
            <KeyboardArrowDownIcon style={{ color: "#7d7d7d" }} />
          </div>
        </Grid>
        <Grid
          item
          xl={9}
          lg={9}
          md={9}
          sm={9}
          xs={9}
          container
          justify="center"
        >
          {/* <TextField
            variant="outlined"
            fullWidth
            placeholder="Search Here..."
          /> */}
          <Paper component="form" fullWidth className={classes.root}>
            <InputBase
              fullWidth
              className={classes.searchInput}
              placeholder="Search Here..."
              inputProps={{ "aria-label": "search here" }}
            />
            <SearchIcon />
          </Paper>
        </Grid>
        <Grid
          item
          xl={2}
          lg={2}
          md={2}
          sm={2}
          xs={2}
          container
          justify="flex-end"
        >
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<AddCircleOutlineIcon />}
            onClick={handleOpen}
          >
            Add New Popl
          </Button>
        </Grid>

        <PoplCard
          heading={"Popl 1"}
          src={"./assets/img/user1.png"}
          name={"user1"}
          types={[
            "Facebook",
            "Twitter",
            "Instagram",
            "LinkedIn",
            "Text",
            "Venmo",
            "Snapchat",
            "Facebook",
            "Twitter",
          ]}
        />
        <PoplCard
          heading={"Popl 2"}
          src={"./assets/img/user1.png"}
          name={"user2"}
          types={[
            "Facebook",
            "Twitter",
            "Instagram",
            "LinkedIn",
            "Text",
            "Venmo",
            "Snapchat",
            "Facebook",
            "Twitter",
          ]}
        />
        <PoplCard
          heading={"Popl 3"}
          src={"./assets/img/user1.png"}
          name={"user3"}
          types={[
            "Facebook",
            "Twitter",
            "Instagram",
            "LinkedIn",
            "Text",
            "Venmo",
            "Snapchat",
            "Facebook",
            "Twitter",
          ]}
        />
      </Grid>

      <Dialog open={openForm} onClose={handleClose} maxWidth="md">
        <DialogContent>
          <PoplForm handleClose={handleClose} />
        </DialogContent>
      </Dialog>
    </>
  );
}
