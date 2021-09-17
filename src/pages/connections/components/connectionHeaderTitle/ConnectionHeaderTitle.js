import { Checkbox } from "@material-ui/core";
import { useSelector } from "react-redux";
import SvgMaker from "../../../../components/svgMaker";
import useStyles from "./styles/connectionHeaderTitleStyle";

const ConnectionHeaderTitle = function () {
  const classes = useStyles();
  const companyInfo = useSelector(({ generalSettingsReducer }) => generalSettingsReducer.companyInfo.data);

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
            checked={true}
            onChange={() => {}}
          />
        </div>

        <div className={classes.titleUser}>
          <div>{"User"}</div>
          <SvgMaker fill={"#828282"} width={16} height={16} name={"arrowSortUp"} />
        </div>

        <div className={classes.titleEmpty}>
        </div>

        <div className={classes.titleNote}>
          <div>{"Note"}</div>
        </div>

        <div className={classes.titleConnectedWith}>
          <div>{"Connected with"}</div>
        </div>

        <div className={classes.tileDate}>
          <div>{"Date"}</div>
          <SvgMaker fill={"#828282"} width={16} height={16} name={"arrowSortUp"} />
        </div>

      </div>
    </div>
  </>;
};

export default ConnectionHeaderTitle;
