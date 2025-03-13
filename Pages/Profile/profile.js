// sab cheezein firebase se import horahi hein
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

// localstorage se sara data idhar se uth raha hey
var dataPasser = localStorage.getItem("user");
var userCollection = localStorage.getItem("userCollection");
var pakarLiya = localStorage.getItem("docRef");
var myPostsDiv = document.getElementById("myPostsDiv");

// yeh function firestore se user wali collection se data utha kar UI mein show kara raha hey
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

// yeh function check karta hey keh user login hey ya nahi hey agar nahi hey tou login waley page par shift kardega
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

//yeh function user ko signout karta hey yai logout karta current runtime mein aur login waley page par phekta hey userko utha kar
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

// yeh function user ko delete karta hey real time authentication se bhi aur firestore se bhi
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

//div hey chota sa jo user ki details edit kartey waqt aayega aur user ka deta yahan se update hoga
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

//yeh function cancel button par laga howa hey jo sab kuch cancel kardeta hey
let cancelUpdate = () => {
  if (main.appendChild(editorDiv)) {
    main.removeChild(editorDiv);
  }
  if (main.appendChild(postEditorDiv)) {
    main.removeChild(postEditorDiv);
  }
  main.appendChild(mainCont);
  main.style.display = "block";
};

var cancelBtn = document.createElement("button");
cancelBtn.id = "cancelBtn";
cancelBtn.innerText = "X";
cancelBtn.addEventListener("click", cancelUpdate);

//yeh function gender check karega user ka keh khali tou nahi chor raha user
function genderChecker() {
  if (genderUpdater.selectedIndex === 0) {
    alert("Please Select Your Gender");
    return;
  }
  return genderUpdater.value;
}

let dataUpdated = async () => {
  if (nameUpdater.value.length < 3) {
    alert("updated name should be greater than 3 alphabets");
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
  if (!main.appendChild(postEditorDiv)) {
    main.appendChild(postEditorDiv);
  } else {
    postEditorDiv.appendChild(cancelBtn);
    postEditorDiv.appendChild(updatedPostTitle);
    postEditorDiv.appendChild(updatedPostDescription);
    postEditorDiv.appendChild(doneBtn);
    mainCont.remove();
  }
};

let postUpdated = async () => {
  if (updatedPostTitle.value.length < 3) {
    alert("post title should be greater than 3 alphabets");
    return;
  } else {
    await updateDoc(doc(db, "posts", pakarLiya), {
      postDescription: updatedPostDescription.value,
      name: postCreaterName,
      postTitle: updatedPostTitle.value,
    }).then(
      (updatedPostDescription.value = ""),
      (updatedPostTitle.value = ""),
      alert("Profile setting updated"),
      main.removeChild(postEditorDiv),
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

var updateYourCity = document.createElement("option");
updateYourCity.innerText = "update your city";
updateYourCity.setAttribute("hidden", "hidden");
updateYourCity.value = "";

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

cityUpdater.appendChild(updateYourCity);
cityUpdater.appendChild(islamabad);
cityUpdater.appendChild(karachi);
cityUpdater.appendChild(lahore);
cityUpdater.appendChild(sialkot);
cityUpdater.appendChild(faisalabad);

var time = new Date();

var updatedPostTitle = document.createElement("input");
updatedPostTitle.setAttribute("class", "inputer");
updatedPostTitle.setAttribute("placeholder", "Update post title...");

var postEditorDiv = document.createElement("div");
postEditorDiv.id = "postEditorDiv";

var updatedPostDescription = document.createElement("input");
updatedPostDescription.setAttribute("class", "inputer");
updatedPostDescription.setAttribute("placeholder", "Update post description");
