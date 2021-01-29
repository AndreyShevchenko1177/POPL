import React, { useRef } from "react";
import {
  Button,
  Grid,
  Paper,
  TextField,
  makeStyles,
  IconButton,
  OutlinedInput,
  InputAdornment,
  FormControl,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import fieldsConfig from "./fieldsConfig";

const useStyles = makeStyles((theme) => ({
  section: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
  },
  adornment: {
    borderRadius: 4,
  },

  saveBtn: { padding: "8px 16px", width: "150px" },
}));

export default function PoplForm(props) {
  const { handleClose } = props;
  const classes = useStyles();
  const imgRef = useRef(null);
  function handleSubmit(event) {
    event.preventDefault();
    handleClose && handleClose();
  }

  return (
    <>
      <Grid container spacing={2}>
        <form onSubmit={handleSubmit}>
          <Paper elevation={3} className={classes.section}>
            <Grid container spacing={2} justify="center">
              <Grid item xl={3} lg={3} md={3} sm={6} xs={6}>
                <Grid
                  item
                  xl={12}
                  lg={12}
                  md={12}
                  sm={12}
                  xs={12}
                  align="center"
                >
                  <img
                    src={"assets/img/user1.png"}
                    height="128px"
                    width="128px"
                    alt={"profile"}
                  />
                </Grid>
                <input type="file" hidden ref={imgRef} />
                <Grid
                  item
                  xl={12}
                  lg={12}
                  md={12}
                  sm={12}
                  xs={12}
                  align="center"
                >
                  <Button onClick={() => imgRef.current.click()}>
                    Change Photo
                  </Button>
                </Grid>
              </Grid>
              <Grid
                item
                container
                spacing={2}
                xl={6}
                lg={6}
                md={6}
                sm={12}
                xs={12}
              >
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Profile Name"
                  />
                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <TextField
                    fullWidth
                    label="Bio"
                    variant="outlined"
                    multiline
                    rows={3}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Paper>

          <Paper elevation={3} className={classes.section}>
            <Grid container spacing={2} justify="center">
              {fieldsConfig.map((el) => (
                <Grid
                  key={el.placeholder}
                  item
                  xl={6}
                  lg={6}
                  md={6}
                  sm={12}
                  xs={12}
                >
                  <OutlinedInput
                    fullWidth
                    variant="outlined"
                    placeholder={el.placeholder}
                    startAdornment={
                      <InputAdornment
                        position="start"
                        className={classes.adornment}
                      >
                        {el.component}
                      </InputAdornment>
                    }
                    endAdornment={
                      <IconButton>
                        <Close />
                      </IconButton>
                    }
                  />
                </Grid>
              ))}

              <Grid item xl={12} lg={12} md={12} sm={12} xs={12} align="center">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.saveBtn}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </form>
      </Grid>
    </>
  );
}
