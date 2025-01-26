import {
  getAuth,
  signOut,
  onAuthStateChanged,
  auth,
  getDocs,
  collection,
  db,
  deleteUser,
} from "../../firebase.js";

var dataPasser = localStorage.getItem("user");
console.log(dataPasser);

let dataPicker = async () => {
  let usersData = [];
  const querySnapshot = await getDocs(collection(db, "users"));

  querySnapshot.forEach((doc) => {
    usersData.push(doc.data());
  });

  for (let i = 0; i < usersData.length; i++) {
    if (usersData[i].userId == dataPasser) {
      console.log(usersData[i]);
      email.innerText = "Email : " + usersData[i].email;
      name.innerText = "Name : " + usersData[i].name;
      gender.innerText = "gender: " + usersData[i].gender;
      city.innerText = "city : " + usersData[i].city;
    }
  }
};

function checkAuth() {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location.replace("../Login/login.html");
    } else {
      dataPicker();
    }
  });
}
checkAuth();

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
var logoutBtn = document.getElementById("logOut");
logoutBtn.addEventListener("click", UserRemover);

// let userDeleter = async () => {
//   try {
//     const auth = getAuth();
//     const user = auth.currentUser;
//     deleteUser(user).then(async () => {
//       await deleteDoc(doc(db, "user", user.uid));
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// var deleteBtn = document.getElementById("delete");
// deleteBtn.addEventListener("click", userDeleter);

var name = document.getElementById("name");
var city = document.getElementById("city");
var gender = document.getElementById("gender");
var email = document.getElementById("email");
