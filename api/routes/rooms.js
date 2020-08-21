var express = require("express");
var router = express.Router();
const models = require(global.models);
const Room = models.Room;

/* GetOneRoom */
router.get("/:id", async (req, res) => {
  try {
    let room = await Room.scope('withUsers').findByPk(req.params.id);
    tables = room.Tables.map(t => {
      return {
        id: t.id,
        roomId: t.roomId,
        createdAt: t.createdAt,
        users: t.TableUsers.map(tu => {
          return tu.User
        })
      };
    })
    res.json({ room: {
      id: room.id,
      buildingId: room.buildingId,
      name: room.name,
      createdAt: room.createdAt,
      updatedAt: room.updatedAt,
      tables
    } });
  } catch (e) {
    res.json(e.message);
  }
});

// /* GetRoomTables */
// router.get("/:id/tables/", async (req, res) => {
//   try {
//     const { Tables: tables } = await Room.scope("withTables").findByPk(
//       req.params.id
//     );
//     res.json({ tables });
//   } catch (e) {
//     res.json(e);
//   }
// });

// /* GetRoomActiveUsers */
// router.get("/:id/users/", async (req, res) => {
//   try {
//     let users = await Room.scope("withUsers").findByPk(req.params.id);
//     users = users.Tables.map((t) => t.TableUser.User);
//     res.json({ users });
//   } catch (e) {
//     res.json(e);
//   }
// });

module.exports = router;
