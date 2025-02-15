import {
  getAuth,
  signOut,
  onAuthStateChanged,
  auth,
  getDocs,
  collection,
  db,
  deleteUser,
  deleteDoc,
  doc,
  updateDoc,
  addDoc,
  query,
  where,
} from "../../firebase.js";

var flag = false;
var postCreaterName;

var dataPasser = localStorage.getItem("user");
var userCollection = localStorage.getItem("userCollection");
var pakarLiya = localStorage.getItem("docRef");
var myPostsDiv = document.getElementById("myPostsDiv");

let dataPicker = async () => {
  let usersData = [];
  const querySnapshot = await getDocs(collection(db, "users"));

  querySnapshot.forEach((doc) => {
    usersData.push(doc.data());
  });

  for (let i = 0; i < usersData.length; i++) {
    if (usersData[i].userId == dataPasser) {
      email.innerText = "Email : " + usersData[i].email;
      name.innerText = "Name : " + usersData[i].name;
      gender.innerText = "gender: " + usersData[i].gender;
      city.innerText = "city : " + usersData[i].city;
    }
  }
};

function checkAuth() {
  onAuthStateChanged(auth, (user) => {
    if (!user && !flag) {
      window.location.replace("../Login/login.html");
    } else {
      dataPicker();
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

let userDeleter = async () => {
  await deleteDoc(doc(db, "users", userCollection)).then(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    deleteUser(user)
      .then(() => {
        console.log("user deleted", user);
        flag = true;
      })
      .catch((error) => {
        console.log("error", error);
      });
  });
};

var deleteBtn = document.getElementById("delete");
deleteBtn.addEventListener("click", userDeleter);

let editor = (e) => {
  main.removeChild(mainCont);
  main.style.display = "flex";
  main.style.alignItems = "center";
  editorDiv.appendChild(cancelBtn);
  editorDiv.appendChild(nameUpdater);
  editorDiv.appendChild(genderUpdater);
  editorDiv.appendChild(cityUpdater);
  editorDiv.appendChild(saveBtn);
  main.appendChild(editorDiv);
};

var editBtn = document.getElementById("edit");
editBtn.addEventListener("click", function (event) {
  editor(event);
});

let cancelUpdate = () => {
  main.removeChild(editorDiv);
  main.appendChild(mainCont);
  main.style.display = "block";
};

var cancelBtn = document.createElement("button");
cancelBtn.id = "cancelBtn";
cancelBtn.innerText = "X";
cancelBtn.addEventListener("click", cancelUpdate);

function genderChecker() {
  if (genderUpdater.selectedIndex === 0) {
    alert("Please Select Your Gender");
    return;
  }
  return genderUpdater.value;
}

let dataUpdated = async () => {
  if (nameUpdater.value.length < 3) {
    alert("Name should be greater than 3 alphabets");
    return;
  } else {
    const washingtonRef = doc(db, "users", userCollection);
    postCreaterName = nameUpdater.value;
    await updateDoc(washingtonRef, {
      city: cityUpdater.value,
      name: nameUpdater.value,
      gender: genderChecker(),
    }).then(
      (cityUpdater.value = ""),
      (nameUpdater.value = ""),
      (genderUpdater.value = ""),
      alert("Profile setting updated"),
      dataPicker(),
      main.removeChild(editorDiv),
      main.appendChild(mainCont),
      (main.style.display = "block")
    );

    const p = query(
      collection(db, "posts"),
      where("userUid", "==", dataPasser)
    );
    const snapshot = await getDocs(p);

    for (const doc of snapshot.docs) {
      await updateDoc(doc.ref, {
        name: postCreaterName,
      });
    }
  }
};

var saveBtn = document.createElement("button");
saveBtn.innerText = "Save";
saveBtn.addEventListener("click", dataUpdated);

let updatePost = async (post_id) => {
  localStorage.setItem("docRef", post_id);
  main.style.display = "flex";
  main.style.alignItems = "center";
  editorDiv.appendChild(cancelBtn);
  editorDiv.appendChild(nameUpdater);
  // editorDiv.appendChild(updatedPostTitle);
  nameUpdater.setAttribute("placeholder", "update post title...");
  editorDiv.appendChild(doneBtn);
  main.appendChild(editorDiv);
  mainCont.remove();
};

let postUpdated = async () => {
  if (nameUpdater.value.length < 3) {
    alert("Name should be greater than 3 alphabets");
    return;
  } else {
    await updateDoc(doc(db, "posts", pakarLiya), {
      postDescription: updatedPostTitle.value,
      name: postCreaterName,
      postTitle: nameUpdater.value,
    }).then(
      (nameUpdater.value = ""),
      (updatedPostTitle = ""),
      alert("Profile setting updated"),
      main.removeChild(editorDiv),
      main.appendChild(mainCont),
      (main.style.display = "block"),
      myPostGetter()
    );
  }
};

var doneBtn = document.createElement("button");
doneBtn.innerText = "Done";
doneBtn.addEventListener("click", postUpdated);

let deletePost = async (post_id) => {
  try {
    await deleteDoc(doc(db, "posts", post_id)).then(() => {
      console.log("post deleted");
    });
  } catch (error) {
    console.error(error);
  }
};

let myPostGetter = async () => {
  try {
    const q = query(collection(db, "users"), where("userId", "==", dataPasser));
    const querySnapshot = await getDocs(q);
    myPostsDiv.innerHTML = "";
    querySnapshot.forEach((doc) => {
      postCreaterName = doc.data().name;
    });

    const u = query(
      collection(db, "posts"),
      where("userUid", "==", dataPasser)
    );
    const Snapshot = await getDocs(u);
    Snapshot.forEach((doc) => {
      let postData = doc.data();
      let postTitle = postData.postTitle || "Untitled";
      let postText = postData.postDescription;
      let timestamp = postData.time;
      let postDate = timestamp
        ? new Date(timestamp.seconds * 1000).toLocaleString()
        : "Unknown Date";

      myPostsDiv.innerHTML += `
      <div class="myPosts">
        <h3>${postCreaterName}</h3>
        <small>${postDate}</small>
        <h2>${postTitle}</h2>
        <p>${postText}</p>
        <div>
        <button id='${doc.id}' class='update-btn'>Edit</button>
        <button id='${doc.id}' class='delete-btn'>Delete</button>
        </div>
      </div>
    `;
      document.addEventListener("click", (event) => {
        if (event.target.classList.contains("update-btn")) {
          let postId = event.target.id; // Get the post ID
          updatePost(postId);
        }
      });
    });
  } catch (error) {
    console.log(error);
  }
};
myPostGetter();

let postCreater = async () => {
  if (!postTitle.value || !postDescription.value) {
    alert("You have to filled both fields to publish post");
    return;
  } else {
    const docRef = await addDoc(collection(db, "posts"), {
      postTitle: postTitle.value,
      postDescription: postDescription.value,
      userUid: dataPasser,
      time: time,
      name: postCreaterName,
    }).then(
      ((postTitle.value = ""), (postDescription.value = ""), myPostGetter())
    );
  }
};

var postTitle = document.getElementById("postTitle");
var postDescription = document.getElementById("description");
var createPostBtn = document.getElementById("createPost");

createPostBtn.addEventListener("click", postCreater);

var name = document.getElementById("name");
var city = document.getElementById("city");
var gender = document.getElementById("gender");
var email = document.getElementById("email");
var main = document.getElementById("main");
var mainCont = document.getElementById("main-cont");

var editorDiv = document.createElement("div");
editorDiv.id = "editorDiv";

var nameUpdater = document.createElement("input");
nameUpdater.setAttribute("class", "inputer");
nameUpdater.setAttribute("placeholder", "update your name");
nameUpdater.setAttribute("type", "text");
nameUpdater.setAttribute(
  "oninput",
  "this.value = this.value.replace(/[^a-zA-Z ]/g, '')"
);

var genderUpdater = document.createElement("select");

var updateYourGender = document.createElement("option");
updateYourGender.innerText = "update your gender";
updateYourGender.setAttribute("hidden", "hidden");
updateYourGender.value = "";

var male = document.createElement("option");
male.setAttribute("value", "male");
male.innerText = "Male";

var female = document.createElement("option");
female.setAttribute("value", "female");
female.innerText = "female";

genderUpdater.appendChild(updateYourGender);
genderUpdater.appendChild(male);
genderUpdater.appendChild(female);
genderUpdater.setAttribute("class", "inputer");
genderUpdater.setAttribute("placeholder", "update your gender");

var cityUpdater = document.createElement("select");
cityUpdater.setAttribute("class", "inputer");
cityUpdater.setAttribute("placeholder", "update your city");

var updateYourGender = document.createElement("option");
updateYourGender.innerText = "update your Gender";
updateYourGender.setAttribute("hidden", "hidden");
updateYourGender.value = "";

var islamabad = document.createElement("option");
islamabad.value = "islamabad";
islamabad.innerText = "Islamabad";

var karachi = document.createElement("option");
karachi.value = "Karachi";
karachi.innerText = "Karachi";

var lahore = document.createElement("option");
lahore.value = "lahore";
lahore.innerText = "lahore";

var sialkot = document.createElement("option");
sialkot.value = "sialkot";
sialkot.innerText = "sialkot";

var faisalabad = document.createElement("option");
faisalabad.value = "faisalabad";
faisalabad.innerText = "faisalabad";

cityUpdater.appendChild(updateYourGender);
cityUpdater.appendChild(islamabad);
cityUpdater.appendChild(karachi);
cityUpdater.appendChild(lahore);
cityUpdater.appendChild(sialkot);
cityUpdater.appendChild(faisalabad);

var time = new Date();

var updatedPostTitle = document.createElement("input");
updatedPostTitle.setAttribute("class", "inputer");
updatedPostTitle.setAttribute("placeholder", "Update post description...");
