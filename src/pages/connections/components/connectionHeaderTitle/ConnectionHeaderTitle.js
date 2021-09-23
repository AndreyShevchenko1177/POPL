import { Checkbox } from "@material-ui/core";
import { useSelector } from "react-redux";
import clsx from "clsx";
import SvgMaker from "../../../../components/svgMaker";
import useStyles from "./styles/connectionHeaderTitleStyle";

const ConnectionHeaderTitle = function ({
  handleSortDirection,
  sortDirection,
  sortParams: { sortField },
  handleSortParams,
  handleCheck,
  selectAllCheckbox,
}) {
  const classes = useStyles();
  const companyInfo = useSelector(({ generalSettingsReducer }) => generalSettingsReducer.companyInfo.data);

  // console.log(sortField);

  return <>

    <div className={classes.connectionHeaderWrapper}>
      <div
        style={{
          backgroundColor: companyInfo && companyInfo[1] ? `${companyInfo[1]}0f` : "#ffffff",
        }}
        className={classes.connectionHeaderContent}
      >

        <div >
          <Checkbox
            color="secondary"
            inputProps={{ "aria-label": "primary checkbox" }}
            style={{ width: "40px", height: "40px" }}
            name={"name"}
            checked={selectAllCheckbox}
            onChange={handleCheck}
          />
        </div>

        <div className={ clsx(classes.titleUser, { [classes.transparentSvg]: (!sortDirection || sortField !== "name") })}
          onClick={() => {
            handleSortDirection();
            handleSortParams({ sortField: "name" });
          }}
        >
          <div>{"User"}</div>
          <SvgMaker fill={"#828282"} width={16} height={16} name={sortDirection === (-1) ? "arrowSortDown" : "arrowSortUp"} />
        </div>

        <div className={classes.titleEmpty}>
        </div>

        <div className={classes.titleNote}>
          <div>{"Note"}</div>
        </div>

        <div className={clsx(classes.titleConnectedWith, { [classes.transparentSvg]: (!sortDirection || sortField !== "connectedWith") })}
          onClick={() => {
            handleSortDirection();
            handleSortParams({ sortField: "connectedWith" });
          }}
        >
          <div>{"Connected with"}</div>
          <SvgMaker fill={"#828282"} width={16} height={16} name={sortDirection === (-1) ? "arrowSortDown" : "arrowSortUp"} />
        </div>

        <div className={clsx(classes.tileDate, { [classes.transparentSvg]: (!sortDirection || sortField !== "sortDate") })}
          onClick={() => {
            handleSortDirection();
            handleSortParams({ sortField: "sortDate" });
          }}
        >
          <div>{"Date"}</div>
          <SvgMaker fill={"#828282"} width={16} height={16} name={sortDirection === (-1) ? "arrowSortDown" : "arrowSortUp"} />
        </div>

      </div>
    </div>
  </>;
};

export default ConnectionHeaderTitle;
