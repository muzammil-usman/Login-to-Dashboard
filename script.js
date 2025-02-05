var flag = true;

import {
  setDoc,
  collection,
  addDoc,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  db,
  auth,
  GoogleAuthProvider,
  signInWithPopup,
  provider,
  getDoc,
  doc,
} from "./firebase.js";

async function submitData(e) {
  e.preventDefault();
  if (
    !signUpEmail.value ||
    !signUpPassword.value ||
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
  try {
    flag = false;
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      signUpEmail.value,
      signUpPassword.value
    );

    const user = userCredential.user;

    const docRef = await addDoc(collection(db, "users"), {
      email: signUpEmail.value,
      city: cityChecker(),
      name: signUpName.value,
      gender: genderChecker(),
      userId: user.uid,
    });

    localStorage.setItem("user", user.uid);
    localStorage.setItem("userCollection", docRef.id);

    console.log("Firestore mein data successfully add ho gaya:", docRef.id);
    flag = true;

    window.location.replace("Pages/Dashboard/dashboard.html");
  } catch (error) {
    console.error("Error during signup or Firestore operation:", error.message);
    alert(error.message);
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

let googleUsers = async (e) => {
  e.preventDefault();
  flag = false;
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      console.log("User already exists!");
      window.location.replace("Pages/Dashboard/dashboard.html");
      return;
    } else {
      await setDoc(userRef, {
        email: user.email,
        name: user.displayName,
        userId: user.uid,
      });
      console.log("User Firestore mein add hogaya!");
    }

    localStorage.setItem("user", user.uid);
    localStorage.setItem("userCollection", user.uid);
    flag = true;
    window.location.replace("Pages/Dashboard/dashboard.html");
  } catch (error) {
    console.error("Google Sign-in error:", error.message);
  }
};

let userChecker = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("User logged in:", user.uid);
      if (flag) {
        if (location.pathname !== "/Pages/Dashboard/dashboard.html") {
          window.location.replace("Pages/Dashboard/dashboard.html");
        }
      }
    } else {
      console.log("No user is logged in.");
    }
  });
};
userChecker();

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
var googleBtn = document.getElementById("googleBtn");
googleBtn.addEventListener("click", function (event) {
  googleUsers(event);
});
