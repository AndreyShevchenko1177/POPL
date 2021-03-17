import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Dialog, DialogContent, Paper } from "@material-ui/core";
import Header from "../../components/Header";
import {
  getConnectionsAction, clearAddConnection, clearEditConnection, collectSelectedConnections, clearConnectionData,
} from "./store/actions";
import PoplForm from "./components/connectionForm";
import PoplCard from "./components/connectionCard";
import useStyles from "./styles/styles";
import "./styles/styles.css";
import SearchStripe from "../../components/searchStripe";
import Loader from "../../components/Loader";

function Connections() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const location = useLocation();
  const profileData = useSelector(({ authReducer }) => authReducer.signIn.data);
  const connections = useSelector(({ connectionsReducer }) => connectionsReducer.allConnections.data);
  const isLoading = useSelector(({ connectionsReducer }) => connectionsReducer.isFetching);
  const { data: filterConnections, isFetching } = useSelector(({ connectionsReducer }) => connectionsReducer.collectConnections);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [currentPopl, setCurrentPopl] = useState();
  const [dragableConnections, setConnections] = useState([]);
  const [fitlersCheck, setFiltersCheck] = useState({});
  const [needHeight, setNeedHeight] = useState({
    height: 0,
    offset: 0,
  });

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

    const items = [...dragableConnections];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setConnections(items);
  };

  const handleSearch = (event) => {
    if (!event.target.value) {
      return setConnections(filterConnections || connections);
    }
    setConnections((filterConnections || connections).filter((prof) => prof.name.toLowerCase().includes(event.target.value.toLowerCase())).slice(0, 19));
  };

  const setFilters = (event, name) => {
    switch (name) {
    case "all": dispatch(collectSelectedConnections(profileData.id, "allConnections"));
      setNeedHeight({
        height: 0,
        offset: 0,
      });

    default:
    }
  };

  useEffect(() => {
    if (location.state?.id) return dispatch(getConnectionsAction(location.state?.id, "single"));
    dispatch(getConnectionsAction(profileData.id));
  }, []);

  useEffect(() => () => {
    dispatch(clearConnectionData("collectConnections"));
  }, []);

  useEffect(() => {
    if (!isOpenForm) {
      dispatch(clearAddConnection());
      dispatch(clearEditConnection());
    }
  }, [isOpenForm]);

  useEffect(() => {
    if (dragableConnections.length) return;
    setConnections(connections.slice(0, 19));
  }, [connections]);

  useEffect(() => {
    if (!needHeight.offset) return;
    if (filterConnections) {
      return setConnections((con) => ([...con, ...filterConnections.slice(needHeight.offset, (needHeight.offset + 19))]));
    }
    setConnections((con) => ([...con, ...connections.slice(needHeight.offset, (needHeight.offset + 19))]));
  }, [needHeight]);

  useEffect(() => {
    if (filterConnections) {
      setConnections(filterConnections.slice(0, 19));
    }
  }, [filterConnections]);
  console.log(isLoading);

  return (
    <>
      <Header
        rootLink="Connections"
        // firstChild={location.state.name}
        path="/connections"
      />
      <div
        className={`${
          dragableConnections.length ? "relative" : ""
        } main-padding ${classes.connectionsPageContainer}`}
        onScroll={(event) => {
          if (event.target?.scrollTop >= (event.target.clientHeight) + 10 * 150 + needHeight.height) {
            setNeedHeight({ height: event.target?.scrollTop, offset: needHeight.offset + 20 });
          }
        }
        }
      >
        <div className="popls-header-container">
          <SearchStripe
            isFetching={isFetching}
            setFilters={setFilters}
            fitlersCheck={fitlersCheck}
            isShow={location.state?.disabled === undefined ? true : location.state?.disabled}
            handleOpen={() => handleOpenForm()}
            btn_title="Add"
            handleSearch={handleSearch}
            disabled
            showCRM
          />
        </div>
        {isLoading ? (
          <Loader styles={{ position: "absolute", top: "50%", left: "50%" }} />
        ) : (
          <DragDropContext onDragEnd={handleOnDragEnd} >
            <Droppable droppableId="droppable">
              {(provided) => (
                <div
                  className={classes.DroppableConnectionContainer}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {dragableConnections.map((connection, index) => (
                    <Draggable
                      key={connection.customId}
                      draggableId={`${connection.customId}`}
                      index={index}
                    >
                      {(provided) => (
                        <Paper
                          className={classes.connectContainer}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          elevation={3}
                        >
                          <PoplCard
                            key={connection.customId}
                            {...connection}
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
              popl={currentPopl}
            />
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}

export default Connections;
