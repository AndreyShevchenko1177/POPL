import firebase from "firebase";

const config = {
  apiKey: "AIzaSyCFY3BojPYmqXOzIiKh7___cT2Xe1vY38Q",
  authDomain: "poplco.firebaseapp.com",
  databaseURL: "https://poplco.firebaseio.com",
  projectId: "poplco",
  storageBucket: "poplco.appspot.com",
  messagingSenderId: "1016915496422",
  appId: "1:1016915496422:web:36a6c71b52a16fa2ceda27",
  measurementId: "G-38RXN89B96",
};
firebase.initializeApp(config);
firebase.firestore().enablePersistence();
// firebase.auth().signInAnonymously();
export const db = firebase.firestore();

export default firebase;
