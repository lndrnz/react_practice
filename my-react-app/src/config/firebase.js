// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDoc, getDocs, addDoc, doc, updateDoc, increment, onSnapshot, runTransaction } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHgfdxUmX6Py9uM7l-916Y8HQmewEfgMU",
  authDomain: "notes-7e540.firebaseapp.com",
  projectId: "notes-7e540",
  storageBucket: "notes-7e540.appspot.com",
  messagingSenderId: "381833080582",
  appId: "1:381833080582:web:385e956640b8ff7fe5f887",
  measurementId: "G-N8SQ7VB5XQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app)

export { db, collection, getDoc, getDocs, addDoc, doc, updateDoc, increment, onSnapshot, runTransaction };