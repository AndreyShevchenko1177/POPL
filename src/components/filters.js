import React from "react";
import { Checkbox } from "@material-ui/core";

const mockConfig = [{ name: "all", label: "Show all" }];

function Filters({
  config = mockConfig, fitlersCheck, setFilters, disabled, isFetching,
}) {
  return (
    <>
      {!disabled && config.map(({ name, label }, key) => (
        <div key={key}>
          <Checkbox
            disabled={isFetching}
            color="primary"
            inputProps={{ "aria-label": "primary checkbox" }}
            style={{ width: "40px", height: "40px" }}
            onClick={(e) => setFilters(e, name)}
            name={name}
            checked={!!fitlersCheck[name]}
          />
          <span>{label}</span>
        </div>
      ))}
    </>
  );
}

export default Filters;
