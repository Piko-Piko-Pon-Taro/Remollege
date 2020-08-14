var express = require("express");
var router = express.Router();
const models = require(global.models);
const Chat = models.Chat;

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

/* get one */
router.get("/:id", async (req, res) => {
  try {
    // TODO:chatの次元降下&User->user
    const chat = await Chat.scope("withUsers").findByPk(req.params.id);
    res.json({ chat });
  } catch (e) {
    res.json(e);
  }
});

/* post one */
router.post("/create/", async (req, res) => {
  try {
    const chat = await Chat.create({
      tableId: req.body.tableId,
      userId: req.body.userId,
      content: req.body.content,
    });
    res.json({ chat });
  } catch (e) {
    res.json(e);
  }
});

module.exports = router;
