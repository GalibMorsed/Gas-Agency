// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import {
  getFirestore,
  setDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDe1NpBXiLXUQZ93qP89QcCSZxiisBlK-0",
  authDomain: "gas-agency-d03bf.firebaseapp.com",
  projectId: "gas-agency-d03bf",
  storageBucket: "gas-agency-d03bf.appspot.com",
  messagingSenderId: "232877539092",
  appId: "1:232877539092:web:60206f0a43be6856370c01",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function showMessage(message, divId) {
  var messageDiv = document.getElementById(divId);
  if (messageDiv) {
    messageDiv.innerHTML = message;
    messageDiv.classList.add("show");
    setTimeout(function () {
      messageDiv.classList.remove("show");
    }, 5000);
  } else {
    console.error(`Element with ID "${divId}" not found.`);
  }
}

const signUp = document.getElementById("btn");
signUp.addEventListener("click", (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  const auth = getAuth();
  const db = getFirestore();

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const userData = {
        email: email,
        name: name,
        confirmPassword: confirmPassword,
      };
      showMessage("Account Created Successfully", "signUpMessage");
      const docRef = doc(db, "users", user.uid);
      setDoc(docRef, userData)
        .then(() => {
          window.location.href = "/UserPage/logPage.html";
        })
        .catch((error) => {
          console.error("error writing document ", error);
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode == "auth/email-already-in-use") {
        showMessage("Email address Exists !!!", "signUpMessage");
      } else {
        showMessage("unable to create user", "signUpMessage");
      }
    });
});

const signIn = document.getElementById("btn");
signIn.addEventListener("click", (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const auth = getAuth();

  signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
    const user = userCredential.user;
    localStorage.setItem("loggedInUserId", user.uid);
    showMessage("Login is successful", "signInMessage");

    console.log("User ID stored:", localStorage.getItem("loggedInUserId"));
    window.location.href = "/UserPage/logPage.html";
  });
});
