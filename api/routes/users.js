const router = require("express").Router();
const User = require(global.models).User;
const boom = require('@hapi/boom');

/* GetAllUsers */
router.get("/all/", async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json({ users });
  } catch (e) {
    next(e);
  }
});

/* GetOneUser */
router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.json({ user });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
