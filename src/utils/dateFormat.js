function dateFormat(date) {
  if (date === "0000-00-00 00:00:00") {
    return `${
      new Date().getDay() < 10 ? `0${new Date().getDay()}` : new Date().getDay()
    }/${
      new Date().getMonth() + 1 < 10
        ? `0${new Date().getMonth() + 1}`
        : new Date().getMonth() + 1
    }/${new Date().getFullYear()} 00:00`;
  }
  if (!date || new Date(date) == "Invalid Date") return "Invalid date";

  return `${
    new Date(date).getDay() < 10
      ? `0${new Date(date).getDay()}`
      : new Date(date).getDay()
  }/${
    new Date(date).getMonth() + 1 < 10
      ? `0${new Date(date).getMonth() + 1}`
      : new Date(date).getMonth() + 1
  }/${new Date(date).getFullYear()} ${new Date().getHours()}:${
    new Date(date).getMinutes() < 10
      ? `0${new Date(date).getMinutes()}`
      : new Date(date).getMinutes()
  }`;
}

export default dateFormat;
