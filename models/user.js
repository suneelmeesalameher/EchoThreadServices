const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: false,
    unique: true,
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // rsaKey: {
  //   type: String,
  // },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
