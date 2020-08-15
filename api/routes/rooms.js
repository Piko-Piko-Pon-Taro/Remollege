var express = require("express");
var router = express.Router();
const models = require(global.models);
const Room = models.Room;

/* GetRoomTables */
router.get("/:id/tables/", async (req, res) => {
  try {
    const { Tables: tables } = await Room.scope("withTables").findByPk(
      req.params.id
    );
    res.json({ tables });
  } catch (e) {
    res.json(e);
  }
});

/* GetRoomActiveUsers */
router.get("/:id/users/", async (req, res) => {
  try {
    let users = await Room.scope("withUsers").findByPk(req.params.id);
    users = users.Tables.map((t) => t.TableUser.User);
    res.json({ users });
  } catch (e) {
    res.json(e);
  }
});

module.exports = router;
