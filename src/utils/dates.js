export const getYear = (d) => new Date(d).getFullYear();
export const getMonth = (d) => new Date(d).getMonth();
export const getDay = (d) => new Date(d).getDate();

export const normalizeDate = (d) => (d <= 9 ? `0${d}` : d);
