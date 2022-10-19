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
  io.emit("chat", `${socket.id} -> se conectó!`);
  console.log(`a client has connected -> id: ${socket.id}`);
  socket.on("chat", (msg) => {
    console.log(`message: ${msg}`);
    io.emit("chat", `${socket.id}: ${msg}`);
  });
  socket.on("disconnect", () => {
    io.emit("chat", `${socket.id} -> se desconectó!`);
    console.log(`a client has disconnected -> id: ${socket.id}`);
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
