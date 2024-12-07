var DataCatcher = JSON.parse(localStorage.getItem("SignUpData"));
var h2 = document.getElementById("h2");

function UserRemover() {
  localStorage.removeItem("LoginUsers");
  window.location.replace("../Login/login.html");
  return;
}
