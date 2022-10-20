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

io.on("connection", (socket) => {
  socket.on("user", (username) => {
    io.emit("chat", `${username} ist connected`);

    console.log(`${username} ist connected`);

    socket.on("chat", (msg) => {
      console.log(`${username}: ${msg}`);
      io.emit("chat", `<span>${username}:</span> ${msg}`);
    });

    socket.on("disconnect", () => {
      io.emit("chat", `${username} has disconnected`);
      console.log(`${username} has disconnected`);
    });

    socket.on("typing", (msg) => {
      console.log(`${username} is typing`);
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
