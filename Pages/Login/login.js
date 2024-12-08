var DataCatcher = JSON.parse(localStorage.getItem("Users"));
var loggedIn;
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
      loggedIn = DataCatcher[i];
      console.log(loggedIn);
      localStorage.setItem("LoginUsers", JSON.stringify(loggedIn));
      window.location.replace("../Dashboard/dashboard.html");
      alert("Login Successful!");
    }
  }
}

var loginPassword = document.getElementById("loginUserPassword");
var loginEmail = document.getElementById("loginUserEmail");
