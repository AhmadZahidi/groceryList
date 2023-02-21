// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword, signOut,
  onAuthStateChanged
} from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGcNzBXnP93fopv7DaZMsZfTObNsE-4k4",
  authDomain: "grocerylist-cec21.firebaseapp.com",
  projectId: "grocerylist-cec21",
  storageBucket: "grocerylist-cec21.appspot.com",
  messagingSenderId: "654686257789",
  appId: "1:654686257789:web:982cc4514813dddee9a714",
  authDomain: "grocerylist-cec21.firebaseapp.com",
  databaseURL: "https://grocerylist-cec21-default-rtdb.asia-southeast1.firebasedatabase.app",
  
};

// Initialize Firebase
const app=initializeApp(firebaseConfig);

export const auth = getAuth();

export const firestore = getFirestore(app);

export const db = getDatabase(app);

// export { app };
