import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA-YH6zRsMgbSVFxE_I25vjYvKnmo246To",
  authDomain: "alefast-9806f.firebaseapp.com",
  projectId: "alefast-9806f",
  storageBucket: "alefast-9806f.appspot.com",
  messagingSenderId: "140682582534",
  appId: "1:140682582534:web:1fcf1ed79896ddd4134187",
  measurementId: "G-H7BME37J2V",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
