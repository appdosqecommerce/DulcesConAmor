// 🔥 IMPORTS CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";

import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/12.11.0/firebase-storage.js";


// 🔥 CONFIG (la tuya)
const firebaseConfig = {
  apiKey: "AIzaSyAcOHr6ptMyn5dQoqtdmi6FRK4meg6kdzg",
  authDomain: "dulcesconamor-1e9ad.firebaseapp.com",
  projectId: "dulcesconamor-1e9ad",
  storageBucket: "dulcesconamor-1e9ad.firebasestorage.app",
  messagingSenderId: "678245854576",
  appId: "1:678245854576:web:2648d01824868ac810f3b5"
};


// 🔥 INIT
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ⚠️ IMPORTANTE (lo que arregla tu CORS también)
const storage = getStorage(app, "gs://dulcesconamor-1e9ad.firebasestorage.app");


// 🔥 EXPORTS
export {
  db,
  storage,
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  ref,
  uploadBytes,
  getDownloadURL,
  app
};