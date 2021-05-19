import firebase, { db } from "./firebase.config";

const getData = async (db, collection, docId) => {
  const data = await db.collection(collection).doc(docId.toString()).get();
  return { data: data.data()?.history.map((con) => ({ ...con, profileId: docId, names: {} })) || [], docId };
};

export const getCollectionData = async (collection, docIdArray) => {
  try {
    await firebase.auth().signInAnonymously();
    return new Promise((resolve, reject) => {
      console.log("in promise");
      firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
          try {
            const data = await Promise.all((docIdArray.map((docId) => getData(db, collection, docId))));
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

const downloadFileFromFireBase = (fileName, folderName) => {
  try {
    const storageRef = firebase.storage().ref();
    return storageRef.child(`${folderName || ""}/${fileName}`).getDownloadURL();
  } catch (error) {
    return error;
  }
};

export const uploadImage = async (file, folderName) => {
  const storageRef = firebase.storage().ref();
  const fileRef = storageRef.child(`${folderName || ""}/${file.name}`);
  await fileRef.put(file);
  return downloadFileFromFireBase(file.name, folderName);
};
