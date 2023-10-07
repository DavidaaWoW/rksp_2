const path = require("path");
const express = require("express");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {});

class UserFriend {
  constructor(id) {
    this.friends = [];
    this.id = id;
  }

  addFriend(id) {
    this.friends.push(id);
  }

  getId() {
    return this.id;
  }

  getFriends() {
    return this.friends;
  }
}

const getFriendsById = (id, friends) => {
  for (const friend of friends) {
    if (friend.getId() == id) {
      return friend.getFriends();
    }
  }
  return [];
};

io.sockets.on("connection", (socket) => {
  console.log("Успешное соединение");

  socket.emit("welcome", "welcome man");

  const users = 100;
  const friends = [];
  for (let i = 0; i < users; i++) {
    const user_friend = new UserFriend(i + 1);
    for (let j = 0; j < Math.floor(Math.random() * (100 - 1) + 1); j++) {
      user_friend.addFriend(Math.floor(Math.random() * (100 - 1) + 1));
    }
    friends.push(user_friend);
  }
  console.log(friends);

  socket.on("getFriends", (id) => {
    console.log(getFriendsById(id, friends));
    socket.emit("stream", { uid: id, friends: getFriendsById(id, friends) });
  });

  socket.on("disconnect", () => {
    console.log("disconnect", socket.username);
  });
});

const PORT = 3022 || process.env.PORT;

server.listen(PORT, () => console.log("Server running on port " + PORT));
