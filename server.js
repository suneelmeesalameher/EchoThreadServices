require("dotenv").config();
const express = require("express");
const uuid = require("uuid");
const mongoose = require("mongoose");
var usersRouter = require("./routes/users_routes");

const port = 6000;
var app = express();

app.use(express.json());
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
