const Users = require("./../models/users");
const jwt = require("jsonwebtoken");

const validate = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
  }

  await jwt.verify(
    token.split(" ")[1],
    process.env.TOKEN_SECRET,
    async (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: err.name });
      }

      const user = await Users.findById(decoded.user.id).select("-password");
      if (!user) {
        return res.status(401).json({ message: "Unauthorized User." });
      }

      req.currentUser = user;
      next();
    }
  );
};

module.exports = { validate };
