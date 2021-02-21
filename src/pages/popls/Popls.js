import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Dialog, DialogContent, Paper } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Header from "../../components/Header";
import { getPoplsAction, clearAddPopl, clearEditPopl } from "./store/actions";
import PoplForm from "./components/poplForm";
import PoplCard from "./components/poplCard";
import useStyles from "./styles/styles";
import "./styles/styles.css";
import CButton from "../../components/CButton";
import SearchStripe from "../../components/searchStripe";

function PoplsItem() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const location = useLocation();
  const popls = useSelector(({ poplsReducer }) => poplsReducer.allPopls.data);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [currentPopl, setCurrentPopl] = useState();
  const [dragablePopls, setPopls] = useState([]);

  const handleOpenForm = (popl) => {
    if (popl) {
      setCurrentPopl(popl);
    } else {
      setCurrentPopl();
    }
    setIsOpenForm(true);
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = [...dragablePopls];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setPopls(items);
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

  useEffect(() => {
    setPopls(popls);
  }, [popls]);

  return (
    <>
      <Header
        rootLink="Profiles"
        firstChild={location.state.name}
        path="/profiles"
      />
      <div className="relative main-padding popls-page-container">
        <div className="popls-header-container">
          <SearchStripe
            handleOpen={() => handleOpenForm()}
            btn_title="Add Popl"
          />
        </div>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="list">
            {(provided) => (
              <div
                className="popls-container"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {dragablePopls.map((popl, index) => (
                  <Draggable
                    key={popl.id}
                    draggableId={`${popl.id}`}
                    index={index}
                  >
                    {(provided) => (
                      <Paper
                        className={classes.poplContainer}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        elevation={3}
                      >
                        <PoplCard
                          key={popl.id}
                          popl={popl}
                          editAction={handleOpenForm}
                        />
                      </Paper>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
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
