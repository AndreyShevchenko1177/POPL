/* eslint-disable no-lone-blocks */
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Paper } from "@material-ui/core";
import Header from "../../components/Header";
import {
  collectSelectedConnections, clearConnectionData, isFetchingAction,
} from "./store/actions";
import { ConnectedCard, NotConnectedCard } from "./components/connectionCard";
import useStyles from "./styles/styles";
import SearchStripe from "../../components/searchStripe";
import Loader from "../../components/Loader";

function Connections() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const location = useLocation();
  const profileData = useSelector(({ authReducer }) => authReducer.signIn.data);
  const isLoading = useSelector(({ connectionsReducer }) => connectionsReducer.isFetching);
  const { data: filterConnections } = useSelector(({ connectionsReducer }) => connectionsReducer.collectConnections);
  const connections = useSelector(({ connectionsReducer }) => connectionsReducer.collectConnections.connections?.connections);
  const [dragableConnections, setConnections] = useState([]);
  const [needHeight, setNeedHeight] = useState({
    height: 0,
    offset: 0,
  });
  const [isShowAll, setIsShowAll] = useState(false);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = [...dragableConnections];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setConnections(items);
  };

  const handleSearch = (event) => {
    if (!event.target.value) {
      if (location.state?.id) {
        return setConnections(connections[location.state.id]);
      }
      return setConnections(filterConnections);
    }
    if (location.state?.id) {
      console.log("ind");
      return setConnections((connections[location.state.id]).filter((prof) => prof.name.toLowerCase().includes(event.target.value.toLowerCase())).slice(0, 19));
    }
    console.log("all");
    setConnections(filterConnections.filter((prof) => prof.name.toLowerCase().includes(event.target.value.toLowerCase())).slice(0, 19));
  };

  const showAll = (event, name) => {
    dispatch(isFetchingAction(true));
    setIsShowAll(true);
    location.state = {
      ...location.state, name: "", disabled: true,
    };
  };

  console.log(location.state);

  useEffect(() => {
    dispatch(collectSelectedConnections(profileData.id, "allConnections"));

    return () => dispatch(clearConnectionData("collectConnections"));
  }, []);

  useEffect(() => {
    if (isShowAll) {
      setConnections(filterConnections);
      setIsShowAll(false);
      dispatch(isFetchingAction(false));
      setNeedHeight({
        height: 0,
        offset: 0,
      });
    }
  }, [isShowAll]);

  useEffect(() => {
    if (!filterConnections) return setConnections([]);
    if (location.state?.id) {
      return setConnections(connections[location.state.id].slice(0, 19));
    }
    setConnections(filterConnections.slice(0, 19));
  }, [filterConnections]);

  useEffect(() => {
    if (!needHeight.offset) return;
    if (location.state?.id) {
      return setConnections((con) => ([...con, ...connections[location.state.id].slice(needHeight.offset, (needHeight.offset + 19))]));
    }
    setConnections((con) => ([...con, ...filterConnections.slice(needHeight.offset, (needHeight.offset + 19))]));
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
