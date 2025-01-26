import {
  signInWithEmailAndPassword,
  getAuth,
  app,
  auth,
  onAuthStateChanged,
} from "../../firebase.js";

let loginer = async (e) => {
  e.preventDefault();
  if (!loginEmail.value || !loginPassword.value) {
    alert("Please Enter These Fields");
    return;
  }

  await signInWithEmailAndPassword(auth, loginEmail.value, loginPassword.value)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      window.location.replace("../Dashboard/dashboard.html");
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("error aagaya ", errorMessage);
    });
};

let userChecker = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("User logged in:", user.uid);
      localStorage.setItem("user", user.uid);
      if (location.pathname !== "../Dashboard/dashboard.html") {
        window.location.replace("../Dashboard/dashboard.html");
      }
    } else {
      console.log("No user is logged in.");
    }
  });
};
userChecker();

var loginPassword = document.getElementById("loginUserPassword");
var loginEmail = document.getElementById("loginUserEmail");
var form = document.getElementById("form");
form.addEventListener("submit", function (event) {
  loginer(event);
});
