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
      req.body = {
    "emailId" : "key3@gmail.com",
    "password" : "key",
    "rsaKey": "rsa1"
}
o/p-
{
    "userId": "0cc50ff0-7de8-11ee-97fe-636ddfdb0a8e",
    "emailId": "key3@gmail.com",
    "password": "10d7d22bf90747d3431c1f327a6580b45bdfd917c986aa3ed437e9d8681342b80cc50ff1-7",
    "rsaKey": "rsa1",
    "_id": "654b0251531bfba6587ee572",
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
    "userRsaKey": "rsa",
    "data": {
        "friends": [
            "key2@gmail.com",
            "key3@gmail.com"
        ]
    },
    "key": [
        {
            "friend": "key2@gmail.com",
            "key": "key",
            "iv": "iv"
        },
        {
            "friend": "key3@gmail.com",
            "key": "key",
            "iv": "iv"
        }
    ],
    "friendRsaKey": [
        {
            "friends": "key2@gmail.com",
            "rsaKey": "rsa"
        },
        {
            "friends": "key3@gmail.com",
            "rsaKey": "rsa1"
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
    req.body={
    "emailId" : "key1@gmail.com",
    "friends":"key2@gmail.com",
    "message" : "hello"
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
    "sent": [
        {
            "friends": "key2@gmail.com",
            "chat": "hello",
            "timestamp": 1699415626776
        }
    ],
    "__v": 3
}
