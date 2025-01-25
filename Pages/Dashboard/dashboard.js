import {
  getAuth,
  signOut,
  onAuthStateChanged,
  app,
  auth,
} from "../../firebase.js";

function checkAuth() {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location.replace("../Login/login.html");
    }
  });
}

checkAuth();

let logoutBtn = document.getElementById("logOut");

logoutBtn.addEventListener("click", UserRemover);

function UserRemover() {
  signOut(auth)
    .then(() => {
      console.log("Sign-out successful.");
    })
    .catch((error) => {
      console.log(error);
    });
  window.location.replace("../Login/login.html");
}
