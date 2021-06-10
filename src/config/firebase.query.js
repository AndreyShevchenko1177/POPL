/* eslint-disable import/no-webpack-loader-syntax */
import heicConvert from "heic-convert";
import worker from "workerize-loader!../worker";
import firebase from "./firebase.config";

let db = firebase.firestore();
db.enablePersistence({ synchronizeTabs: true }).catch((err) => console.log(err));

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
            console.log(error.toString());
            window.location.reload();
            // reject(error);
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

const heicToJpg = async (file) => {
  const buffer = await file.arrayBuffer();
  try {
    const outputBuffer = await heicConvert({
      buffer: Buffer.from(buffer), // the HEIC file buffer
      format: "JPEG", // output format
      quality: 1, // the jpeg compression quality, between 0 and 1
    });
    return outputBuffer;
  } catch (error) {
    console.log({ ...error });
  }
};

export const uploadImage = async (file, folderName) => {
  const [ext, ...name] = file.name.split("_");
  const outputData = {
    file,
    name: file.name,
  };
  let workerInstance = worker();

  if (ext.toLocaleLowerCase() === "heic" || ext.toLocaleLowerCase() === "heif") {
    console.log(`start convert ${ext} file to jpg`);
    return workerInstance.heicToJpg(file).then((outputBuffer) => {
      outputData.file = outputBuffer;
      console.log("end convert");
      outputData.name = `${name}.jpg`;
      const storageRef = firebase.storage().ref();
      const fileRef = storageRef.child(`${folderName || ""}/${outputData.name}`);
      return fileRef.put(outputData.file).then((res) => downloadFileFromFireBase(outputData.name, folderName));
      // return downloadFileFromFireBase(outputData.name, folderName);
    });
  }
  // let outputFile = file
  const storageRef = firebase.storage().ref();
  const fileRef = storageRef.child(`${folderName || ""}/${outputData.name}`);
  await fileRef.put(outputData.file);
  return downloadFileFromFireBase(outputData.name, folderName);
};
