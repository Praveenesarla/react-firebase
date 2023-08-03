// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider,} from 'firebase/auth'
import { getFirestore } from "firebase/firestore"; 
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyCzGIKgBVCNpr2lSh8RPdK61jkpyYGoKWs",
  authDomain: "fir-8c164.firebaseapp.com",
  projectId: "fir-8c164",
  storageBucket: "fir-8c164.appspot.com",
  messagingSenderId: "738282099297",
  appId: "1:738282099297:web:5fec04639028f71ae0d020",
  measurementId: "G-MY1TK99Z72"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app)
export const storage = getStorage(app)

