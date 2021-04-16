/* eslint-disable no-return-assign */
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Paper } from "@material-ui/core";
import Header from "../../components/Header";
import {
  getPoplsAction, collectSelectedPopls, clearData,
} from "./store/actions";
import PoplCard from "./components/poplCard";
import useStyles from "./styles/styles";
import "./styles/styles.css";
import { getPopsAction, cleanActionName } from "../overallAnalytics/store/actions";
import SearchStripe from "../../components/searchStripe";
import Loader from "../../components/Loader";
import { sortConfig } from "./selectConfig";
import { isSafari } from "../../constants";
import { filterPops } from "../../utils";

function PoplsItem() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const location = useLocation();
  const profileData = useSelector(({ authReducer }) => authReducer.signIn.data);
  const popls = useSelector(({ poplsReducer }) => poplsReducer.allPopls.data);
  const pops = useSelector(({ realTimeAnalytics }) => realTimeAnalytics.allPops?.data?.allPops);
  const isLoading = useSelector(({ poplsReducer }) => poplsReducer.isFetching);
  const { data: filterPopls, isFetching } = useSelector(({ poplsReducer }) => poplsReducer.collectPopl);
  const [dragablePopls, setPopls] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [mainCheck, setMainCheck] = useState(false);
  const [checkboxes, setCheckBoxes] = useState({});
  const [openProfileSelect, setOpenProfileSelect] = useState({
    action: { open: false, component: "" },
    sort: { open: false, component: "" },
  });
  const [sortingConfig, setSortingConfig] = useState(sortConfig);

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
      return setPopls(filterPopls || popls);
    }
    setPopls((filterPopls || popls).filter((prof) => prof.name.toLowerCase().includes(event.target.value.toLowerCase())));
  };

  const setFilters = (event, name) => {
    switch (name) {
    case "all": {
      setSearchValue("");
      location.state.profilesData = undefined;
      dispatch(collectSelectedPopls(profileData.id));
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
    if (location.state?.profilesData?.id) {
      dispatch(getPoplsAction(location.state?.profilesData.id, "single"));
    } else dispatch(getPoplsAction(profileData.id));
    dispatch(getPopsAction(profileData.id));
  }, []);

  useEffect(() => () => {
    dispatch(clearData("collectPopl"));
    dispatch(cleanActionName("allPops"));
  }, []);

  useEffect(() => {
    if (!pops) return;
    setPopls(popls.map((popl) => ({ ...popl, date: new Date(popl.activationDate).getTime(), popsNumber: pops.filter((pop) => filterPops.slicePoplNameFromPop(pop[1]) === popl.name).length })));
  }, [popls]);

  useEffect(() => {
    if (filterPopls) {
      setPopls(filterPopls);
    }
  }, [filterPopls]);

  return (
    <>
      <Header
        rootLink="Popls"
        firstChild={location.state?.profilesData?.name}
        path="/popls"
      />
      <div
        className={`${
          dragablePopls.length ? "relative" : ""
        } main-padding popls-page-container`}
      >
        <div className="popls-header-container">
          <SearchStripe
            isShowSortBtn
            isFetching={isFetching}
            handleCheck={handleCheck}
            checked={mainCheck}
            checkboxes={checkboxes}
            setFilters={setFilters}
            isShow={location.state?.disabled === undefined ? true : location.state?.disabled}
            searchValue={searchValue}
            handleSearch={handleSearch}
            arrowHandler={arrowHandler}
            selectObject={{
              openProfileSelect,
              setOpenProfileSelect,
              sortConfig: sortingConfig,
              sortHandler,
            }}
          />
        </div>
        {isLoading ? (
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
                              allPops={pops}
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
        )}
      </div>
    </>
  );
}

export default PoplsItem;
