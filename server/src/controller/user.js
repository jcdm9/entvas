const Users = require("./../models/users");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Missing username or password." });
  }

  if (!validator.isEmail(username)) {
    return res.status(400).json({ message: "Email is invalid." });
  }

  const user = await Users.findOne({ email: username });
  if (!user) {
    return res.status(400).json({ message: "Incorrect username or password." });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Incorrect username or password." });
  }

  const payload = {
    user: {
      id: user._id,
    },
  };

  jwt.sign(
    payload,
    process.env.TOKEN_SECRET,
    {
      expiresIn: "1h",
    },
    (err, token) => {
      if (err) return res.json({ message: err });
      return res.json({ accessToken: token });
    }
  );
};

const create = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  if (!email || !validator.isEmail(email)) {
    return res.status(400).json({ message: "Email is invalid." });
  }

  const emailExist = await Users.findOne({ email });
  if (emailExist) {
    return res.status(400).json({ message: "Email is not available." });
  }

  const user = new Users({
    email,
    first_name,
    last_name,
    created_by: null,
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);

  const createdUser = await user.save();
  if (!createdUser) {
    return res
      .status(500)
      .json({ message: "An error occured in creating user." });
  }
  // remove password
  createdUser.password = undefined;

  res.json(createdUser);
};

module.exports = { login, create };
