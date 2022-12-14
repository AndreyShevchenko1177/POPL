import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";

import moment from "moment";
import PropTypes from "prop-types";
import "./styles.css";

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeDateIndex: [moment(), moment().subtract(7, "days")],
      steps: 6,
      year: 2019,
      month: 10,
      date: 29,
      activeDates: [],
      startWith: "Wed",
      activeView: "default",
      fixRange: [],
      activeMouseEnter: false,
      invalid: true,
    };
  }

  componentDidMount() {
    const {
      date,
      steps,
      startWithDay,
      dateRange,
      only,
      type,
      visible,
      onDateClick,
    } = this.props;
    let invalid = false;
    if (!dateRange && dateRange.length === 0) {
      console.error("Prop \"dateRange\" is Required");
      invalid = true;
    }
    if (type !== "single" && dateRange.length !== 2) {
      console.error("Prop \"dateRange\" is Invalid");
      invalid = true;
    }
    if (visible === undefined) {
      console.error("Prop \"visible\" is Required");
      invalid = true;
    }
    if (type === "range" && steps === undefined) {
      console.error("Prop \"steps\" is Required");
      invalid = true;
    }
    if (type === "range" && startWithDay === undefined) {
      console.error("Prop \"startWithDay\" is Required");
      invalid = true;
    }
    if (!onDateClick) {
      console.error("Prop \"onDateClick\" is Required");
      invalid = true;
    }

    this.setState({ invalid });
    if (invalid) {
      return false;
    }
    const dateInMoment = moment(date);
    const month = dateInMoment.format("YYYY-MMM");
    const year = dateInMoment.format("YYYY");
    const day = dateInMoment.format("D");
    let activeDateIndex;
    if (type === "single") {
      activeDateIndex = [
        dateInMoment.clone().startOf("days"),
        dateInMoment.clone().endOf("days"),
      ];
    } else {
      activeDateIndex = dateRange.length ? dateRange.map((d) => moment(d)) : [];
    }
    this.setState({
      month,
      year,
      date: day,
      steps,
      startWith: startWithDay,
      activeDateIndex,
      activeView: only || "default",
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      const {
        visible,
        date,
        steps,
        startWithDay,
        dateRange,
        type,
      } = this.props;
      const dateInMoment = moment(dateRange[0]);
      const month = dateInMoment.format("YYYY-MMM");
      const year = dateInMoment.format("YYYY");
      const day = dateInMoment.format("D");
      let activeDateIndex;
      if (type === "single") {
        activeDateIndex = [
          dateInMoment.clone().startOf("days"),
          dateInMoment.clone().endOf("days"),
        ];
      } else {
        activeDateIndex = dateRange.length ? dateRange.map((d) => moment(d)) : [];
      }
      this.setState({
        month,
        year,
        date: day,
        steps,
        startWith: startWithDay,
        activeDateIndex,
      });
    }
    if (prevProps.visible !== this.props.visible) {
      this.setState({ activeView: this.props.only || "default" });
    }
  }

  handelChangeSelectedDate = (dateInMoment) => {
    const {
      steps, month, year, startWith, fixRange,
    } = this.state;
    const { type } = this.props;
    const activeDates = this.getMonths(month, year);
    let selectedDate;
    if (type === "single" || type === "free-range") {
      selectedDate = dateInMoment.clone();
    } else {
      selectedDate = dateInMoment.clone().day(startWith);
    }
    let activeDate = moment();
    activeDates.map((d, i) => {
      if (d.format("YYYY-MMM-D") === selectedDate.format("YYYY-MMM-D")) {
        activeDate = d;
      }
    });
    if (dateInMoment.clone().valueOf() < activeDate.valueOf()) {
      if (type === "single") {
        selectedDate = dateInMoment.clone().subtract(7, "days");
      } else {
        selectedDate = dateInMoment
          .clone()
          .subtract(7, "days")
          .day(startWith);
      }
      activeDate = moment();
      activeDates.map((d, i) => {
        if (d.format("YYYY-MMM-D") === selectedDate.format("YYYY-MMM-D")) {
          activeDate = d;
        }
      });
    }
    let activeDateIndex;
    if (type === "single") {
      activeDateIndex = [
        activeDate.clone().startOf("days"),
        activeDate.clone().endOf("days"),
      ];
      this.props.onDateClick(
        activeDateIndex[0].clone().toDate(),
        // activeDateIndex[1].clone()
      );
      this.setState({ activeDateIndex });
    } else if (type === "free-range") {
      if (fixRange.length) {
        const activeDateArray = [fixRange[0], activeDate.clone()];
        this.setState((pre) => ({
          ...pre,
          fixRange: [],
          activeDateIndex: activeDateArray,
          activeMouseEnter: false,
        }));
        this.props.onDateClick(
          activeDateArray[0].clone().toDate(),
          activeDateArray[1].clone().toDate(),
        );
        // this.setState({ activeDateIndex });
      } else {
        this.setState({ fixRange: [activeDate.clone()] });
      }
    } else {
      activeDateIndex = [
        activeDate.clone(),
        activeDate
          .clone()
          .add(steps, "day")
          .clone(),
      ];
      this.props.onDateClick(
        activeDateIndex[0].clone().toDate(),
        activeDateIndex[1].clone().toDate(),
      );
      this.setState({ activeDateIndex });
    }
  };

  getMonths = (month, year) => {
    let ar = [];
    let start = moment(`${year}-${month}`, "YYYY-MMM").startOf("weeks");
    let end = moment(`${year}-${month}`, "YYYY-MMM")
      .endOf("months")
      .endOf("weeks");
    let daysInDifference = end.diff(start, "days");
    for (let i = 0; i <= daysInDifference; i++) {
      ar.push(start.clone());
      start.add(1, "day");
    }
    return ar;
  };

  handelChangeArrows = (flag) => {
    const { month, year, activeView } = this.state;
    const flagActiveTabValue = activeView === "default" || activeView === "days"
      ? "months"
      : activeView === "month"
        ? "years"
        : 10;
    const no = flagActiveTabValue !== 10 ? 1 : 10;
    const type = flagActiveTabValue !== 10 ? flagActiveTabValue : "years";

    const date = flag
      ? moment(year + month, "YYYY-MMM").add(no, type)
      : moment(year + month, "YYYY-MMM").subtract(no, type);
    this.setState({
      month: date.clone().format("YYYY-MMM"),
      year: date.clone().format("YYYY"),
    });
  };

  handelUpdateFormate = () => {
    const { activeView } = this.state;
    const { only } = this.props;
    if (only) return false;
    let status = activeView === "default" || activeView === "days"
      ? "month"
      : activeView === "month"
        ? "year"
        : "year";
    this.setState({
      activeView: status,
    });
  };

  handelChangeMonth = (month) => {
    const { only } = this.props;
    if (only) return false;
    this.setState({ activeView: "days", month });
  };

  getYearsArray = (year) => {
    const years = [year];
    const date = moment(year, "YYYY");
    [...Array(11)].map((e, i) => {
      if (i > 5) {
        years.push(
          date
            .clone()
            .add(i - 5, "years")
            .format("YYYY"),
        );
      } else {
        years.push(
          date
            .clone()
            .subtract(i + 1, "years")
            .format("YYYY"),
        );
      }
    });
    return years.sort((a, b) => a - b);
  };

  getMonthsArray = () => [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  onMouseEnter = (e, date) => {
    const baseColor = this.props.hoverBackgroundColor || "#007bff";
    const fontColor = this.props.hoverFontColor || "#ffffff";
    e.currentTarget.style.backgroundColor = baseColor;
    e.currentTarget.style.color = fontColor;
    if (
      this.props.type === "free-range"
      && this.state.fixRange.length
      && date
    ) {
      this.setState({ activeMouseEnter: date });
    }
  };

  onMouseLeave = (e, flag, date) => {
    const baseColor = this.props.baseColor || "#007bff";
    const fontColor = this.props.fontColor || "#ffffff";

    if (flag) {
      e.currentTarget.style.backgroundColor = baseColor;
      e.currentTarget.style.color = fontColor;
    } else {
      e.currentTarget.style.backgroundColor = "#fff";
      e.currentTarget.style.color = "#000";
    }
  };

  render() {
    const {
      visible, only, type, dateRange,
    } = this.props;
    if (!visible) {
      return false;
    }
    if (this.state.invalid) {
      return false;
    }
    const {
      activeDateIndex: activeDateArray,
      month: monthObj,
      year,
      activeView,
      fixRange,
      activeMouseEnter,
    } = this.state;
    let activeDateIndex;
    if (type === "free-range" && fixRange.length && activeMouseEnter) {
      //
      activeDateIndex = [fixRange[0], activeMouseEnter];
    } else {
      //
      activeDateIndex = activeDateArray;
    }
    let maxSelected = activeDateIndex.sort((a, b) => b - a)[0].valueOf();
    let minSelected = activeDateIndex.sort((a, b) => a - b)[0].valueOf();
    const month = moment(monthObj, "YYYY-MMM").format("MMM");
    const activeDates = this.getMonths(month, year);
    const endOfMonth = moment(year + month, "YYYY-MMM")
      .endOf("months")
      .valueOf();
    const startOfMonth = moment(year + month, "YYYY-MMM")
      .startOf("months")
      .valueOf();
    const monthsArray = this.getMonthsArray();
    const years = this.getYearsArray(year);
    // colors
    const baseColor = this.props.baseColor || "#007bff";
    const fontColor = this.props.fontColor || "#fff";
    const disabledColor = this.props.disabledColor || "grey";
    const weekDaysColor = this.props.weekDaysColor || "#9c9c9c";
    const weekendsDaysColor = this.props.weekendsDaysColor || "#cfcfcf";
    const width = this.props.width || 340;
    const height = this.props.height || 340;

    return (
      <div className="calendar-container" style={{ width, height }}>
        <div
          className="calendar"
          style={{
            borderColor: baseColor,
            boxShadow: ` -1px 3px 8px -4px ${baseColor}`,
          }}
        >
          <div className="calendar-inner" style={{ height: "10%" }}>
            <div
              className="arrow"
              onClick={() => this.handelChangeArrows()}
              onMouseEnter={this.onMouseEnter}
              onMouseLeave={this.onMouseLeave}
            >
              <FontAwesomeIcon icon={faAngleLeft} />
            </div>
            <div
              className="calendar-inner-1"
              onClick={this.handelUpdateFormate}
              style={{ cursor: "pointer" }}
            >
              {activeView === "default" || activeView === "days"
                ? moment(year + month, "YYYY-MMM").format("MMMM")
                : activeView === "month"
                  ? moment(year + month, "YYYY-MMM").format("YYYY")
                  : `${years[0]} - ${years[years.length - 1]}`}
            </div>
            <div
              className="arrow"
              onMouseEnter={this.onMouseEnter}
              onMouseLeave={this.onMouseLeave}
              onClick={() => this.handelChangeArrows(true)}
            >
              <FontAwesomeIcon icon={faAngleRight} />
            </div>
          </div>
          {activeView === "default" || activeView === "days" ? (
            <div className="calendar-item" style={{ height: "90%" }}>
              {activeDates.slice(0, 7).map((element, i) => (
                <div
                  key={i}
                  style={{
                    width: `${100 / 7}%`,
                    backgroundColor:
                      i === 0 || i === 6 ? weekDaysColor : weekendsDaysColor,
                  }}
                  className="calendar-header-item"
                >
                  {element.format("ddd")}
                </div>
              ))}
              {activeDates.map((element, i) => {
                const activeDate = element.valueOf();
                return (
                  <div
                    key={i}
                    className="item"
                    style={
                      activeDate >= minSelected && activeDate <= maxSelected
                        ? {
                          backgroundColor: baseColor,
                          width: `${100 / 7}%`,
                          color: fontColor,
                        }
                        : {
                          width: `${100 / 7}%`,
                          // color: fontColor,
                          backgroundColor:
                            this.props.maxDate < element.format("x") ? "#aeaeae"
                              : activeDate > endOfMonth
                              || activeDate < startOfMonth
                                ? disabledColor
                                : "#fff",
                          cursor: this.props.maxDate < element.format("x") ? "default" : "pointer",
                        }
                    }
                    onClick={() => {
                      if (this.props.maxDate < element.format("x")) {
                        return;
                      }
                      activeDate <= endOfMonth
                      && activeDate >= startOfMonth
                      && this.handelChangeSelectedDate(element);
                    }
                    }
                    onMouseEnter={(e) => {
                      if (this.props.maxDate < element.format("x")) {
                        return;
                      }
                      activeDate <= endOfMonth
                      && activeDate >= startOfMonth
                      && this.onMouseEnter(e, element);
                    }
                    }
                    onMouseLeave={(e) => {
                      if (this.props.maxDate < element.format("x")) {
                        return;
                      }
                      return (activeDate <= endOfMonth && activeDate >= startOfMonth
                        ? activeDate >= minSelected && activeDate <= maxSelected
                          ? this.onMouseLeave(e, true)
                          : this.onMouseLeave(e)
                        : false);
                    }
                    }
                  >
                    {element.format("D")}
                  </div>
                );
              })}
            </div>
          ) : activeView === "month" ? (
            <div className="calendar-item-month">
              {monthsArray.map((item, i) => {
                const itemMonth = moment(`${year}-${item}`, "YYYY-MMM").format(
                  "YYYY-MMM",
                );
                const activeStartDate = moment(minSelected).format("YYYY-MMM");
                const activeEndDate = moment(maxSelected).format("YYYY-MMM");

                return (
                  <div
                    className="calendar-month-item"
                    key={i}
                    style={
                      itemMonth === activeStartDate
                      || itemMonth === activeEndDate
                        ? {
                          backgroundColor: baseColor,
                          color: fontColor,
                        }
                        : {}
                    }
                    onClick={() => this.handelChangeMonth(item)}
                    onMouseEnter={(e) => (itemMonth !== activeStartDate
                        || itemMonth !== activeEndDate)
                      && this.onMouseEnter(e)
                    }
                    onMouseLeave={(e) => (itemMonth === activeStartDate
                      || itemMonth === activeEndDate
                      ? this.onMouseLeave(e, true)
                      : this.onMouseLeave(e))
                    }
                  >
                    {item}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="calendar-item-month">
              {years.map((item, i) => {
                const activeStartDate = moment(minSelected).format("YYYY");
                const activeEndDate = moment(maxSelected).format("YYYY");

                return (
                  <div
                    className="calendar-header-item"
                    style={
                      item === activeStartDate || item === activeEndDate
                        ? {
                          width: `${100 / 5}%`,
                          backgroundColor: baseColor,
                          color: fontColor,
                        }
                        : {
                          width: `${100 / 5}%`,
                        }
                    }
                    key={i}
                    onClick={() => {
                      const { only } = this.props;
                      if (only) return false;
                      this.setState({ year: item, activeView: "month" });
                    }}
                    onMouseEnter={(e) => (item !== activeStartDate || item !== activeEndDate)
                      && this.onMouseEnter(e)
                    }
                    onMouseLeave={(e) => (item === activeStartDate || item === activeEndDate
                      ? this.onMouseLeave(e, true)
                      : this.onMouseLeave(e))
                    }
                  >
                    {item}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }
}
Calendar.propTypes = {
  // date: PropTypes.object.isRequired,
  // steps: PropTypes.number.isRequired.ma,
  steps: (props, propName, componentName) => {
    if (props[propName] < 0 || props[propName] > 30) {
      return new Error("Max Steps 30 is allowed");
    }
  },
  startWithDay: PropTypes.string,
  dateRange: PropTypes.arrayOf(PropTypes.object),
  visible: PropTypes.bool,
  onDateClick: PropTypes.func,
  only: PropTypes.string,
  baseColor: PropTypes.string,
  fontColor: PropTypes.string,
  hoverBackgroundColor: PropTypes.string,
  hoverFontColor: PropTypes.string,
  disabledColor: PropTypes.string,
  weekDaysColor: PropTypes.string,
  weekendsDaysColor: PropTypes.string,
  type: PropTypes.oneOf(["free-range", "single", "range"]),
  height: PropTypes.number,
  width: PropTypes.number,
  maxDate: PropTypes.number,
};

export default Calendar;
