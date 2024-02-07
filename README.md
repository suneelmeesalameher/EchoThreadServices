
# Echo Threads

## 1. Introduction
Echo Threads is a state-of-the-art messaging platform prioritizing user privacy through advanced security measures. This project report outlines the objectives, features, technologies, security measures, architecture, and challenges faced during development.

## 2. Tech Stack
- Frontend: React Js, Html & CSS
- Backend: Node Js, Express Js
- Database: Atlas MongoDB
- Libraries: crypto-js, Subtle-Crypto

## 3. Features
- End-to-End Encryption
- User-Friendly Interface
- Collaborative Architecture
- Password Handling with Hashing and Salting
- Diffie-Hellman Key Exchange
- Digital Signatures for Non-repudiation
- Secure Backend Infrastructure (Atlas MongoDB)
- HTTPS Protocol for Secure Communication

## 4. Process
The project started with a focus on creating a secure messaging platform. The team faced challenges in balancing security and user-friendliness. The frontend utilized Subtle-Crypto libraries, while the backend was deployed securely using Render Website and HTTPS. The project concluded with a robust application ensuring data security and user satisfaction.

## 5. Learnings
- Implementation of end-to-end encryption protocols.
- Collaboration between frontend and backend for a seamless user experience.
- Secure password handling using cryptographic libraries.
- Integration of advanced cryptographic techniques for secure communication.

## 6. Challenges Faced
Balancing stringent security measures with a user-friendly interface proved challenging. The team had to find the right equilibrium to ensure a secure yet intuitive application.

## 7. Future Enhancements
- Integration of multi-factor authentication for enhanced security.
- Implementation of JWT tokens and websocket for improved communication.
- Continuous exploration of emerging encryption technologies.
- Addition of privacy features like ephemeral messages.

## 8. Improvement
While the project achieved its objectives, continuous improvement can be made in terms of user experience and exploring newer encryption technologies for even stronger security.

## 9. References
- Mozilla Developer Network. (2010, August 20). Web-Crypto. Retrieved from [Web_Crypto_API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API)

## 10. GitHub URLs
- [Frontend GitHub](https://github.com/suneelmeesalameher/EchoThreadFE)
- [Backend GitHub](https://github.com/suneelmeesalameher/EchoThreadServices)

The Echo Threads project represents a commitment to secure software programming, and its success lies in the meticulous implementation of cryptographic techniques and a collaborative development approach.



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






# Echo Threads API Documentation

## User APIs

### 1. Get Users
- **Endpoint:** `GET https://echothread.onrender.com/:emailId`
- **Output:**
  ```json
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
  ```

### 2. Search User
- **Endpoint:** `GET https://echothread.onrender.com/user/:emailId`
- **Output:**
  ```json
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
  ```

### 3. Create User
- **Endpoint:** `POST https://echothread.onrender.com/user`
- **Request Body:**
  ```json
  {
      "emailId": "user122@gmail.com",
      "password": "key",
      "rsaKey": "rsa1",
      "dsPublicKey": "ds"
  }
  ```
- **Output:**
  ```json
  {
      "userId": "fb476f10-84af-11ee-85f2-f385d3065936",
      "emailId": "user122@gmail.com",
      "password": "f787f5b063ef0bd5f690d906843088aa08d810bac3daf7ad409f73c50a5d4b73fb476f11-8",
      "rsaKey": "rsa1",
      "dsPublicKey": "ds",
      "_id": "655662bab4a093320d99f267",
      "__v": 0
  }
  ```

### 4. Login User
- **Endpoint:** `POST https://echothread.onrender.com/user/login`
- **Request Body:**
  ```json
  {
      "emailId" : "xxxx@xxx.com",
      "password" : "password"
  }
  ```
- **Output:**
  ```json
  {
      "message": "Login successful",
      "data": {
          "userId": "73aeffb0-7de7-11ee-97fe-636ddfdb0a8e",
          "emailId": "key1@gmail.com"
      }
  }
  ```

## Chat APIs

### 1. Get User's Friends
- **Endpoint:** `GET http://localhost:6000/chat/:emailId`
- **Output:**
  ```json
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
  ```

### 2. Add Friends
- **Endpoint:** `POST http://localhost:6000/chat/save`
- **Request Body:**
  ```json
  {
      "emailId": "key1@gmail.com",
      "friends" : "key3@gmail.com",
      "key": "key",
      "iv": "iv"
  }
  ```
- **Output:**
  ```json
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
  ```

### 3. Get Chat Between Two Friends
- **Endpoint:** `GET http://localhost:6000/chat/:emailId/:friend`
- **Output:**
  ```json
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
  ```

### 4. Send Message to a Friend
- **Endpoint:** `POST http://localhost:6000/chat/friend`
- **Request Body:**
  ```json
  {
      "emailId": "user121@gmail.com",
      "friends": "user122@gmail.com",
      "message": "hello",
      "dsValue": "dsvalue"
  }
  ```
- **Output:**
  ```json
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
  ```

Feel free to explore and utilize these APIs for building applications with secure user and chat functionalities.

