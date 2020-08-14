var express = require("express");
var router = express.Router();
const models = require(global.models);
const Room = models.Room;

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

/* get one */
router.get("/:id", async (req, res) => {
  try {
    //const users = await Room.scope("withUsers").findByPk(req.params.id);
    //const tables = await Room.scope("withTables").findByPk(req.params.id);
    const chats = await Room.scope("withChats").findByPk(req.params.id);
    res.json({ chats });
  } catch (e) {
    res.json(e);
  }
});

module.exports = router;
