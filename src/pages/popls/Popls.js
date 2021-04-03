import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Dialog, DialogContent, Paper } from "@material-ui/core";
import Header from "../../components/Header";
import {
  getPoplsAction, clearAddPopl, clearEditPopl, collectSelectedPopls, clearData,
} from "./store/actions";
import PoplForm from "./components/poplForm";
import PoplCard from "./components/poplCard";
import useStyles from "./styles/styles";
import "./styles/styles.css";
import SearchStripe from "../../components/searchStripe";
import Loader from "../../components/Loader";

function PoplsItem() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const location = useLocation();
  const profileData = useSelector(({ authReducer }) => authReducer.signIn.data);
  const popls = useSelector(({ poplsReducer }) => poplsReducer.allPopls.data);
  const isLoading = useSelector(({ poplsReducer }) => poplsReducer.isFetching);
  const { data: filterPopls, isFetching } = useSelector(({ poplsReducer }) => poplsReducer.collectPopl);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [currentPopl, setCurrentPopl] = useState();
  const [dragablePopls, setPopls] = useState([]);
  const [fitlersCheck, setFiltersCheck] = useState({});

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

  const handleSearch = (event) => {
    if (!event.target.value) {
      return setPopls(filterPopls || popls);
    }
    setPopls((filterPopls || popls).filter((prof) => prof.name.toLowerCase().includes(event.target.value.toLowerCase())));
  };

  const setFilters = (event, name) => {
    switch (name) {
    case "all": dispatch(collectSelectedPopls(profileData.id));

    // case "all": dispatch(retieveSelectedPopls());
    default:
    }
  };

  useEffect(() => {
    if (location.state?.profilesData?.id) {
      return dispatch(getPoplsAction(location.state?.profilesData.id, "single"));
    }
    dispatch(getPoplsAction(profileData.id));
  }, []);

  useEffect(() => () => {
    dispatch(clearData("collectPopl"));
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

  useEffect(() => {
    if (filterPopls) {
      setPopls(filterPopls);
    }
  }, [filterPopls]);

  console.log(dragablePopls);

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
            isFetching={isFetching}
            setFilters={setFilters}
            fitlersCheck={fitlersCheck}
            isShow={location.state?.disabled === undefined ? true : location.state?.disabled}
            handleOpen={() => handleOpenForm()}
            handleSearch={handleSearch}
            disabled
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
        )}
        <Dialog
          open={isOpenForm}
          onClose={() => setIsOpenForm(false)}
          maxWidth="md"
        >
          <DialogContent>
            <PoplForm
              setIsOpenForm={setIsOpenForm}
              mid={location.state?.id}
              popl={currentPopl}
            />
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}

export default PoplsItem;
