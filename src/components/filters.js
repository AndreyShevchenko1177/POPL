import React from "react";
import { Button } from "@material-ui/core";
import useStyles from "./searchStripe/styles/styles";

const mockConfig = [{ name: "all", label: "Show all" }];

function Filters({
  config = mockConfig, setFilters, disabled, isFetching, showAll = true,
}) {
  const classes = useStyles();
  return (
    <>
      {showAll && config.map(({ name, label }, key) => (

        <div key={key} className={classes.showAllButton} >
          <Button
            fullWidth
            disabled={isFetching || disabled}
            variant="contained"
            color="primary"
            style={{ height: "40px" }}
            onClick={(e) => setFilters(e, name)}
            name={name}
          >
            {label}
          </Button>
        </div>
      ))}
    </>
  );
}

export default Filters;
