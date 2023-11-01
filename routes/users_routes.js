var express = require("express");
require("dotenv").config();
const crypto = require("crypto");
//const jwt = require("jsonwebtoken");
var router = express.Router();
const uuid = require("uuid");
var User = require("../models/user");
var Chat = require("../models/chat");
const { stringify } = require("querystring");

//const secretKey = process.env.secretKey;
/* GET users listing. */
router.get("/", async (req, res) => {
  try {
    const Users = await User.find();
    res.json(Users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* GET search users. */
//give emailId here
router.get("/:emailId", async (req, res) => {
  try {
    const Users = await User.find({ emailId: { $regex: req.params.emailId } });
    res.json(Users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/*POST Create users */
router.post("/", async (req, res) => {
  const userId = uuid.v1();
  var password = req.body.password;
  const buffer = uuid.v1();
  const salt = buffer.substring(0, 10);
  //console.log("\n salt", salt);
  const hash = crypto.createHash("sha256");
  //console.log("password with salt", password.concat(salt));
  hash.update(password.concat(salt));
  const hashedData = hash.digest("hex").toString();
  //console.log("\n hashedData", hashedData);
  password = hashedData.concat(salt);
  //console.log("\n password", password);
  const users = await User({
    userId: userId,
    emailId: req.body.emailId,
    password: password,
  });
  const chats = await Chat({
    userId: userId,
    emailId: req.body.emailId,
    friends: [],
    recieved: [],
    chat: [],
  });
  try {
    const newUser = await users.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: "Email must be unique" });
  }
  try {
    await chats.save();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**Login */
router.post("/login", async (req, res) => {
  try {
    emailId = req.body.emailId;
    password = req.body.password;
    const Users = await User.findOne({ emailId });
    if (!Users) {
      return res.status(404).json({ error: "User not found" });
    }
    var uP = Users.password.toString();
    //console.log("uP", Users.password);
    var salt = uP.slice(-10);
    //console.log("\n salt", salt);
    const saltedPassword = password.concat(salt);
    //console.log("\n saltedPassword", saltedPassword);
    const hash = crypto.createHash("sha256");
    hash.update(saltedPassword);
    const hashedData = hash.digest("hex");
    //console.log("\n hashedData", hashedData);
    var hashedPasswordWithSalt = hashedData.concat(salt);
    //console.log("\n hashedPasswordWithSalt", hashedPasswordWithSalt);
    if (Users.password !== hashedPasswordWithSalt) {
      return res.status(401).json({ error: "Incorrect password" });
    }
    // // Generate a JWT token after successful login
    // const token = jwt.sign({ userId: Users.userId, emailId }, secretKey, {
    //   expiresIn: "1h",
    // });

    res.json({
      message: "Login successful",
      data: {
        userId: Users.userId,
        emailId: emailId,
        token: token,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
