import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Dialog, DialogContent, Paper } from "@material-ui/core";
import Header from "../../components/Header";
import {
  getPoplsAction, clearAddPopl, clearEditPopl, collectSelectedPopls, retieveSelectedPopls, getProfilesIdsAction,
} from "./store/actions";
import PoplForm from "./components/poplForm";
import PoplCard from "./components/poplCard";
import useStyles from "./styles/styles";
import "./styles/styles.css";
import SearchStripe from "../../components/searchStripe";
import Loader from "../../components/Loader";
import Filters from "../../components/filters";

function PoplsItem() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const location = useLocation();
  const profileData = useSelector(({ authReducer }) => authReducer.signIn.data);
  const popls = useSelector(({ poplsReducer }) => poplsReducer.allPopls.data);
  const { data: filterPopls, isFetching } = useSelector(({ poplsReducer }) => poplsReducer.collectPopl);
  const profileIds = useSelector(({ poplsReducer }) => poplsReducer.profilesIds.data);
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

  const search = () => console.log("search");

  const setFilters = (event, name) => {
    setFiltersCheck({ ...fitlersCheck, [name]: event.target.checked });
    switch (name + event.target.checked) {
    case "alltrue": dispatch(collectSelectedPopls(profileIds));
      return;
    case "allfalse": dispatch(retieveSelectedPopls());
    default:
    }
  };

  useEffect(() => {
    dispatch(getPoplsAction(location.state?.id || profileData.id));
    dispatch(getProfilesIdsAction(location.state?.id || profileData.id));
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

  return (
    <>
      <Header
        rootLink="Profiles"
        firstChild={location.state?.name || profileData.name}
        path="/profiles"
      />
      <div
        className={`${
          dragablePopls.length ? "relative" : ""
        } main-padding popls-page-container`}
      >
        <div className="popls-header-container">
          <SearchStripe
            handleOpen={() => handleOpenForm()}
            btn_title="Add Popl"
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
