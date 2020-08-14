var express = require("express");
var router = express.Router();
const models = require(global.models);
const User = models.User;

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

/* get one */
router.get("/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  res.json({ user });
});

module.exports = router;
