const express = require("express");
const router = express.Router();
const tasks = require("./../controller/task");
const auth = require("./../middleware/auth");

router.get("/", auth.validate, tasks.getAll);
router.get("/:token", tasks.findOne);
router.post("/", auth.validate, tasks.create);
router.patch("/:id", auth.validate, tasks.updateById);
router.delete("/:id", auth.validate, tasks.removeById);
router.post("/:token", tasks.updateStatusByToken);
router.post("/assign/:id", auth.validate, tasks.assignTaskByEmail);

module.exports = router;
