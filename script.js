var userSignUpData = getData() ? [...getData()] : [];

function setData(data) {
  localStorage.setItem("SignUpData", JSON.stringify(data));
}

function getData() {
  return JSON.parse(localStorage.getItem("SignUpData"));
}

function submitData(e) {
  e.preventDefault();
  if (!signUpEmail.value && !signUpPassword.value && !signUpUsername.value) {
    return alert("Please Enter These Fields");
  }

  userSignUpData = [
    ...userSignUpData,
    {
      email: signUpEmail.value,
      password: signUpPassword.value,
      username: signUpUsername.value,
    },
  ];
  setData(userSignUpData);
  console.log(userSignUpData);
}

var signUpUsername = document.getElementById("signUpUsername");
var signUpPassword = document.getElementById("signUpPw");
var signUpEmail = document.getElementById("signUpEmail");
