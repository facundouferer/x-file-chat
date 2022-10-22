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
