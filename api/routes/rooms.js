const router = require("express").Router();
const Room = require(global.models).Room;
const boom = require('@hapi/boom');

/* GetOneRoom */
router.get("/:id", async (req, res, next) => {
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
    next(e);
  }
});

// /* GetRoomTables */
// router.get("/:id/tables/", async (req, res, next) => {
//   try {
//     const { Tables: tables } = await Room.scope("withTables").findByPk(
//       req.params.id
//     );
//     res.json({ tables });
//   } catch (e) {
//     next(e);
//   }
// });

// /* GetRoomActiveUsers */
// router.get("/:id/users/", async (req, res, next) => {
//   try {
//     let users = await Room.scope("withUsers").findByPk(req.params.id);
//     users = users.Tables.map((t) => t.TableUser.User);
//     res.json({ users });
//   } catch (e) {
//     next(e);
//   }
// });

module.exports = router;
