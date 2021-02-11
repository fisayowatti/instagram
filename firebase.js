import firebase from "firebase/app";
import "firebase/auth";
// import 'firebase/firestore';
// import 'firebase/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEcMsWGkAIyQyIPkxW9-Nj0VdZUYe1LsE",
  authDomain: "instagram-13e9f.firebaseapp.com",
  projectId: "instagram-13e9f",
  storageBucket: "instagram-13e9f.appspot.com",
  messagingSenderId: "937141985175",
  appId: "1:937141985175:web:0faf57aa890bb33a2b6ed2",
  measurementId: "G-4HHTBGED76",
};

const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
// export const firestore = app.firestore();
// export const storage = app.storage();
