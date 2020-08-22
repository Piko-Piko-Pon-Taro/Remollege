const router = require("express").Router();
const Chat = require(global.models).Chat;
const boom = require('@hapi/boom');

/* GetOneChat */
router.get("/:id", async (req, res, next) => {
  try {
    const { dataValues: chatDataValues } = await Chat.scope(
      "withUsers"
    ).findByPk(req.params.id);
    const { User, ...chat } = chatDataValues;
    const userDataValues = chatDataValues.User.dataValues;
    return res.json({ chat: { ...chat, ...userDataValues } });
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
    res.json({ chat });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
