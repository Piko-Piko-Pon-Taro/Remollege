const router = require("express").Router();
const User = require(global.models).User;

/* GetAllUsers */
router.get("/all/", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json({ users });
  } catch (e) {
    res.json(e.message);
  }
});

/* GetOneUser */
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.json({ user });
  } catch (e) {
    res.json(e.message);
  }
});

module.exports = router;
