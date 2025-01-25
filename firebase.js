import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-analytics.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyALpR2a_8scEDIsR1GfwV3nBDUV08ddfEk",
  authDomain: "signup-login-to-dashboard.firebaseapp.com",
  projectId: "signup-login-to-dashboard",
  storageBucket: "signup-login-to-dashboard.firebasestorage.app",
  messagingSenderId: "271698937578",
  appId: "1:271698937578:web:a65c2a1f352d028cfef993",
  measurementId: "G-FT11VYYD7L",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);

const auth = getAuth(app);

export {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  setDoc,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  app,
  db,
  signOut,
  auth,
};
