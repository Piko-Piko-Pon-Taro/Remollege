const router = require("express").Router();
const Table = require(global.models).Table;

/* GetTableChats */
router.get("/:id/chats/", async (req, res) => {
  try {
    let { Chats: chats } = await Table.scope("withChats").findByPk(
      req.params.id
    );
    chats = chats.map((c) => {
      const cDataValues = c.dataValues;
      const { User: user, ...chat } = cDataValues;
      const userDataValues = user.dataValues;
      return { ...chat, ...userDataValues };
    });
    return res.json({ chats });
  } catch (e) {
    res.json(e.message);
  }
});

module.exports = router;
