const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.sendStatus(401);

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded token: ", decoded);

    req.userId = decoded.userId;
    next();
  } catch {
    res.sendStatus(403);
  }
};
module.exports = authMiddleware;
