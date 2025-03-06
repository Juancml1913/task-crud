// lib/firebase.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAes9WrvA9Qp8YJRB0K30cbtLJsq-QLMwo",
  authDomain: "task-crud-baef1.firebaseapp.com",
  projectId: "task-crud-baef1",
  storageBucket: "task-crud-baef1.firebasestorage.app",
  messagingSenderId: "245866290942",
  appId: "1:245866290942:web:fcdacf9843685710c18faf",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
