let socket = io();
const form = document.querySelector("form");
const input = document.querySelector("input");
const messages = document.querySelector("#messages");
const users = document.querySelector("#users");

if (!localStorage.getItem("user")) {
  const username = prompt("What is your name?");
  if (username === "" || username === null) {
    localStorage.setItem("user", "Anonymous");
  } else {
    localStorage.setItem("user", username);
  }
  localStorage.setItem("userConectectList", true);
}

socket.emit("user", localStorage.getItem("user"));

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value) {
    socket.emit("chat", input.value);
    input.value = "";
  }
});

input.addEventListener("keyup", (e) => {
  e.preventDefault();
  socket.emit("typing", e.target.value);
});

socket.on("chat", (msg) => {
  let li = document.createElement("li");
  li.innerHTML = `<li>${msg}</li>`;
  messages.appendChild(li);
  window.scrollTo(0, document.body.scrollHeight);
});

socket.on("usersOnline", (usersOnline) => {
  //list of conected users
  users.innerHTML = "";
  usersOnline.forEach((user) => {
    let li = document.createElement("li");
    li.innerHTML = `<li><a href="http://${user.id}">${user.username}</a></li>`;
    users.appendChild(li);
  });
});

function screenAdapter() {
  let width = window.innerWidth;
  const btnUsersConected = document.querySelector("#btnConnected");
  const connections = document.querySelector(".connections");

  if (width < 768) {
    localStorage.setItem("userConectectList", false);
    btnUsersConected.textContent = "Show";
    connections.classList.add("hiddenElement");
  } else {
    localStorage.setItem("userConectectList", true);
    btnUsersConected.textContent = "Hide";
  }

  btnUsersConected.addEventListener("click", () => {
    connections.classList.toggle("hiddenElement");
    let userConectectList = localStorage.getItem("userConectectList");
    if (userConectectList === "true") {
      localStorage.setItem("userConectectList", false);
      btnUsersConected.textContent = "Show";
    } else {
      localStorage.setItem("userConectectList", true);
      btnUsersConected.textContent = "Hide";
    }
  });
}

screenAdapter();
