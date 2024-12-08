var userSignUpData = getData() ? [...getData()] : [];
var DataCatcher = JSON.parse(localStorage.getItem("Users"));
var LoginDataHolder = JSON.parse(localStorage.getItem("LoginUsers"));

if (LoginDataHolder) {
  window.location.replace("Pages/Dashboard/dashboard.html");
}

function setData(data) {
  localStorage.setItem("Users", JSON.stringify(data));
}
function setLoginData(data) {
  localStorage.setItem("LoginUsers", JSON.stringify(data));
}

function getData() {
  return JSON.parse(localStorage.getItem("Users"));
}

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
    alert("PW not matched");
    return;
  }
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
            gender: genderChecker(),
            city: cityChecker(),
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
        gender: genderChecker(),
        city: cityChecker(),
      },
    ];
    setData(userSignUpData);
    setLoginData(userSignUpData);
  }
}

var signUpUsername = document.getElementById("signUpUsername");
var signUpPassword = document.getElementById("signUpPw");
var signUpEmail = document.getElementById("signUpEmail");
var signUpName = document.getElementById("signUpName");
let gender = document.getElementsByName("gender");
let selectCity = document.getElementById("selectCity");
var confirmPw = document.getElementById("signUpConfirmPw");
