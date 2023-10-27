var express = require("express");
var router = express.Router();
const uuid = require("uuid");
var Chat = require("../models/chat");
var User = require("../models/user");

/**Post - save user friend */
router.post("/save", async (req, res) => {
  const friends = req.body.friends;
  //   Wont require the bottom part as the search api is gonna send the users list that are present
  //   try {
  //     const Users = await User.findOne({ friends });
  //     //res.json(Users);
  //   } catch (err) {
  //     res.status(500).json({ message: err.message });
  //   }
  if (friends !== req.body.emailId) {
    try {
      // First, find the existing Chat document based on userId and emailId
      const existingChat = await Chat.findOne({
        emailId: req.body.emailId,
      });

      if (existingChat) {
        if (existingChat.friends.includes(friends)) {
          res.status(400).json({ message: "Already friends" });
        } else {
          // If the document exists, update the friends array
          existingChat.friends.push(friends);

          // Save the updated document
          const updatedChat = await existingChat.save();

          res.status(201).json(updatedChat);
        }
      } else {
        // If the document doesn't exist, create a new one
        const newChat = new Chat({
          userId: req.body.userId,
          emailId: req.body.emailId,
          friends: [friends], // Create a new array with the friend
        });

        const savedChat = await newChat.save();
        res.status(201).json(savedChat);
      }
    } catch (err) {
      res.status(500).json({ error: "Error" });
    }
  } else {
    res.status(400).json({ message: "Cant add yourself" });
  }
});

/**Get - all user friends */
router.get("/:emailId", async (req, res) => {
  try {
    const Chats = await Chat.findOne({ emailId: req.params.emailId });
    res.json({
      data: {
        friends: Chats.friends,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
