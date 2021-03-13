import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Paper, TextField, Button } from "@material-ui/core";
import { editConnectionAction, addConnectionAction } from "../../store/actions";
import { snackBarAction } from "../../../../store/actions";
import useStyles from "./styles/style";

function PoplForm({ popl, setIsOpenForm, mid }) {
  const classes = useStyles();
  const [value, setValue] = useState({
    name: "",
    slug: "",
  });
  const dispatch = useDispatch();
  const [isAdd, setIsAdd] = useState(false);
  const addConnection = useSelector(({ connectionsReducer }) => connectionsReducer.addConnection);
  const editConnection = useSelector(({ connectionsReducer }) => connectionsReducer.editConnection);

  const handleChage = (event) => {
    event.persist();
    const { name, value } = event.target;
    setValue((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!isAdd) return dispatch(editConnectionAction({ id: popl.id, mid, ...value }));
    dispatch(addConnectionAction({ mid, ...value }));
  };

  useEffect(() => {
    if (popl) return setValue({ name: popl.name, slug: popl.url });
    setIsAdd(true);
  }, []);

  useEffect(() => {
    if (addConnection.data) {
      setIsOpenForm(false);
      dispatch(
        snackBarAction({
          message: "Connection added successfully",
          severity: "success",
          duration: 3000,
          open: true,
        }),
      );
    }
    if (addConnection.error) {
      dispatch(
        snackBarAction({
          message: addConnection.error,
          severity: "error",
          duration: 3000,
          open: true,
        }),
      );
    }
  }, [addConnection]);

  useEffect(() => {
    if (editConnection.data) {
      setIsOpenForm(false);
      dispatch(
        snackBarAction({
          message: "Connection edited successfully",
          severity: "success",
          duration: 3000,
          open: true,
        }),
      );
    }
    if (editConnection.error) {
      dispatch(
        snackBarAction({
          message: editConnection.error,
          severity: "error",
          duration: 3000,
          open: true,
        }),
      );
    }
  }, [editConnection]);

  console.log(isAdd);

  return (
    <Paper className={classes.container}>
      <TextField
        size="small"
        classes={{ root: classes.inputs }}
        placeholder="Name"
        variant="outlined"
        value={value.name}
        name="name"
        onChange={handleChage}
      />
      <TextField
        classes={{ root: classes.inputs }}
        size="small"
        placeholder="slug"
        variant="outlined"
        value={value.slug}
        name="slug"
        onChange={handleChage}
      />
      <div className={classes.buttonsConatiner}>
        <Button color="primary" variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={() => setIsOpenForm(false)}
        >
          Cancel
        </Button>
      </div>
    </Paper>
  );
}

export default PoplForm;
