const io = require("socket.io-client");
const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);

const URL = "http://localhost:3022";

const socket = io(URL);

socket
  .on("connect", () => {
    console.log("Подключен к серверу");
  })
  .on("stream", (data) => {
    console.log("Друзья пользователя с id " + data.uid + " : " + data.friends);
  });

setInterval(() => {
  for (let i = 0; i < 10; i++) {
    socket.emit("getFriends", Math.floor(Math.random() * (100 - 1) + 1));
  }
}, 10000);

const PORT = 3025 || process.env.PORT;

server.listen(PORT, () => console.log("Client running on port " + PORT));
