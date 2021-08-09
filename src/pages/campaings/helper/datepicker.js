function DatePicker(date) {
  this.date = date;
  this.dayHours = [];

  this.setDate = (d) => {
    this.date = d;
  };

  this.getMonth = () => this.date.getMonth() + 1;

  this.getYear = () => this.date.getFullYear();

  this.setMonth = () => new Date(`${this.getMonth()}-01-${this.getYear()}`).getTime();

  this.getDate = (value) => value.getDate();

  this.generateDayHours = () => {
    const amHours = [];
    const pmHours = [];
    for (let i = 0; i < 12; i++) {
      if (i === 0) {
        amHours.push({ label: "12 AM", id: `${12}AM`, dateMilis: i * 3600000 });
      } else {
        amHours.push({ label: `${i} AM`, id: `${i}AM`, dateMilis: i * 3600000 });
      }
    }
    for (let i = 0; i < 12; i++) {
      if (i === 11) {
        pmHours.unshift({ label: `${i + 1} PM`, id: `${i + 1}PM`, dateMilis: 12 * 3600000 });
      } else {
        pmHours.push({ label: `${i + 1} PM`, id: `${i + 1}PM`, dateMilis: (i + 13) * 3600000 });
      }
    }
    // .map(({ dateMilis }) => new Date(new Date().setHours(0, 0, 0, 0) + dateMilis))
    return [...amHours, ...pmHours];
  };

  this.generateMonth = () => {
    let day = this.setMonth() - 86400000;
    return () => day += 86400000;
  };
  this.getWeekDay = (day) => {
    let weekDay = null;
    switch (day) {
    case 0: weekDay = "SUN";
      break;
    case 1: weekDay = "MON";
      break;
    case 2: weekDay = "TUE";
      break;
    case 3: weekDay = "WED";
      break;
    case 4: weekDay = "THU";
      break;
    case 5: weekDay = "FRI";
      break;
    case 6: weekDay = "SAT";
      break;
    default: return weekDay;
    }
    return weekDay;
  };

  this.getMonthName = (index) => {
    const months = [
      { fullLabel: "", shortLabel: "" },
      { fullLabel: "January", shortLabel: "Jan" },
      { fullLabel: "February", shortLabel: "Feb" },
      { fullLabel: "March", shortLabel: "Mar" },
      { fullLabel: "April", shortLabel: "Apr" },
      { fullLabel: "May", shortLabel: "May" },
      { fullLabel: "June", shortLabel: "Jun" },
      { fullLabel: "July", shortLabel: "Jul" },
      { fullLabel: "August", shortLabel: "Aug" },
      { fullLabel: "September", shortLabel: "Sep" },
      { fullLabel: "October", shortLabel: "Oct" },
      { fullLabel: "November", shortLabel: "Nov" },
      { fullLabel: "December", shortLabel: "Dec" },
    ];
    return months[index];
  };

  this.removeDublicate = (state) => {
    const result = [];
    const map = new Map();
    for (const item of state) {
      if (!map.has(item.day)) {
        map.set(item.day, true);
        result.push({
          ...item,
        });
      }
    }
    return result;
  };

  this.generateDays = (n = 31) => {
    const arrayMonth = this.generateMonth();
    const days = this.generateMonth();
    const arrayDates = [];
    while (arrayDates.length <= n) {
      const day = correctDate(new Date(arrayMonth()));
      arrayDates.push({
        date: day,
        weekDay: this.getWeekDay(new Date(day).getDay()),
        day: this.getDate(new Date(days())),
      });
    }
    return this.removeDublicate(arrayDates);
  };

  this.generateFullYear = (monthNumber, year = this.getYear()) => {
    const result = [];
    let mn = this.getMonth();
    for (let i = 0; i < monthNumber; i++) {
      if (monthNumber === 12) this.setDate(new Date(`${year}-0${i + 1}-01`));
      else {
        this.setDate(new Date(`${year}-${mn - i}-01`));
      }
      result.push({ monthName: this.getMonthName(this.getMonth() - 1), id: i, days: this.generateDays() });
    }
    this.setDate(new Date());
    return monthNumber === 12 ? result : result.reverse();
  };

  this.generateWeek = (currentDay) => {
    const week = [];
    let mil = 0;
    for (let i = 0; i < 7; i++) {
      const day = correctDate(new Date(currentDay + mil));
      week.push(
        {
          date: day,
          weekDay: this.getWeekDay(new Date(currentDay + mil).getDay()),
          day: this.getDate(new Date(currentDay + mil)),
        },
      );
      mil += 86400000;
    }
    return week;
  };
}

const getNormalizeDate = (date) => {
  if (date) return `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;

  return date;
};

export const correctDate = (value) => {
  if (getNormalizeDate(value)) return getNormalizeDate(value).split("-").map((d) => (d.length < 2 ? `0${d}` : d)).join("-");
  return "";
};

export const datePicker = new DatePicker(new Date());

export default DatePicker;
