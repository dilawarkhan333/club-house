import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/database';
const firebaseConfig = {
  apiKey: "AIzaSyBnq5Y6HaOVgVlMOfJ2OuvJliFN_7f7Rww",
  authDomain: "club-house-3fa46.firebaseapp.com",
  projectId: "club-house-3fa46",
  storageBucket: "club-house-3fa46.appspot.com",
  messagingSenderId: "703253170867",
  appId: "1:703253170867:web:646762525ab7a4a7647ec6"
};

const app = firebase.initializeApp(firebaseConfig);
export default app