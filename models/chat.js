const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
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
  friends: {
    type: Array,
  },
  recieved: {
    type: Array,
  },
  sent: {
    type: Array,
  },
});

const Chat = mongoose.model("chats", chatSchema);

module.exports = Chat;
