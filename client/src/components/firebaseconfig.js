import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/database';
import {getFirestore} from 'firebase/firestore';
import { getStorage } from "firebase/storage";



const firebaseConfig = {
  apiKey: "AIzaSyBnq5Y6HaOVgVlMOfJ2OuvJliFN_7f7Rww",
  authDomain: "club-house-3fa46.firebaseapp.com",
  databaseURL: "https://club-house-3fa46-default-rtdb.firebaseio.com",
  projectId: "club-house-3fa46",
  storageBucket: "club-house-3fa46.appspot.com",
  messagingSenderId: "703253170867",
  appId: "1:703253170867:web:646762525ab7a4a7647ec6"
};

const app = firebase.initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const database = getAuth(app);
export default app