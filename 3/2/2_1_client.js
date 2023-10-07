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
    console.log("\n Квадрат числа " + data.source + " = " + data.square);
  });

setInterval(() => {
  for (let i = 0; i < 1000; i++) {
    socket.emit("getSquare", Math.random() * (100 - 1) + 1);
  }
}, 10000);

const PORT = 3025 || process.env.PORT;

server.listen(PORT, () => console.log("Client running on port " + PORT));
