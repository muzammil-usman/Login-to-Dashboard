import {
  signOut,
  onAuthStateChanged,
  auth,
  db,
  getDocs,
  collection,
} from "../../firebase.js";

var flag = false;

var dataPasser = localStorage.getItem("user");
var allPostsDiv = document.getElementById("allPostsDiv");

function checkAuth() {
  onAuthStateChanged(auth, (user) => {
    if (!user && !flag) {
      window.location.replace("../Login/login.html");
    }
  });
}
checkAuth();

function UserRemover() {
  signOut(auth)
    .then(() => {
      console.log("Sign-out successful.");
    })
    .catch((error) => {
      console.log(error);
    });
  window.location.replace("../Login/login.html");
}
var logoutBtn = document.getElementById("logOut");
logoutBtn.addEventListener("click", UserRemover);

let displayPosts = async () => {
  let postData = [];
  const querySnapshot = await getDocs(collection(db, "posts"));

  querySnapshot.forEach((doc) => {
    postData.push(doc.data());
  });

  let postsHTML = "";

  postData.forEach((postDataItem) => {
    let name = postDataItem.name;
    let postTitle = postDataItem.postTitle;
    let postDescription = postDataItem.postDescription;

    let time;
    if (postDataItem.time) {
      let timestamp = postDataItem.time;
      let date = timestamp.seconds
        ? new Date(timestamp.seconds * 1000)
        : new Date(timestamp);
      time = date.toLocaleString();
    }

    postsHTML += `
      <div class="allPosts">
        <strong>${name}</strong>
        <p>${time}</p>
        <h3>${postTitle}</h3>
        <p>${postDescription}</p>
      </div>
    `;
  });

  let postsContainer = document.createElement("div");
  postsContainer.id = "postsContainer";
  main.appendChild(postsContainer);
  postsContainer.innerHTML = postsHTML;
};

displayPosts();

var main = document.getElementById("main-cont");
