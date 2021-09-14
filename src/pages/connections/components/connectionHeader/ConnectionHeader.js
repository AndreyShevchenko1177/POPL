import { useSelector } from "react-redux";
import {
  Button, Input, InputAdornment, OutlinedInput,
} from "@material-ui/core";
import useStyles from "./styles/connectionHeaderStyles";
import SvgMaker from "../../../../components/svgMaker";

const ConnectionHeader = function () {
  const connectionsSidebar = useSelector(({ systemReducer }) => systemReducer.connectionsSidebar.data);
  const classes = useStyles();

  return <>
    <div className={classes.connectionHeaderWrapper}>
      <div className={classes.connectionHeaderGrid}>

        <div className={classes.connectionCounter}>
          {"Connections "}
          <span>{`(${connectionsSidebar})`}</span>
        </div>

        <Button
          variant="outlined"
          className={classes.buttonFilter}
          startIcon={<SvgMaker width={16} height={16} name={"connectionFilterIcon"} fill='#828282' />}
        >
          {"Filter"}
        </Button>

        <OutlinedInput
          fullWidth={true}
          className={classes.searchField}
          fullWidth={true}
          placeholder={"Search..."}
          startAdornment={
            <InputAdornment position="start">
              <SvgMaker width={16} height={16} name={"search"} fill='#828282' />
            </InputAdornment>
          }
        />

        <Button
          variant="outlined"
          className={classes.buttonExportCRM}
          endIcon={<SvgMaker width={16} height={16} name={"arrowDropDown"} fill='#FFFFFF' />}
        >
          {"Export to CRM"}
        </Button>

      </div>
    </div>
  </>;
};

export default ConnectionHeader;
