var DataCatcher = JSON.parse(localStorage.getItem("Users"));
var DataCatcher2 = JSON.parse(localStorage.getItem("LoginUsers"));
var h2 = document.getElementById("h2");

function DataDisplay() {
  h2.innerText = DataCatcher2.email;
}
DataDisplay();

function UserRemover() {
  localStorage.removeItem("LoginUsers");
  window.location.replace("../Login/login.html");
  return;
}
