import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Dialog, DialogContent, Paper } from "@material-ui/core";
import Header from "../../components/Header";
import {
  getConnectionsAction, clearAddConnection, clearEditConnection, collectSelectedConnections, retieveSelectedConnections, getProfilesIdsAction,
} from "./store/actions";
import PoplForm from "./components/connectionForm";
import PoplCard from "./components/connectionCard";
import useStyles from "./styles/styles";
import "./styles/styles.css";
import SearchStripe from "../../components/searchStripe";
import Loader from "../../components/Loader";
import Filters from "../../components/filters";

function Connections() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const location = useLocation();
  const profileData = useSelector(({ authReducer }) => authReducer.signIn.data);
  const connections = useSelector(({ connectionsReducer }) => connectionsReducer.allConnections.data);
  const { data: filterConnections, isFetching } = useSelector(({ connectionsReducer }) => connectionsReducer.collectConnections);
  const profileIds = useSelector(({ connectionsReducer }) => connectionsReducer.profilesIds.data);
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

  const search = () => console.log("search");

  const setFilters = (event, name) => {
    setFiltersCheck({ ...fitlersCheck, [name]: event.target.checked });
    switch (name + event.target.checked) {
    case "alltrue": dispatch(collectSelectedConnections(profileIds, "allConnections"));
      setNeedHeight({
        height: 0,
        offset: 0,
      });
      return;
    case "allfalse": dispatch(retieveSelectedConnections());
    default:
    }
  };

  useEffect(() => {
    dispatch(getConnectionsAction(location.state?.id || profileData.id));
    dispatch(getProfilesIdsAction(location.state?.id || profileData.id));
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
        } main-padding ${classes.poplsPageContainer}`}
        onScroll={(event) => {
          if (event.target?.scrollTop >= (event.target.clientHeight) + 10 * 150 + needHeight.height) {
            setNeedHeight({ height: event.target?.scrollTop, offset: needHeight.offset + 20 });
          }
        }
        }
      >
        <div className="popls-header-container">
          <SearchStripe
            handleOpen={() => handleOpenForm()}
            btn_title="Add"
            search={search}
            disabled
          />
        </div>
        <div className={classes.filtersContainer}>
          <Filters
            isFetching={isFetching}
            setFilters={setFilters}
            fitlersCheck={fitlersCheck}
            disabled={location.state?.disabled === undefined ? true : location.state?.disabled}
          />
        </div>
        {!dragableConnections.length ? (
          <Loader styles={{ position: "absolute", top: "50%", left: "50%" }} />
        ) : (
          <DragDropContext onDragEnd={handleOnDragEnd} >
            <Droppable droppableId="list">
              {(provided) => (
                <div
                  className={classes.poplsContainer}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {dragableConnections.map((popl, index) => (
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
