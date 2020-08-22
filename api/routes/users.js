const router = require("express").Router();
const boom = require('@hapi/boom');
const addStatusOK = require('./lib/addStatusOK');
const User = require(global.models).User;

/* GetAllUsers */
router.get("/all/", async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(addStatusOK({ users }));
  } catch (e) {
    next(e);
  }
});

/* GetOneUser */
router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.json(addStatusOK({ user }));
  } catch (e) {
    next(e);
  }
});

module.exports = router;
