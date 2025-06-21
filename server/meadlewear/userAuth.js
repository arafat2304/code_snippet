const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config()

function verifyToken(req, res, next) {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];

  if (!token) return res.status(401).json({ msg: "Not authenticated" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid or expired token" });
  }
}

module.exports = verifyToken;
