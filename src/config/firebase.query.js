import firebase, { db } from "./firebase.config";

const getData = async (collection, docId) => {
  const data = await db.collection(collection).doc(docId.toString()).get();
  return { data: data.data().history.map((con) => ({ ...con, profileId: docId, names: [] })), docId };
};

export const getCollectionData = async (collection, docIdArray) => {
  try {
    await firebase.auth().signInAnonymously();
    return new Promise((resolve, reject) => {
      console.log("in promise");
      firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
          try {
            const data = await Promise.all((docIdArray.map((docId) => getData(collection, docId))));
            resolve(data);
          } catch (error) {
            reject(error);
          }
        } else {
          console.log("user is signed out");
          // User is signed out
          // ...
        }
      });
    });
  } catch (error) {
    console.log.apply(error);
  }
};
