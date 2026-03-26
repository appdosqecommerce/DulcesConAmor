// 🔥 IMPORTS
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


// 🔥 CONFIG
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "dulcesconamor-1e9ad",
  storageBucket: "dulcesconamor-1e9ad.firebasestorage.app", // ✅ coma aquí
  messagingSenderId: "678245854576",
  appId: "1:678245854576:web:2648d01824868ac810f3b5",
  measurementId: "G-3M4LFBF2GL"
};


// 🔥 INICIALIZAR FIREBASE
const app = initializeApp(firebaseConfig);

// 🔥 SERVICIOS
const db = getFirestore(app);
const storage = getStorage(app, "gs://dulcesconamor-1e9ad.firebasestorage.app");


// 🔥 EXPORTS (CLAVE)
export {
  app, // 🔥 NECESARIO PARA AUTH
  db,
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  storage,
  ref,
  uploadBytes,
  getDownloadURL
};