import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Dialog, DialogContent, Paper } from "@material-ui/core";
import Header from "../../components/Header";
import { getConnectionsAction, clearAddConnection, clearEditConnection } from "./store/actions";
import PoplForm from "./components/poplForm";
import PoplCard from "./components/poplCard";
import useStyles from "./styles/styles";
import "./styles/styles.css";
import SearchStripe from "../../components/searchStripe";
import Loader from "../../components/Loader";

function Connections() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const location = useLocation();
  const connections = useSelector(({ connectionsReducer }) => connectionsReducer.allConnections.data);
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

  const search = () => console.log("search");

  useEffect(() => {
    dispatch(getConnectionsAction());
  }, []);

  useEffect(() => {
    if (!isOpenForm) {
      dispatch(clearAddConnection());
      dispatch(clearEditConnection());
    }
  }, [isOpenForm]);

  useEffect(() => {
    setPopls(connections);
  }, [connections]);

  return (
    <>
      <Header
        rootLink="Connections"
        // firstChild={location.state.name}
        path="/connections"
      />
      <div
        className={`${
          dragablePopls.length ? "relative" : ""
        } main-padding ${classes.poplsPageContainer}`}
      >
        <div className="popls-header-container">
          <SearchStripe
            handleOpen={() => handleOpenForm()}
            btn_title="Add"
            search={search}
            disabled
          />
        </div>
        {!dragablePopls.length ? (
          <Loader styles={{ position: "absolute", top: "50%", left: "50%" }} />
        ) : (
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="list">
              {(provided) => (
                <div
                  className={classes.poplsContainer}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {dragablePopls.map((popl, index) => (
                    <Draggable
                      key={popl.customId}
                      draggableId={`${popl.customId}`}
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
                            key={popl.customId}
                            {...popl}
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
        )}
        <Dialog
          open={isOpenForm}
          onClose={() => setIsOpenForm(false)}
          maxWidth="md"
        >
          <DialogContent>
            <PoplForm
              setIsOpenForm={setIsOpenForm}
              // mid={location.state.id}
              popl={currentPopl}
            />
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}

export default Connections;
