import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Paper, TextField, Button } from "@material-ui/core";
import { editPoplAction, addPoplAction } from "../../store/actions";
import useStyles from "./styles/style";
import "./styles/styles.css";

function PoplForm({ popl, setIsOpenForm, mid }) {
  const classes = useStyles();
  const [value, setValue] = useState({
    name: "",
    slug: "",
  });
  const dispatch = useDispatch();
  const [isAdd, setIsAdd] = useState(false);

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
      <div className="popl-form-buttons-container">
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
