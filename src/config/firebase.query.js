import firebase from "./firebase.config";

let db = firebase.firestore();
db.enablePersistence({ synchronizeTabs: true });

const getData = async (db, collection, docId) => {
  const data = await db.collection(collection).doc(docId.toString()).get("server");
  return { data: data.data()?.history.map((con) => ({ ...con, profileId: docId, names: {} })) || [], docId };
};

export const getCollectionData = async (collection, docIdArray) => {
  try {
    await firebase.auth().signInAnonymously();
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
          try {
            const data = await Promise.all((docIdArray.map((docId) => getData(db, collection, docId))));
            resolve(data);
          } catch (error) {
            console.log(error, error.includes("client is offline"), error?.message.includes("client is offline"));
            db = firebase.firestore();
            db.enablePersistence({ synchronizeTabs: true });
            getCollectionData(collection, docIdArray);
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
    console.log(error);
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
