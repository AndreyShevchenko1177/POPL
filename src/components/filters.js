import React from "react";
import { Button } from "@material-ui/core";

const mockConfig = [{ name: "all", label: "Show all" }];

function Filters({
  config = mockConfig, setFilters, disabled, isFetching, showAll = true,
}) {
  return (
    <>
      {showAll && config.map(({ name, label }, key) => (

        <div key={key} style={{ minWidth: "100px", marginLeft: "30px" }}>
          <Button
            fullWidth
            disabled={isFetching || disabled}
            variant="contained"
            color="primary"
            style={{ height: "50px" }}
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
