import firebase, { db } from "./firebase.config";

export const getCollectionData = async (collection, docId) => {
  try {
    await firebase.auth().signInAnonymously();
    return new Promise((resolve, reject) => {
      console.log("in promise");
      firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
          try {
            const data = await db.collection(collection).doc(docId).get();
            resolve(data.data());
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