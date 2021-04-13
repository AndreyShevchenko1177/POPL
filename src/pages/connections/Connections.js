/* eslint-disable no-lone-blocks */
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Paper } from "@material-ui/core";
import Header from "../../components/Header";
import {
  collectSelectedConnections, clearConnectionData, showAllConnectionsAction,
} from "./store/actions";
import { ConnectedCard, NotConnectedCard } from "./components/connectionCard";
import useStyles from "./styles/styles";
import SearchStripe from "../../components/searchStripe";
import Loader from "../../components/Loader";

function Connections() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const profileData = useSelector(({ authReducer }) => authReducer.signIn.data);
  const isLoading = useSelector(({ connectionsReducer }) => connectionsReducer.isFetching);
  const connections = useSelector(({ connectionsReducer }) => connectionsReducer.connections.data?.allConnections);
  const [dragableConnections, setConnections] = useState([]);
  const [needHeight, setNeedHeight] = useState({
    height: 0,
    offset: 0,
  });
  const [searchValue, setSearchValue] = useState("");

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = [...dragableConnections];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setConnections(items);
  };

  const handleSearch = (event) => {
    if (!event.target.value) {
      return setConnections(connections.slice(0, 19));
    }
    setSearchValue(event.target.value);
    setConnections(connections.filter((prof) => prof.name.toLowerCase().includes(event.target.value.toLowerCase())).slice(0, 19));
  };

  const showAll = (event, name) => {
    history.push("/connections", { disabled: true });
    setSearchValue("");
    dispatch(showAllConnectionsAction());
  };

  useEffect(() => {
    if (location.state?.id) {
      return dispatch(collectSelectedConnections(location.state.id, "allConnections", true));
    }
    dispatch(collectSelectedConnections(profileData.id, "allConnections"));

    return () => dispatch(clearConnectionData("collectConnections"));
  }, []);

  useEffect(() => {
    if (!connections) return setConnections([]);
    setConnections(connections.slice(0, 19));
  }, [connections]);

  useEffect(() => {
    if (!needHeight.offset) return;
    setConnections((con) => ([...con, ...connections.slice(needHeight.offset, (needHeight.offset + 19))]));
  }, [needHeight]);

  return (
    <>
      <Header
        rootLink="Connections"
        firstChild={location.state?.name}
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
        <div className={classes.poplsHeaderContainer}>
          <SearchStripe
            setFilters={showAll}
            isShow={location.state?.disabled === undefined ? true : location.state?.disabled}
            searchValue={searchValue}
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
                      tabIndex={1}
                      key={connection.customId}
                      draggableId={`${connection.customId}`}
                      index={index}
                    >
                      {(provided) => (
                        <Paper
                          tabIndex={1}
                          className={classes.connectContainer}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          elevation={3}
                        >
                          {connection.noPopl || "noPopl" in connection
                            ? <NotConnectedCard
                              key={connection.customId}
                              {...connection}
                            />
                            : <ConnectedCard
                              key={connection.customId}
                              {...connection}
                            />
                          }
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
      </div>
    </>
  );
}

export default Connections;
