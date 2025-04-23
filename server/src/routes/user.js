const express = require("express");
const router = express.Router();
const user = require("../controller/user");

router.post("/login", user.login);
router.post("/", user.create);

module.exports = router;
