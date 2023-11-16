# EchoThreadServices

Back-end API's for Friendly web chat application("EchoThread").
start using 'node server.js'.

USER APIS-

  Get users-
    https://echothread.onrender.com/key1@gmail.com
    o/p-
    [
    {
        "_id": "654b0150531bfba6587ee556",
        "userId": "73aeffb0-7de7-11ee-97fe-636ddfdb0a8e",
        "emailId": "key1@gmail.com",
        "password": "b49e3368c0b0ca8515ef77b11af5fcc849f82108d1e98dce1b512c72893e874a73aeffb1-7",
        "rsaKey": "rsa",
        "__v": 0
    }
]

Search bar--
    Get user-
      https://echothread.onrender.com/user/:emailId
      o/p-
[
    {
    "_id": "654b0150531bfba6587ee556",
        "userId": "73aeffb0-7de7-11ee-97fe-636ddfdb0a8e",
        "emailId": "key1@gmail.com",
        "password": "b49e3368c0b0ca8515ef77b11af5fcc849f82108d1e98dce1b512c72893e874a73aeffb1-7",
        "rsaKey": "rsa",
        "__v": 0
    }
]

Create User-
Post user-
https://echothread.onrender.com/user
      req.body = 
{
    "emailId": "user122@gmail.com",
    "password": "key",
    "rsaKey": "rsa1",
    "dsPublicKey": "ds"
}
o/p-
{
    "userId": "fb476f10-84af-11ee-85f2-f385d3065936",
    "emailId": "user122@gmail.com",
    "password": "f787f5b063ef0bd5f690d906843088aa08d810bac3daf7ad409f73c50a5d4b73fb476f11-8",
    "rsaKey": "rsa1",
    "dsPublicKey": "ds",
    "_id": "655662bab4a093320d99f267",
    "__v": 0
}

Login User-
Post user-
https://echothread.onrender.com/user/login
req.body = {
          "emailId" : "xxxx@xxx.com",
          "password" : "password"
}
o/p-
{
    "message": "Login successful",
    "data": {
        "userId": "73aeffb0-7de7-11ee-97fe-636ddfdb0a8e",
        "emailId": "key1@gmail.com"
    }
}
      
CHAT APIS-

Get users friends-
http://localhost:6000/chat/:emailId
o/p-
{
    "userRsaKey": "rsa1",
    "data": {
        "friends": [
            "user122@gmail.com"
        ]
    },
    "key": [
        {
            "friend": "user122@gmail.com",
            "key": "key",
            "iv": "iv"
        }
    ],
    "friendRsaKey": [
        {
            "friends": "user122@gmail.com",
            "rsaKey": "rsa1"
        }
    ],
    "dsPublicKey": [
        {
            "friends": "user122@gmail.com",
            "dsPublicKey": "ds"
        }
    ]
}

Post for Adding friends-
http://localhost:6000/chat/save
body=
{
    "emailId": "key1@gmail.com",
    "friends" : "key3@gmail.com",
    "key": "key",
    "iv": "iv"
}
o/p-
{
    "_id": "654b0150531bfba6587ee557",
    "userId": "73aeffb0-7de7-11ee-97fe-636ddfdb0a8e",
    "emailId": "key1@gmail.com",
    "friends": [
        "key2@gmail.com",
        "key3@gmail.com"
    ],
    "recieved": [],
    "sent": [],
    "__v": 2
}

Get chat between two friends-
http://localhost:6000/chat/:emailId/:friend
o/p-
{
    "recieved": [],
    "sent": [
        {
            "friends": "key1@gmail.com",
            "chat": "hello",
            "timestamp": 1699415626776
        }
    ]
}

Post for sending a message to a friend-
    http://localhost:6000/chat/friend
    req.body=
{
    "emailId": "user121@gmail.com",
    "friends": "user122@gmail.com",
    "message": "hello",
    "dsValue": "dsvalue"
}
o/p-
{
    "_id": "65566248b4a093320d99f261",
    "userId": "b72766a0-84af-11ee-85f2-f385d3065936",
    "emailId": "user121@gmail.com",
    "friends": [],
    "recieved": [],
    "sent": [
        {
            "friends": "user122@gmail.com",
            "chat": "hello",
            "timestamp": 1700160243639,
            "dsValue": "dsvalue"
        }
    ],
    "__v": 1
}
