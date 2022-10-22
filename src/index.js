import express from "express";
import * as http from "http";
import { Server } from "socket.io";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { Socket } from "dgram";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(join(__dirname, "public")));

//array of users with id
let usersOnline = [];

io.on("connection", (socket) => {
  socket.on("user", (username) => {
    usersOnline.push({ username: username, id: socket.id });
    io.emit("chat", `<span>${username} is conecting </span>`);
    console.log(`${username} ist connected`);

    io.emit("usersOnline", usersOnline);

    socket.on("chat", (msg) => {
      console.log(`${username}: ${msg}`);
      io.emit("chat", `${username}: ${msg}`);
    });

    socket.on("disconnect", () => {
      usersOnline = usersOnline.filter(
        (usersOnline) => usersOnline.id !== socket.id
      );
      io.emit("chat", `<strong>${username} has disconnected </strong>`);
      console.log(`${username} has disconnected`);
      io.emit("usersOnline", usersOnline);
    });
  });
});

const port = process.env.PORT || 3000;

console.log(join(__dirname, "public"));

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});
