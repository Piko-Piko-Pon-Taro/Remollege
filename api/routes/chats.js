const router = require("express").Router();
const boom = require('@hapi/boom');
const addStatusOK = require('./lib/addStatusOK');
const Chat = require(global.models).Chat;

/* GetOneChat */
router.get("/:id", async (req, res, next) => {
  try {
    const { dataValues: chatDataValues } = await Chat.scope(
      "withUsers"
    ).findByPk(req.params.id);
    const { User, ...chat } = chatDataValues;
    const userDataValues = chatDataValues.User.dataValues;
    res.json(addStatusOK({ chat: { ...chat, ...userDataValues } }));
  } catch (e) {
    next(e);
  }
});

/* CreateOneChat */
router.post("/create/", async (req, res) => {
  try {
    const chat = await Chat.create({
      tableId: req.body.tableId,
      userId: req.body.userId,
      content: req.body.content,
    });
    res.json(addStatusOK({ chat }));
  } catch (e) {
    next(e);
  }
});

module.exports = router;
