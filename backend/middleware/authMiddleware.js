const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const header = req.header("Authorization");

  if (!header) {
    return res.status(401).json({ msg: "No token, access denied" });
  }

  try {
    const token = header.startsWith("Bearer ") ? header.split(" ")[1] : header;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid token" });
  }
};
