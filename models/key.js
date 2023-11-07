const mongoose = require("mongoose");

const sharedKeySchema = new mongoose.Schema({
  emailId: {
    type: String,
    required: true,
    unique: true,
  },
  friends: {
    type: Array,
  },
  iv: {
    type: Array,
  },
});

const sharedKey = mongoose.model("sharedKey", sharedKeySchema);

module.exports = sharedKey;
