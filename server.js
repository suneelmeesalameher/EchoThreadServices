// require("dotenv").config();
// const express = require("express");
// const uuid = require("uuid");
// const mongoose = require("mongoose");
// const WebSocket = require("ws");
// var usersRouter = require("./routes/users_routes");
// var chatRouter = require("./routes/chat_routes");

// const port = 6000;
// var app = express();

// app.use(express.json());
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*"); // You can specify the allowed origins here
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });
// app.use("/user", usersRouter);
// app.use("/chat", chatRouter);

// mongoose.set("strictQuery", false);
// mongoose
//   .connect(process.env.DB)
//   .then(() => {
//     app.listen(port, () => {
//       console.log(`Example app listening on port ${port}`);
//     });
//     console.log("DB CONNECTED");
//   })
//   .catch((err) => {
//     console.log(err);
//   });
require("dotenv").config();
const express = require("express");
const uuid = require("uuid");
const mongoose = require("mongoose");
const WebSocket = require("ws");
var usersRouter = require("./routes/users_routes");
var chatRouter = require("./routes/chat_routes");

const port = 6000;
var app = express();

app.use(express.json());
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
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Create a WebSocket server on the same HTTP server
const wss = new WebSocket.Server({ server });

// WebSocket connection handling
wss.on("connection", (ws) => {
  console.log("WebSocket client connected");

  // Handle WebSocket messages
  ws.on("message", (message) => {
    console.log(`Received message from WebSocket client: ${message}`);

    // Example: Broadcast the received message to all connected WebSocket clients
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  // Handle WebSocket client disconnection
  ws.on("close", () => {
    console.log("WebSocket client disconnected");
  });
});
