import { getAuth, signOut } from "../../firebase.js";

// var DataCatcher2 = JSON.parse(localStorage.getItem("LoginUsers"));
// var h2 = document.getElementById("h2");

// h2.innerText = DataCatcher2.name;

// function DataDisplay() {
//   for (let i = 0; DataCatcher2.length; i++) {
//     h2.innerText = DataCatcher2[i].name;
//     break;
//   }
// }
// DataDisplay();
const auth = getAuth();

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
