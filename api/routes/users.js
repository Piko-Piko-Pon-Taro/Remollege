var express = require("express");
var router = express.Router();
const models = require(global.models);
const User = models.User;

/* GetAllUser */
router.get("/all/", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (e) {
    res.json(e);
  }
});

/* GetOneUser */
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.json(user);
  } catch (e) {
    res.json(e);
  }
});

module.exports = router;
