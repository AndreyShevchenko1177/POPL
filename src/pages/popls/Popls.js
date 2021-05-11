/* eslint-disable no-return-assign */
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Paper, Typography } from "@material-ui/core";
import Header from "../../components/Header";
import { getPoplsAction } from "./store/actions";
import PoplCard from "./components/poplCard";
import useStyles from "./styles/styles";
import "./styles/styles.css";
import { getPopsAction, cleanAction } from "../overallAnalytics/store/actions";
import SearchStripe from "../../components/searchStripe";
import Loader from "../../components/Loader";
import { sortConfig } from "./selectConfig";
import { filterConfig } from "./filterConfig";
import { isSafari } from "../../constants";
import { filterPops } from "../../utils";

function PoplsItem() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const location = useLocation();
  const profileData = useSelector(({ authReducer }) => authReducer.signIn.data);
  const profiles = useSelector(
    ({ profilesReducer }) => profilesReducer.dataProfiles.data,
  );
  const popls = useSelector(({ poplsReducer }) => poplsReducer.allPopls.data);
  const pops = useSelector(({ realTimeAnalytics }) => realTimeAnalytics.allPops?.data?.allPops);
  const isFetching = useSelector(({ poplsReducer }) => poplsReducer.isFetching);
  const isLoading = useSelector(({ poplsReducer }) => poplsReducer.isFetching);
  const [dragablePopls, setPopls] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [mainCheck, setMainCheck] = useState(false);
  const [checkboxes, setCheckBoxes] = useState({});
  const [openProfileSelect, setOpenProfileSelect] = useState({
    action: { open: false, component: "" },
    sort: { open: false, component: "" },
    filter: { open: false, component: "" },
  });
  const history = useHistory();
  const [sortingConfig, setSortingConfig] = useState(sortConfig);
  const [filteringConfig, setFilterConfig] = useState(filterConfig);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = [...dragablePopls];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setPopls(items);
  };

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
    if (!event.target.value) {
      return setPopls(popls.map((popl) => ({ ...popl, date: new Date(popl.activationDate).getTime(), popsNumber: pops.filter((pop) => filterPops.slicePoplNameFromPop(pop[1]) === popl.name).length })));
    }
    setPopls((popls).filter((prof) => prof.nickname.toLowerCase().includes(event.target.value.toLowerCase())).map((popl) => ({ ...popl, date: new Date(popl.activationDate).getTime(), popsNumber: pops.filter((pop) => filterPops.slicePoplNameFromPop(pop[1]) === popl.name).length })));
  };

  const showAll = (event, name) => {
    switch (name) {
    case "all": {
      setSearchValue("");
      history.push("/popls");
      setPopls(popls.map((popl) => ({ ...popl, date: new Date(popl.activationDate).getTime(), popsNumber: pops.filter((pop) => filterPops.slicePoplNameFromPop(pop[1]) === popl.name).length })));
    }
    default:
    }
  };

  const handleCheck = (event) => {
    setMainCheck(event.target.checked);
    setCheckBoxes((chk) => {
      const checkObject = {};
      Object.keys(chk).map((el) => checkObject[el] = ({ ...chk[el], checked: event.target.checked }));
      return checkObject;
    });
  };

  const poplsCheck = (event) => {
    const { name } = event.target;
    setCheckBoxes({
      ...checkboxes,
      [name]: {
        checked: !checkboxes[name].checked,
        ...popls.find((el) => el.customId === name),
      },
    });
  };

  const arrowHandler = (value, name) => {
    if (openProfileSelect[name].component === "select" && isSafari) {
      return setOpenProfileSelect({ ...openProfileSelect, [name]: { open: false, component: "" } });
    }
    setOpenProfileSelect({ ...openProfileSelect, [name]: { open: !openProfileSelect[name].open, component: "searchStripe" } });
  };

  const sortHandler = (name, _, selectName) => {
    if (!(dragablePopls).length) return;
    setSortingConfig(sortConfig.map((con) => (con.name === name ? ({ ...con, active: true }) : con)));
    setPopls((prevPopls) => {
      const sortProfiles = [...prevPopls].sort((a, b) => b[name] - a[name]);
      return sortProfiles;
    });
    setOpenProfileSelect({ ...openProfileSelect, [selectName]: { open: false, component: "listItem" } });
  };

  const resetSort = () => {
    setPopls(popls.map((popl) => ({ ...popl, date: new Date(popl.activationDate).getTime(), popsNumber: pops.filter((pop) => filterPops.slicePoplNameFromPop(pop[1]) === popl.name).length })));
    setSortingConfig(sortConfig.map((con) => ({ ...con, active: false })));
  };

  const clearFilterInput = (name) => {
    showAll(null, "all");
  };

  const handleChangeInputFilter = (event, val) => {
    if (!val) {
      showAll(null, "all");
      return;
    }
    setPopls(popls.filter((item) => item.profileOwner.toLowerCase().includes(val.toLowerCase())));
  };

  useEffect(() => {
    const checkBoxObject = {};
    dragablePopls && dragablePopls.forEach((el) => {
      checkBoxObject[el.customId] = {
        checked: false,
        ...popls.find((item) => item.customId === el.customId),
      };
    });
    setCheckBoxes(checkBoxObject);
  }, [dragablePopls]);

  useEffect(() => {
    const checkboxArray = Object.values(checkboxes);
    if (checkboxArray.every((el) => !el.checked)) {
      setMainCheck(false);
    } else if (checkboxArray.every((el) => el.checked)) {
      setMainCheck(true);
    } else if (checkboxArray.some((el) => !el.checked)) {
      setMainCheck(false);
    }
  }, [checkboxes]);

  useEffect(() => {
    dispatch(getPoplsAction(profileData.id));
    dispatch(getPopsAction());
  }, []);

  useEffect(() => () => dispatch(cleanAction()), []); // cleaning analytics reducer

  useEffect(() => {
    if (!pops) return;
    if (location.state?.profilesData?.id) {
      setFilterConfig((fc) => fc.map((item) => (location.state.profilesData[item.pseudoname] ? ({ ...item, value: location.state.profilesData[item.pseudoname] }) : item)));
      return setPopls(popls
        .filter((popl) => popl.profileId === location.state.profilesData.id)
        .map((popl) => ({ ...popl, date: new Date(popl.activationDate).getTime(), popsNumber: pops.filter((pop) => filterPops.slicePoplNameFromPop(pop[1]) === popl.name).length })));
    }
    setPopls(popls.map((popl) => ({ ...popl, date: new Date(popl.activationDate).getTime(), popsNumber: pops.filter((pop) => filterPops.slicePoplNameFromPop(pop[1]) === popl.name).length })));
  }, [popls, pops, location]);

  return (
    <>
      <Header
        rootLink="Popls"
        firstChild={location.state?.profilesData?.name}
        path="/popls"
      />
      <div
        className={`${
          dragablePopls?.length ? "relative" : ""
        } main-padding popls-page-container`}
      >
        <div className="popls-header-container">
          <SearchStripe
            isShowSortBtn
            isFetching={isFetching}
            handleCheck={handleCheck}
            checked={mainCheck}
            checkboxes={checkboxes}
            setFilters={showAll}
            isShow={location.state?.disabled === undefined ? true : location.state?.disabled}
            searchValue={searchValue}
            handleSearch={handleSearch}
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
          />
        </div>
        {isLoading ? (
          <Loader styles={{ position: "absolute", top: "50%", left: "50%" }} />
        ) : dragablePopls?.length ? (
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="list">
              {(provided) => (
                <div
                  className={classes.poplsContainer}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {dragablePopls
                    .filter((el, i, array) => array.indexOf(el) === i)
                    .map((popl, index) => (
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
                            elevation={checkboxes[popl.customId]?.checked ? 20 : 3}
                          >
                            <PoplCard
                              key={popl.id}
                              popl={popl}
                              customId={popl.customId}
                              // allPops={pops}
                              poplsCheck={poplsCheck}
                              checkboxes={checkboxes}
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
        ) : dragablePopls && <div style={{
          height: "50vh", display: "flex", justifyContent: "center", alignItems: "center",
        }}>
          <Typography variant='h3'>No popls for this profile</Typography>
        </div>}
      </div>
    </>
  );
}

export default PoplsItem;
