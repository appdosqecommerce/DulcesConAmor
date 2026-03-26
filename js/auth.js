import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } 
from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";

import { app } from "./firebase.js"; // 🔥 IMPORTANTE

const auth = getAuth(app);

// 🔐 LOGIN
window.login = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = "admin.html";
  } catch (e) {
    alert("Error: " + e.message);
  }
};

// 🔒 LOGOUT
window.logout = function () {
  signOut(auth);
};

// 🔍 PROTEGER ADMIN
window.proteger = function () {
  onAuthStateChanged(auth, user => {
    if (!user) {
      window.location.href = "login.html";
    }
  });
};