var DataCatcher = JSON.parse(localStorage.getItem("SignUpData"));
function loginUser(username, password) {
  this.username = username;
  this.password = password;
}

function submitData(e) {
  e.preventDefault();

  if (!loginEmail.value || !loginPassword.value) {
    alert("Please Enter These Fields");
    return;
  }

  for (let i = 0; i < DataCatcher.length; i++) {
    if (
      loginEmail.value === DataCatcher[i].email &&
      loginPassword.value === DataCatcher[i].password
    ) {
      window.location.replace("../Dashboard/dashboard.html");
      var loginUserData = new loginUser(
        DataCatcher[i].email,
        DataCatcher[i].password
      );
      localStorage.setItem("LoginUsers", JSON.stringify(loginUserData));
      alert("Login Successful!");
    }
  }
}

var loginPassword = document.getElementById("loginUserPassword");
var loginEmail = document.getElementById("loginUserEmail");
