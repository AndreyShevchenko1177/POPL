import React, { useRef } from "react";
import { Button, Grid } from "@material-ui/core";
import useStyles from "./styles";
import TabNavigation from "./tabNavigation";
import NewProfileHeader from "./newProfileHeader";

export default function NewProfileForm() {
  const classes = useStyles();
  const imgRef = useRef(null);

  return (
    <>
      <Grid container spacing={2} className={classes.rootGrid}>
        <Grid item xs={12} className={classes.gridItem}>
          <NewProfileHeader />
        </Grid>
        <Grid item xs={12} className={classes.gridItem}>
          <TabNavigation />
        </Grid>
      </Grid>
    </>
  );
}

/* <Paper elevation={3} className={classes.section}>
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
          </Paper> */
