const admin = require("firebase-admin");
const serviceAccount = require("../serviceAccountKey.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// const verifyToken = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) return res.sendStatus(401);
  
//   admin.auth().verifyIdToken(token)
//     .then(decoded => {
//       req.uid = decoded.uid;
//       next();
//     })
//     .catch(() => {
//       res.sendStatus(403);
//     });
// };

// module.exports = verifyToken;