require("dotenv").config();
const express = require("express");
const uuid = require("uuid");
const mongoose = require("mongoose");
var usersRouter = require("./routes/users_routes");

const port = 6000;
var app = express();

app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // You can specify the allowed origins here
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use("/user", usersRouter);

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.DB)
  .then(() => {
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
    console.log("DB CONNECTED");
  })
  .catch((err) => {
    console.log(err);
  });
