var express = require("express");
var router = express.Router();
const models = require(global.models);
const Chat = models.Chat;

/* GetOneChat */
router.get("/:id", async (req, res) => {
  try {
    const { dataValues: chatDataValues } = await Chat.scope(
      "withUsers"
    ).findByPk(req.params.id);
    const { User, ...chat } = chatDataValues;
    const userDataValues = chatDataValues.User.dataValues;
    return res.json({ chat: { ...chat, ...userDataValues } });
  } catch (e) {
    res.json(e.message);
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
    res.json(e.message);
  }
});

module.exports = router;
