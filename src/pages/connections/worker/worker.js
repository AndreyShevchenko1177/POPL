function uniqueObjectsInArray(a, key) {
  if (!a) return null;
  return [
    ...new Map(
      a.map((x) => [key(x), x]),
    ).values(),
  ];
}

const generationEngine = (randomArrayOfSymbols, maxSize) => {
  let id = "";
  for (let i = 0; i < randomArrayOfSymbols.length; i++) {
    let random = Number((Math.random() * maxSize).toFixed());
    id += randomArrayOfSymbols[random >= maxSize ? maxSize - 1 : random];
  }
  return id;
};

const getId = (keySize, customAlpabet) => {
  const alphabet = customAlpabet || "Aa1Bb2Cc3Dd4Ee5Ff6Gg7Hh8Ii9Jj0Kk1Ll2Mm3Nn4Oo5Pp6Qq7Rr8Ss9Tt0Uu1Vv2Ww3Xx4Yy5Zz9";
  const key_len = alphabet.length;
  const randomArrayOfSymbols = new Array(keySize).fill().map((item) => {
    const random = Number((Math.random() * key_len).toFixed());
    return alphabet[(random >= key_len ? key_len - 1 : random)];
  });
  return generationEngine(randomArrayOfSymbols, randomArrayOfSymbols.length);
};

const getYear = (d) => new Date(d).getFullYear();
const getMonth = (d) => new Date(d).getMonth();
const getDay = (d) => new Date(d).getDate();
const getHours = (d) => new Date(d).getHours();
const getMinutes = (d) => new Date(d).getMinutes();

const normalizeDate = (d) => (d <= 9 ? `0${d}` : d);

function dateFormat(date, isTime) {
  if (date === "0000-00-00 00:00:00") {
    return `${normalizeDate(
      getMonth(new Date()) + 1,
    )}/${normalizeDate(getDay(new Date()))}/${getYear(new Date())} ${isTime ? "00:00" : ""}`;
  }
  if (!date || new Date(date) == "Invalid Date") return "Invalid date";

  return `${normalizeDate(getMonth(date) + 1)}/${normalizeDate(
    getDay(date),
  )}/${getYear(date)} ${isTime ? `${normalizeDate(getHours(date))}:${normalizeDate(getMinutes(date))}` : ""}`;
}

function formatDateConnections(date) {
  const dateArray = [date.split(",")[1].split("/")[0].trim(), ...date.split(",")[1].split("/")[1].split(" ")];
  if (dateArray.length < 3) return dateFormat(`${dateArray.join("/")}/2020`);
  return dateFormat(dateArray.join("/"));
}

export function getFilteredConnections(args) {
  const { allConnections = [], profileName } = JSON.parse(args);
  const filteredConnections = uniqueObjectsInArray(allConnections
    .reduce((acc, item) => ([...acc, ...item.data]), []) // in allConnections we have array with profile id's. in each profile id placed array of connections related to this certain profile and we gathering it in one array
    .sort((a, b) => new Date(formatDateConnections(a.time)) - new Date(formatDateConnections(b.time))), // sorting by date. we have to set target date(in our case most recent) in the end of array not to delete it by removing duplicates
  (item) => item.id || item.email);
  (filteredConnections || []).forEach((con) => {
    const names = {};
    allConnections.forEach(({ data, docId }) => {
      data.forEach((el) => {
        if (!("noPopl" in el)) {
          if (el.id === con.id) {
            names[docId] = { ...profileName[docId], connected: el.time };
          }
        } else if (el.email === con.email) {
          names[docId] = { ...profileName[docId], connected: el.time };
        }
      });
    });
    con.names = names;
    con.customId = Number(getId(12, "1234567890"));
  });
  filteredConnections.sort((a, b) => new Date(formatDateConnections(b.time)) - new Date(formatDateConnections(a.time)));
  return filteredConnections;
}

export function getIdsObject(args) {
  const { allConnections = [], profileName } = JSON.parse(args);
  const idsObject = {}; // object with connections by profile id's without duplicated connections

  allConnections.forEach(({ data, docId }) => idsObject[docId] = uniqueObjectsInArray(data
    .map((d) => ({ ...d, customId: Number(getId(12, "1234567890")) }))
    .sort((a, b) => new Date(formatDateConnections(a.time)) - new Date(formatDateConnections(b.time))), // sorting by date. we have to set target date(in our case most recent) in the end of array not to delete it by removing duplicates
  (item) => item.id || item.email)); // removing duplicated connections for each certain profile connections array

  Object.values(idsObject).forEach((connections) => {
    connections.forEach((con) => {
      const names = {};
      allConnections.forEach(({ data, docId }) => {
        data.forEach((el) => {
          if (!("noPopl" in el)) {
            if (el.id === con.id) {
              names[docId] = { ...profileName[docId], connected: el.time };
            }
          } else if (el.email === con.email) {
            names[docId] = { ...profileName[docId], connected: el.time };
          }
        });
      });
      con.names = names;
    });
  });
  return idsObject;
}
