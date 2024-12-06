var userSignUpData = getData() ? [...getData()] : [];
var DataCatcher = JSON.parse(localStorage.getItem("SignUpData"));

// if (DataCatcher) {
//   window.location.replace("Pages/Dashboard/dashboard.html");
// }

function setData(data) {
  localStorage.setItem("SignUpData", JSON.stringify(data));
}

function getData() {
  return JSON.parse(localStorage.getItem("SignUpData"));
}

function submitData(e) {
  e.preventDefault();
  if (
    !signUpEmail.value ||
    !signUpPassword.value ||
    !signUpUsername.value ||
    !signUpName.value
  ) {
    alert("Please Enter These Fields");
    return;
  }

  if (DataCatcher) {
    for (let i = 0; i < DataCatcher.length; i++) {
      if (DataCatcher[i].email === signUpEmail.value) {
        alert("Email Already Exist");
        return;
      } else {
        userSignUpData = [
          ...userSignUpData,
          {
            name: signUpName.value,
            email: signUpEmail.value,
            password: signUpPassword.value,
            username: signUpUsername.value,
          },
        ];
        setData(userSignUpData);
        window.location.replace("Pages/Dashboard/dashboard.html");
        return;
      }
    }
  } else {
    window.location.replace("Pages/Dashboard/dashboard.html");
    userSignUpData = [
      ...userSignUpData,
      {
        name: signUpName.value,
        email: signUpEmail.value,
        password: signUpPassword.value,
        username: signUpUsername.value,
      },
    ];
    setData(userSignUpData);
  }
}

var signUpUsername = document.getElementById("signUpUsername");
var signUpPassword = document.getElementById("signUpPw");
var signUpEmail = document.getElementById("signUpEmail");
var signUpName = document.getElementById("signUpName");
