const router = require("express").Router();
const boom = require('@hapi/boom');
const addStatusOK = require('./lib/addStatusOK');
const Room = require(global.models).Room;

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
    res.json(addStatusOK({ room: {
      id: room.id,
      buildingId: room.buildingId,
      name: room.name,
      img: room.img,
      createdAt: room.createdAt,
      updatedAt: room.updatedAt,
      tables
    } }));
  } catch (e) {
    next(e);
  }
});

/* GetRoomsByBuildingId */
router.get("/buildingId/:buildingId", async (req, res, next) => {
  try {
    const rooms = await Room.findAll({where: { buildingId: req.params.buildingId }});
    res.json(addStatusOK({ rooms }));
  } catch (e) {
    next(e);
  }
})

/* GetRoomsByCampusId */
router.get("/campusId/:campusId", async (req, res, next) => {
  try {
    const rooms = await Room.scope({ method: ['inCampus', req.params.campusId] }).findAll();
    res.json(addStatusOK({ rooms }));
  } catch (e) {
    next(e);
  }
})

// /* GetRoomTables */
// router.get("/:id/tables/", async (req, res, next) => {
//   try {
//     const { Tables: tables } = await Room.scope("withTables").findByPk(
//       req.params.id
//     );
//     res.json(addStatusOK({ tables }));
//   } catch (e) {
//     next(e);
//   }
// });

// /* GetRoomActiveUsers */
// router.get("/:id/users/", async (req, res, next) => {
//   try {
//     let users = await Room.scope("withUsers").findByPk(req.params.id);
//     users = users.Tables.map((t) => t.TableUser.User);
//     res.json(addStatusOK({ users }));
//   } catch (e) {
//     next(e);
//   }
// });

module.exports = router;
