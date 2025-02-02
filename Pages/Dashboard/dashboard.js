import {
  getAuth,
  signOut,
  onAuthStateChanged,
  auth,
  getDocs,
  collection,
  db,
  deleteUser,
  deleteDoc,
  doc,
} from "../../firebase.js";

var flag = false;

var dataPasser = localStorage.getItem("user");
var userCollection = localStorage.getItem("userCollection");

let dataPicker = async () => {
  let usersData = [];
  const querySnapshot = await getDocs(collection(db, "users"));

  querySnapshot.forEach((doc) => {
    usersData.push(doc.data());
  });

  for (let i = 0; i < usersData.length; i++) {
    if (usersData[i].userId == dataPasser) {
      email.innerText = "Email : " + usersData[i].email;
      name.innerText = "Name : " + usersData[i].name;
      gender.innerText = "gender: " + usersData[i].gender;
      city.innerText = "city : " + usersData[i].city;
      console.log(usersData);
    }
  }
};

function checkAuth() {
  onAuthStateChanged(auth, (user) => {
    if (!user && !flag) {
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

let userDeleter = async () => {
  await deleteDoc(doc(db, "users", userCollection)).then(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    deleteUser(user)
      .then(() => {
        console.log("user deleted", user);
        flag = true;
      })
      .catch((error) => {
        console.log("error", error);
      });
  });
};
var deleteBtn = document.getElementById("delete");
deleteBtn.addEventListener("click", userDeleter);

var name = document.getElementById("name");
var city = document.getElementById("city");
var gender = document.getElementById("gender");
var email = document.getElementById("email");
