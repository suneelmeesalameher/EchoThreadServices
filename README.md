# EchoThreadServices

Back-end API's for Friendly web chat application("EchoThread").
start using 'node server.js'.

USER APIS-

  Get users-
    https://echothread.onrender.com/user

  Search bar--
    Get user-
      https://echothread.onrender.com/user/:emailId

  Create User-
    Post user-
      https://echothread.onrender.com/user
      req.body = {
        "emailId" : "xxxx@xxx.com",
        "password" : "password"
      }

  Login User-
      Post user-
      https://echothread.onrender.com/user/login
        req.body = {
          "emailId" : "xxxx@xxx.com",
          "password" : "password"
        }
      
CHAT APIS-

  Get users friends-
    http://localhost:6000/chat/:emailId

  Post for Adding friends-
    http://localhost:6000/chat/save
    Body=
    {
      "emailId": "meher@gmail.com",
      "friends" : "mehe@gmail.com"
    }


  Get chat between two friends-
    http://localhost:6000/chat/:emailId/:friend

  Post for sending a message to a friend-
    http://localhost:6000/chat/friend
    req.body={
      "emailId" : "sun@gmail.com",
      "friends":"ved@gmail.com",
      "message" : "hello bro"
    }
