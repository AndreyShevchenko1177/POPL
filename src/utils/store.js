import localforage from "localforage";

export const store = localforage.createInstance({
  driver: localforage.INDEXEDDB, // Force WebSQL; same as using setDriver()
  name: "popl",
  version: `{${process.env.REACT_APP_NAME}`,
});
