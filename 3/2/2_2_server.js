const path = require("path");
const express = require("express");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {});

const stream_unity = {
  letter: "",
  number: "",
};

class Queue {
  constructor() {
    this.items = {};
    this.frontIndex = 0;
    this.backIndex = 0;
  }
  enqueue(item) {
    this.items[this.backIndex] = item;
    this.backIndex++;
    return item + " inserted";
  }
  dequeue() {
    const item = this.items[this.frontIndex];
    delete this.items[this.frontIndex];
    this.frontIndex++;
    return item;
  }
  peek() {
    return this.items[this.frontIndex];
  }
  get printQueue() {
    return this.items;
  }
}

io.sockets.on("connection", (socket) => {
  console.log("Успешное соединение");

  socket.emit("welcome", "welcome man");

  const letter_queue = new Queue();
  const number_queue = new Queue();

  socket.on("getLetter", (val) => {
    letter_queue.enqueue(val);
  });

  socket.on("getNumber", (val) => {
    console.log(val);
    number_queue.enqueue(val);
  });

  socket.on("disconnect", () => {
    console.log("disconnect", socket.username);
  });
  setInterval(() => {
    if (number_queue.peek() && letter_queue.peek()) {
      socket.emit("pair", letter_queue.dequeue() + number_queue.dequeue());
    }
  }, 1);
});

const PORT = 3022 || process.env.PORT;

server.listen(PORT, () => console.log("Server running on port " + PORT));
