function dateFormat(date) {
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
