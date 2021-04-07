import React from "react";
import {
  Table, TableBody, TableRow, TableCell,
} from "@material-ui/core";
import Loader from "../../../../components/Loader";
import useStyles from "./styles";

function TopList({ data }) {
  const classes = useStyles();

  return (
    <>
      {data
        ? <div>
          <Table>
            <TableBody>
              {data.map((item, key) => (
                <TableRow classes={{ root: classes.tableRow }} key={key}>
                  <TableCell classes={{ root: classes.tableCell }}>{item.name}</TableCell>
                  <TableCell align='right' classes={{ root: classes.tableCell }}>{item.data?.views}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        : <Loader containerStyles={{
          width: "40px", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
        }} />
      }
    </>
  );
}

export default TopList;
