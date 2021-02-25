import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Paper, TextField } from "@material-ui/core";
import { editPoplAction, addPoplAction } from "../../store/actions";
import { snackBarAction } from "../../../../store/actions";
import useStyles from "./styles/style";
import CButton from "../../../../components/CButton";

function PoplForm({ popl, setIsOpenForm, mid }) {
  const classes = useStyles();
  const [value, setValue] = useState({
    name: "",
    slug: "",
  });
  const dispatch = useDispatch();
  const [isAdd, setIsAdd] = useState(false);
  const addPopl = useSelector(({ poplsReducer }) => poplsReducer.addPopl);
  const editPopl = useSelector(({ poplsReducer }) => poplsReducer.editPopl);

  const handleChage = (event) => {
    event.persist();
    const { name, value } = event.target;
    setValue((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!isAdd) return dispatch(editPoplAction({ id: popl.id, mid, ...value }));
    dispatch(addPoplAction({ mid, ...value }));
  };

  useEffect(() => {
    if (popl) return setValue({ name: popl.name, slug: popl.url });
    setIsAdd(true);
  }, []);

  useEffect(() => {
    if (addPopl.data) {
      setIsOpenForm(false);
      dispatch(
        snackBarAction({
          message: "Popl added successfully",
          severity: "success",
          duration: 3000,
          open: true,
        })
      );
    }
    if (addPopl.error) {
      dispatch(
        snackBarAction({
          message: addPopl.error,
          severity: "error",
          duration: 3000,
          open: true,
        })
      );
    }
  }, [addPopl]);

  useEffect(() => {
    if (editPopl.data) {
      setIsOpenForm(false);
      dispatch(
        snackBarAction({
          message: "Popl added successfully",
          severity: "success",
          duration: 3000,
          open: true,
        })
      );
    }
    if (editPopl.error) {
      dispatch(
        snackBarAction({
          message: addPopl.error,
          severity: "error",
          duration: 3000,
          open: true,
        })
      );
    }
  }, [editPopl]);

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
        <CButton color="primary" variant="contained" cb={handleSubmit}>
          Submit
        </CButton>
        <CButton
          color="primary"
          variant="contained"
          cb={() => setIsOpenForm(false)}
        >
          Cancel
        </CButton>
      </div>
    </Paper>
  );
}

export default PoplForm;
