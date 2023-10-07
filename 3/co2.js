const path = require("path");
const express = require("express");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {});

io.sockets.on("connection", (socket) => {
  console.log("Успешное соединение");

  socket.emit("welcome", "welcome man");

  const handshake = socket.handshake.query;

  setInterval(() => {
    socket.emit("co2", Math.random() * (100 - 30) + 30);
  }, 1000);

  socket.on("disconnect", () => {
    console.log("disconnect", socket.username);
  });
});

const PORT = 3022 || process.env.PORT;

server.listen(PORT, () => console.log("Server running on port " + PORT));
