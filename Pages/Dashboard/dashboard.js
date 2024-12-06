var DataCatcher = JSON.parse(localStorage.getItem("SignUpData"));
var h2 = document.getElementById("h2");

function dataRender() {
  for (let i in DataCatcher) {
    h2.innerText = "Welcome " + " " + DataCatcher[i].email;
    return;
  }
}

dataRender();
