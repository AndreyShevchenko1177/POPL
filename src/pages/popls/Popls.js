import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { Paper, Button, Dialog, DialogContent } from "@material-ui/core";
import { getPoplsAction, editPoplAction } from "./store/actions";
import PoplForm from "./components/poplForm";
import useStyles from "./styles/styles";
import "./styles/styles.css";

function PoplsItem() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const location = useLocation();
  const popls = useSelector(({ poplsReducer }) => poplsReducer.allPopls.data);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [currentPopl, setCurrentPopl] = useState();

  const handleOpenForm = (popl) => {
    if (popl) {
      setCurrentPopl(popl);
    } else {
      setCurrentPopl();
    }
    setIsOpenForm(true);
  };

  useEffect(() => {
    dispatch(getPoplsAction());
  }, []);

  useEffect(() => {
    if (popls) setIsOpenForm(false);
  }, [popls]);

  return (
    <div className="relative">
      <div className="popls-header-container">
        <h2>{location.state.name} popls</h2>
        <Button
          size="small"
          color="primary"
          variant="contained"
          onClick={() => handleOpenForm()}
        >
          Add Popl
        </Button>
      </div>
      <div className="popls-container">
        {popls.map((popl) => (
          <Paper className={classes.poplCard} key={popl.id}>
            <p>Name: {popl.name}</p>
            <p>Url: {popl.url}</p>
            <Button
              size="small"
              style={{ marginRight: "10px" }}
              color="primary"
              variant="contained"
              onClick={() => handleOpenForm(popl)}
            >
              Edit
            </Button>
          </Paper>
        ))}
      </div>
      <Dialog
        open={isOpenForm}
        onClose={() => setIsOpenForm(false)}
        maxWidth="md"
      >
        <DialogContent>
          <PoplForm
            setIsOpenForm={setIsOpenForm}
            mid={location.state.id}
            popl={currentPopl}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default PoplsItem;
