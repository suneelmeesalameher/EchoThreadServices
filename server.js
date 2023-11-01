require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
//const socketIo = require("socket.io");
const { Server } = require("socket.io");
const cors = require("cors");
const usersRouter = require("./routes/users_routes");
const chatRouter = require("./routes/chat_routes");

const port = 6000;
const app = express();

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use("/user", usersRouter);
app.use("/chat", chatRouter);

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch((err) => {
    console.log(err);
  });

// Create an HTTP server using Express
const server = http.createServer(app);

// // Create a socket.io server on the same HTTP server
// const io = socketIo(server);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// server.listen(6001, () => {
//   console.log("SERVER IS RUNNING");
// });

// // Socket.io connection handling
// io.on("connection", (socket) => {
//   console.log("Socket.io client connected");

//   // Handle socket.io messages
//   socket.on("message", (message) => {
//     console.log(`Received message from socket.io client: ${message}`);

//     // Example: Broadcast the received message to all connected socket.io clients
//     socket.broadcast.emit("message", message);
//   });

//   // Handle socket.io client disconnection
//   socket.on("disconnect", () => {
//     console.log("Socket.io client disconnected");
//   });
// });

// Start the HTTP server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
