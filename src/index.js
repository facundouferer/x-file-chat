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

var userCLiente = "";

io.on("connection", (socket) => {
  socket.on("user", (username) => {
    userCLiente = username;
    io.emit("chat", `${userCLiente} ist connected`);
    console.log(`${userCLiente} ist connected`);
  });

  socket.on("chat", (msg) => {
    console.log(`${userCLiente}: ${msg}`);
    io.emit("chat", `${userCLiente}: ${msg}`);
  });

  socket.on("disconnect", () => {
    io.emit("chat", `${userCLiente} has disconnected`);
    console.log(`${userCLiente} has disconnected`);
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
