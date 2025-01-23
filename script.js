import {
  app,
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
  db,
} from "./firebase.js";

const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    // if (location.pathname !== "Pages/Dashboard/dashboard.html") {
    window.location.replace("Pages/Dashboard/dashboard.html");
    // }
  }
});

function submitData(e) {
  e.preventDefault();
  if (
    !signUpEmail.value ||
    !signUpPassword.value ||
    !signUpUsername.value ||
    !signUpName.value ||
    !gender ||
    !selectCity.value
  ) {
    alert("Please Enter These Fields");
    return;
  }
  if (signUpPassword.value !== confirmPw.value) {
    alert("Your Passwords not matched");
    return;
  } else {
    dataPusher();
  }
}

let dataPusher = async () => {
  await createUserWithEmailAndPassword(
    auth,
    signUpEmail.value,
    signUpPassword.value
  )
    .then((userCredential) => {
      const user = userCredential.user;
    })
    .catch((error) => {
      alert(error);
      return;
    });
  if (createUserWithEmailAndPassword) {
    const docRef = await addDoc(collection(db, "users"), {
      email: signUpEmail.value,
      password: signUpPassword.value,
      city: cityChecker(),
      name: signUpName.value,
      gender: genderChecker(),
      username: signUpUsername.value,
    });
    window.location.replace("Pages/Dashboard/dashboard.html");
  }
};

function cityChecker() {
  if (selectCity.selectedIndex === 0) {
    alert("Please Select City");
  }
  return selectCity.value;
}

function genderChecker() {
  for (let i = 0; i < gender.length; i++) {
    if (gender[i].checked == true) {
      return gender[i].value;
    }
  }
}
// if (DataCatcher) {
//   for (let i = 0; i < DataCatcher.length; i++) {
//     if (DataCatcher[i].email === signUpEmail.value) {
//       alert("Email Already Exist");
//       return;
//     }
//   }
// } else {
// let dataPusher = (username, name, email, password, gender, city) => {

// };
// } else {
//   window.location.replace("Pages/Dashboard/dashboard.html");
//   userSignUpData = [
//     ...userSignUpData,
//     {
//       name: signUpName.value,
//       email: signUpEmail.value,
//       password: signUpPassword.value,
//       username: signUpUsername.value,
//       gender: genderChecker(),
//       city: cityChecker(),
//     },
//   ];
//   setData(userSignUpData);
//   setLoginData(userSignUpData);
// }
//   }
//   userSignUpData = [
//     ...userSignUpData,
//     {
//       name: signUpName.value,
//       email: signUpEmail.value,
//       password: signUpPassword.value,
//       username: signUpUsername.value,
//       gender: genderChecker(),
//       city: cityChecker(),
//     },
//   ];
//   loginData = [
//     ...loginData,
//     {
//       name: signUpName.value,
//       email: signUpEmail.value,
//       password: signUpPassword.value,
//       username: signUpUsername.value,
//       gender: genderChecker(),
//       city: cityChecker(),
//     },
//   ];
//   setData(userSignUpData);
//   setLoginData(loginData);
//   window.location.replace("Pages/Dashboard/dashboard.html");

var signUpUsername = document.getElementById("signUpUsername");
var signUpPassword = document.getElementById("signUpPw");
var signUpEmail = document.getElementById("signUpEmail");
var signUpName = document.getElementById("signUpName");
let gender = document.getElementsByName("gender");
let selectCity = document.getElementById("selectCity");
var confirmPw = document.getElementById("signUpConfirmPw");
var form = document.getElementById("form");
form.addEventListener("submit", function (event) {
  submitData(event);
});
