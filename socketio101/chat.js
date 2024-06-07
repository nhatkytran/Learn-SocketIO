const path = require("path");
const express = require("express");
const morgan = require("morgan");
const socketio = require("socket.io");

const app = express();

app.use(morgan("dev"));

app.use(express.static(path.join(__dirname, "public")));

const server = app.listen(3000, () => console.log("App running..."));

const io = socketio(server);

io.on("connection", (socket) => {
  console.log("Welcome to the server with socket ID:", socket.id);

  socket.on("newMessageFromClient", (data) => {
    console.log("Data received:", data);

    io.emit("newMessageToClients", data);
  });
});
