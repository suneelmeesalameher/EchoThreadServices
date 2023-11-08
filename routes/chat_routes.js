var express = require("express");
var router = express.Router();
const uuid = require("uuid");
var Chat = require("../models/chat");
var User = require("../models/user");
var SharedKey = require("../models/key");
//var verifyToken = require("../token");

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
      const addUserAsFriendToFriend = await Chat.findOne({
        emailId: friends,
      });
      const sharedKeyUser = await SharedKey.findOne({
        emailId: req.body.emailId,
      });
      const sharedKeyFriend = await SharedKey.findOne({
        emailId: friends,
      });
      const userKey = {
        friend: friends,
        key: req.body.key,
        iv: req.body.iv,
      };
      const friendKey = {
        friend: req.body.emailId,
        key: req.body.key,
        iv: req.body.iv,
      };
      if (existingChat) {
        if (existingChat.friends.includes(friends)) {
          res.status(400).json({ message: "Already friends" });
        } else {
          // If the document exists, update the friends array
          existingChat.friends.push(friends);
          sharedKeyUser.friends.push(userKey);
          sharedKeyFriend.friends.push(friendKey);
          addUserAsFriendToFriend.friends.push(req.body.emailId);
          // Save the updated document
          const updatedChat = await existingChat.save();
          await sharedKeyUser.save();
          await sharedKeyFriend.save();
          await addUserAsFriendToFriend.save();

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
  //var RsaKey = [];
  try {
    const Chats = await Chat.findOne({ emailId: req.params.emailId });
    const sharedKey = await SharedKey.findOne({
      emailId: req.params.emailId,
    });
    const Users = await User.findOne({
      emailId: req.params.emailId,
    });
    // Chats.friends.forEach(async (element) => {
    //   const friendData = await User.findOne({
    //     emailId: element,
    //   });
    //   friendRsaKey.push(friendData);
    // });

    const promises = Chats.friends.map(async (element) => {
      const friendData = await User.findOne({ emailId: element });
      return {
        friends: friendData.emailId,
        rsaKey: friendData.rsaKey,
      };
    });

    const RsaKey = await Promise.all(promises);

    res.json({
      userRsaKey: Users.rsaKey,
      data: {
        friends: Chats.friends,
      },
      key: sharedKey.friends,
      friendRsaKey: RsaKey,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//**Get chat data */
router.get("/:emailId/:friend", async (req, res) => {
  try {
    const Chats = await Chat.findOne({ emailId: req.params.emailId });
    var chatDataRecieved = Chats.recieved;
    var chatDataSent = Chats.sent;
    var datarecieved = [];
    var datasent = [];
    chatDataRecieved.forEach((element) => {
      if (element.friends == req.params.friend) {
        //console.log(element);
        var data = {
          friends: req.params.friend,
          chat: element.chat,
          timestamp: element.timestamp,
        };
        datarecieved.push(data);
      }
    });
    chatDataSent.forEach((element) => {
      if (element.friends == req.params.friend) {
        var data = {
          friends: req.params.emailId,
          chat: element.chat,
          timestamp: element.timestamp,
        };
        datasent.push(data);
      }
    });
    res.json({ recieved: datarecieved, sent: datasent });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//**sending message from user end */
router.post("/friend", async (req, res) => {
  try {
    const userChats = await Chat.findOne({ emailId: req.body.emailId });
    const friendChats = await Chat.findOne({ emailId: req.body.friends });
    var sent = req.body.message;
    const currentTimestamp = Date.now();
    //console.log("Current timestamp:", currentTimestamp);
    var userData = {
      friends: req.body.friends,
      chat: sent,
      timestamp: currentTimestamp,
    };
    var friendData = {
      friends: req.body.emailId,
      chat: sent,
      timestamp: currentTimestamp,
    };

    userChats.sent.push(userData);
    friendChats.recieved.push(friendData);
    await userChats.save();
    await friendChats.save();
    res.status(201).json(userChats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
