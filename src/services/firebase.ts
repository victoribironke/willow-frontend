import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDv0DZjH4HLJQtfGQvRqu0y409MiLr_d4s",
  authDomain: "valse-5d7fe.firebaseapp.com",
  projectId: "valse-5d7fe",
  storageBucket: "valse-5d7fe.firebasestorage.app",
  messagingSenderId: "1074193207302",
  appId: "1:1074193207302:web:e6a21bfb3f718ce5ab7387",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
