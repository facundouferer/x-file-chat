import express from "express";
import * as http from "http";
import { Server } from "socket.io";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

const server = http.createServer(app);

app.use(express.static(join(__dirname, "public")));

console.log(join(__dirname, "public"));

server.listen(3000, () => {
  console.log("Server running on port 3000");
});

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});
