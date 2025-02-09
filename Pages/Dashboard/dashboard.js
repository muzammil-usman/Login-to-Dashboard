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
  for (let i = 0; i < postData.length; i++) {
    let post = document.createElement("div");
    post.setAttribute("class", "allPosts");
    let userName = document.createElement("strong");
    userName.innerText = "username nikaalna nahi aaraha yaar";
    let time = document.createElement("p");
    if (postData[i].time) {
      let timestamp = postData[i].time;
      let date;
      if (typeof timestamp === "object" && timestamp.seconds) {
        date = new Date(timestamp.seconds * 1000);
      } else {
        date = new Date(timestamp);
      }
      time.innerText = date.toLocaleString();
    }

    let postTitle = document.createElement("h2");
    postTitle.innerText = postData[i].postTitle;

    let postDes = document.createElement("p");
    postDes.innerText = postData[i].postDescription;

    post.appendChild(userName);
    post.appendChild(time);
    post.appendChild(postTitle);
    post.appendChild(postDes);
    main.appendChild(post);
    console.log(postData);
  }
};
displayPosts();

var main = document.getElementById("main-cont");
