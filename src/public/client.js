let socket = io();
const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const username = prompt("What is your name?");
localStorage.setItem("user", username);
socket.emit("user", username);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value) {
    socket.emit("chat", input.value);
    input.value = "";
  }
});

socket.on("chat", (msg) => {
  let li = document.createElement("li");
  li.textContent = msg;
  ul.appendChild(li);
  window.scrollTo(0, document.body.scrollHeight);
});
