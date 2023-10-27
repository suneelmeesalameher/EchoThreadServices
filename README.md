# EchoThreadServices

Back-end API's for Friendly web chat application("EchoThread").
start using 'node server.js'.


Get users-
  https://echothread.onrender.com/user

Search bar--
  Get user-
    https://echothread.onrender.com/{:emailId}


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
