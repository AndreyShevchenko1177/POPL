/* eslint-disable no-return-assign */
/* eslint-disable no-lone-blocks */
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { AccordionActions, Paper, Typography } from "@material-ui/core";
import clsx from "clsx";
import moment from "moment";
import Header from "../../components/Header";
import {
  collectSelectedConnections, clearConnectionData, showAllConnectionsAction, showConnectionByProfile,
} from "./store/actions";
import { clearChecboxAction, setCheckboxAction } from "../overallAnalytics/store/actions";
import { ConnectedCard, NotConnectedCard } from "./components/connectionCard";
import useStyles from "./styles/styles";
import SearchStripe from "../../components/searchStripe";
import Loader from "../../components/Loader";
import { sortConfig } from "./selectConfig";
import { filterConfig } from "./filterConfig";
import { isSafari } from "../../constants";
import { formatDateConnections } from "../../utils/dates";

import ConnectionHeader from "./components/connectionHeader/ConnectionHeader";
import ConnectionHeaderTitle from "./components/connectionHeaderTitle/ConnectionHeaderTitle";

function Connections() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const profileData = useSelector(({ authReducer }) => authReducer.signIn.data);
  const dataCheckboxes = useSelector(({ realTimeAnalytics }) => realTimeAnalytics.checkBoxData);
  const profiles = useSelector(
    ({ profilesReducer }) => profilesReducer.dataProfiles.data,
  );
  const isLoading = useSelector(({ connectionsReducer }) => connectionsReducer.isFetching);
  const allConnections = useSelector(({ connectionsReducer }) => connectionsReducer.connections.data?.allConnections);
  const connectionsObject = useSelector(({ connectionsReducer }) => connectionsReducer.connections.data?.connectionsObject);

  const [dragableConnections, setConnections] = useState([]);
  const [sortDirection, setSortDirection] = useState(0);

  const handleSortDirection = () => { setSortDirection((prev) => (prev + 2) % 3 - 1); };

  const [sortParams, setSortParams] = useState({
    sortField: "noField",
  });

  const handleSortParams = ((newParam) => { setSortParams((prev) => ({ ...prev, ...newParam })); });

  const [needHeight, setNeedHeight] = useState({
    height: 0,
    offset: 0,
  });
  const [searchValue, setSearchValue] = useState("");
  const [openProfileSelect, setOpenProfileSelect] = useState({
    action: { open: false, component: "" },
    sort: { open: false, component: "" },
    filter: { open: false, component: "" },
  });
  const [sortingConfig, setSortingConfig] = useState(sortConfig);
  const [filteringConfig, setFilterConfig] = useState(filterConfig);
  const [sortConnections, setSortConnections] = useState();

  const [checkboxes, setCheckBoxes] = useState({});
  const [selectAllCheckbox, setSelectAllCheckbox] = useState(false);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = [...dragableConnections];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setConnections(items);
  };

  const handleSelectAllCheckboxes = (event) => {
    event.persist();
    const { checked } = event.target;
    setSelectAllCheckbox(checked);
    setCheckBoxes((prev) => {
      const result = {};
      Object.keys(prev).forEach((key) => result[key] = checked);
      return result;
    });
  };

  const handleSearch = (event) => {
    if (isLoading ?? true) return;
    setSearchValue(event.target.value);
    if (!event.target.value) {
      return setConnections(allConnections.slice(0, 19));
    }
    setConnections(allConnections.filter((prof) => prof.name.toLowerCase().includes(event.target.value.toLowerCase())).slice(0, 19));
  };

  const showAll = (event, name) => {
    history.push("/connections", { disabled: true });
    setSearchValue("");
    setNeedHeight({
      height: 0,
      offset: 0,
    });
    dispatch(clearChecboxAction());
    dispatch(showAllConnectionsAction());
  };

  const arrowHandler = (value, name) => {
    if (openProfileSelect[name].component === "select" && isSafari) {
      return setOpenProfileSelect({ ...openProfileSelect, [name]: { open: false, component: "" } });
    }
    setOpenProfileSelect({ ...openProfileSelect, [name]: { open: !openProfileSelect[name].open, component: "searchStripe" } });
  };

  // const sortHandler---OLD = (name, _, selectName) => {
  //   if (!(dragableConnections).length) return;
  //   setSortingConfig(sortConfig.map((con) => (con.name === name ? ({ ...con, active: true }) : con)));
  //   setConnections(() => {
  //     const sortProfiles = [...allConnections].map((el) => ({ ...el, connectedWith: Object.keys(el.names).length })).sort((a, b) => b[name] - a[name]);
  //     return sortProfiles.slice(0, 19);
  //   });
  //   setNeedHeight({
  //     height: 0,
  //     offset: 0,
  //   });
  //   setSortConnections((prevConnections) => [...allConnections].map((el) => ({ ...el, connectedWith: Object.keys(el.names).length })).sort((a, b) => b[name] - a[name]));
  //   setOpenProfileSelect({ ...openProfileSelect, [selectName]: { open: false, component: "listItem" } });
  // };

  const sortHandler = () => {
    if (!(dragableConnections).length) return;

    const sortProfiles = [...allConnections]
      .map((el) => {
        let newTime = formatDateConnections(el.time).replace(/(.*), (\d*)\/(\d*) (\d*)/, "$4_$2_$3");
        let sortDate = moment(newTime, "M_D_YYYY");
        return { ...el, connectedWith: Object.keys(el.names).length, sortDate };
      })
      .sort((a, b) => (a[sortParams.sortField] > b[sortParams.sortField] ? 1 : -1) * sortDirection);

    setConnections(() => sortProfiles.slice(0, 19));
    setNeedHeight({
      height: 0,
      offset: 0,
    });
    setSortConnections(() => sortProfiles);
    // setOpenProfileSelect({ ...openProfileSelect, [selectName]: { open: false, component: "listItem" } });
  };

  useEffect(sortHandler, [sortParams, sortDirection]);

  // const resetSort = () => {
  //   setConnections(() => allConnections.slice(0, 19));
  //   setNeedHeight({
  //     height: 0,
  //     offset: 0,
  //   });
  //   setSortingConfig(sortConfig.map((con) => ({ ...con, active: false })));
  // };

  const clearFilterInput = (name) => {
    showAll();
    dispatch(clearChecboxAction());
  };

  const handleChangeInputFilter = (event, val, item) => {
    if (!val) {
      return showAll();
    }
    setNeedHeight({
      height: 0,
      offset: 0,
    });
    // dispatch(showConnectionByProfile(Object.keys(dataCheckboxes)));
  };

  const sendEmailTo = () => {
    const connections = Object.keys(checkboxes).reduce((acc, cur) => {
      if (checkboxes[cur]) {
        const activeConnection = allConnections.find(({ customId }) => customId == cur);
        if (activeConnection?.email) {
          return [...acc, activeConnection];
        }
        return acc;
      }
      return acc;
    }, []);
    history.push("email-notifications", connections);
  };

  useEffect(() => {
    const checkboxArray = Object.values(checkboxes);
    if (checkboxArray.every((el) => !el)) {
      setSelectAllCheckbox(false);
    } else if (checkboxArray.every((el) => el)) {
      setSelectAllCheckbox(true);
    } else if (checkboxArray.some((el) => !el)) {
      setSelectAllCheckbox(false);
    }
  }, [checkboxes]);

  useEffect(() => {
    if (location.state?.id) {
      dispatch(setCheckboxAction({ id: Number(location.state.id), checked: true }, "profiles"));
    }
  }, [location.state?.id]);

  useEffect(() => {
    if (Object.keys(dataCheckboxes.profiles).length && connectionsObject && profiles) {
      const selectedCheckBox = Object.keys(dataCheckboxes.profiles).filter((el) => dataCheckboxes.profiles[el]).map((el) => Number(el));
      const isSelected = Object.values(dataCheckboxes.profiles).includes(true);
      if (!isSelected) return dispatch(showConnectionByProfile(profiles.map(({ id }) => Number(id))));
      dispatch(showConnectionByProfile(selectedCheckBox));
    }
  }, [dataCheckboxes.profiles, connectionsObject, profiles]);

  useEffect(() => {
    if (location.state?.id) {
      return dispatch(collectSelectedConnections(location.state.id, true));
    }
    dispatch(collectSelectedConnections(profileData.id));

    return () => {
      dispatch(clearConnectionData("collectConnections"));
      dispatch(clearChecboxAction());
    };
  }, []);

  useEffect(() => {
    if (!allConnections) return;
    if (location.state?.id) {
      // !!!!!
      // const filteredConnections = allConnections.filter((item) => Object.values(item.names).map((el) => el.name.toLowerCase()).includes(location.state.name.toLowerCase()));
      const filteredConnections = connectionsObject[location.state.id];
      // setting initial checkboxes state for rendered connections
      setCheckBoxes(() => {
        const result = {};
        allConnections.forEach((con) => result[con.customId] = false); // initial checkbox state = false
        return result;
      });
      setSortConnections(filteredConnections);
      return setConnections(filteredConnections.slice(0, 19));
    }
    // setting initial checkboxes state for rendered connections for non individual profile level
    setCheckBoxes(() => {
      const result = {};
      allConnections.forEach((con) => result[con.customId] = false); // initial checkbox state = false
      return result;
    });
    setConnections(allConnections.slice(0, 19));
    setSortConnections(allConnections);
  }, [allConnections, location.state?.id]);

  useEffect(() => {
    if (!needHeight.offset) return;
    // initializing new checkboxes state by scrolling
    // setCheckBoxes((prev) => {
    //   const result = {};
    //   allConnections.forEach((con) => result[con.customId] = false); // initial checkbox state = false
    //   return { ...prev, ...result };
    // });
    setConnections((con) => ([...con, ...sortConnections.slice(needHeight.offset, (needHeight.offset + 19))]));
  }, [needHeight]);

  return (
    <>

      <ConnectionHeader/>

      <div
        className={`${
          dragableConnections?.length ? "relative" : ""
        } main-padding ${classes.connectionsPageContainer}`}
        onScroll={(event) => {
          // if (event.target?.scrollTop >= (event.target.clientHeight) + needHeight.height + 8*95) {
          if (event.target?.scrollTop >= (event.target.scrollHeight - event.target.clientHeight - 150)) {
            setNeedHeight({ height: event.target?.scrollTop, offset: needHeight.offset + 20 });
          }
        }
        }
      >
        {/* <SearchStripe
          styles={{ containerWrapper: { top: 0 } }}
          isShowSortBtn
          showAll
          setFilters={showAll}
          isShow={!Object.values(dataCheckboxes.profiles).includes(true)}
          searchValue={searchValue}
          checked={selectAllCheckbox}
          numberActivecheckboxes={Object.values(checkboxes).filter((checked) => checked).length}
          sendEmailTo={sendEmailTo}
          handleSearch={handleSearch}
          showCRM
          // crmDisabled={!allConnections?.length}
          handleCheck={handleSelectAllCheckboxes}
          arrowHandler={arrowHandler}
          selectObject={{
            openProfileSelect,
            setOpenProfileSelect,
            sortConfig: sortingConfig,
            sortHandler,
            resetSort,
            handleChange: handleChangeInputFilter,
            clearInput: clearFilterInput,
          }}
          filterConfig={filteringConfig}
          autoComleteData={profiles}
          isLoading={isLoading ?? true}
        /> */}

        <ConnectionHeaderTitle
          handleSortDirection={handleSortDirection}
          sortDirection={sortDirection}
          sortParams={sortParams}
          handleSortParams={handleSortParams}
          selectAllCheckbox={selectAllCheckbox}
          handleCheck={handleSelectAllCheckboxes}
        />

        {isLoading ? (
          <Loader styles={{ position: "absolute", top: "50%", left: "50%" }} />
        ) : dragableConnections?.length ? (
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
                          elevation={checkboxes[connection.customId] ? 20 : 0}
                          tabIndex={1}
                          className={clsx(classes.connectContainer, !checkboxes[connection.customId] && classes.connectContainerShadow, (connection.noPopl || "noPopl" in connection) && classes.viaconnectBackground)}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          // elevation={3}
                        >
                          {"noPopl" in connection
                            ? <NotConnectedCard
                              key={connection.customId}
                              isChecked={checkboxes[connection.customId]}
                              setCheckbox={setCheckBoxes}
                              {...connection}
                            />
                            : <ConnectedCard
                              key={connection.customId}
                              checked={checkboxes[connection.customId]}
                              setCheckbox={setCheckBoxes}
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
        ) : dragableConnections && <div style={{
          height: "50vh", display: "flex", justifyContent: "center", alignItems: "center",
        }}>
          <Typography variant='h3'>No connections for this profile</Typography>
        </div>}
      </div>
    </>
  );
}

export default Connections;
