// require("dotenv").config();
// const jwt = require("jsonwebtoken");
// const secretKey = process.env.secretKey; // Replace with your actual secret key

// function verifyToken(req, res, next) {
//   const token = req.headers.authorization; // Assuming the token is sent in the "Authorization" header

//   if (!token) {
//     return res.status(401).json({ message: "Token is missing" });
//   }

//   jwt.verify(token, secretKey, (err, user) => {
//     if (err) {
//       return res.status(403).json({ message: "Invalid token" });
//     }
//     req.user = user; // Attach the user object to the request
//     next();
//   });
// }

// module.exports = verifyToken;
