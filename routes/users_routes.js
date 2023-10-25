var express = require("express");
var router = express.Router();
const uuid = require("uuid");
var User = require("../models/user");

/* GET users listing. */
router.get("/", async (req, res) => {
  try {
    const Users = await User.find();
    res.json(Users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/*Create users */
router.post("/", async (req, res) => {
  const users = await User({
    userId: uuid.v1(),
    emailId: req.body.emailId,
    password: req.body.password,
  });
  try {
    const newUser = await users.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
