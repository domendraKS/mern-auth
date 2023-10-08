// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "mern-authf.firebaseapp.com",
  projectId: "mern-authf",
  storageBucket: "mern-authf.appspot.com",
  messagingSenderId: "769789825145",
  appId: "1:769789825145:web:fc6d789a3744ab5fb184a8",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
