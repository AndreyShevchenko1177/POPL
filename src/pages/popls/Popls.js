import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { Button, Dialog, DialogContent } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Header from "../../components/Header";
import { getPoplsAction, clearAddPopl, clearEditPopl } from "./store/actions";
import PoplForm from "./components/poplForm";
import PoplCard from "./components/poplCard";
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
    if (!isOpenForm) {
      dispatch(clearAddPopl());
      dispatch(clearEditPopl());
    }
  }, [isOpenForm]);
  return (
    <>
      <Header rootLink="Profiles" firstChild={location.state.name} />
      <div className="relative main-padding popls-page-container">
        <div className="popls-header-container">
          <Button
            variant="contained"
            color="primary"
            classes={{ root: classes.button, iconSizeMedium: classes.addIcon }}
            startIcon={<AddIcon />}
            onClick={handleOpenForm}
          >
            Add Popl
          </Button>
        </div>
        <div className="popls-container">
          {popls.map((popl) => (
            <PoplCard key={popl.id} popl={popl} editAction={handleOpenForm} />
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
    </>
  );
}

export default PoplsItem;
