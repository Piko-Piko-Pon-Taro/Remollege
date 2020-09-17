const router = require("express").Router();
const boom = require('@hapi/boom');
const addStatusOK = require('./lib/addStatusOK');
const Building = require(global.models).Building;

/* GetAllBuildings */
router.get("/all/", async (req, res, next) => {
  try {
    const buildings = await Building.findAll();
    res.json(addStatusOK({ buildings }));
  } catch (e) {
    next(e);
  }
});

/* GetBuildingsByCampusId */
router.get("/campusId/:campusId", async (req, res, next) => {
  try {
    const buildings = await Building.findAll({where: { campusId: req.params.campusId }});
    res.json(addStatusOK({ buildings }));
  } catch (e) {
    next(e);
  }
})

/* GetOneBuilding */
router.get("/:id", async (req, res, next) => {
  try {
    const building = await Building.findByPk(req.params.id);
    res.json(addStatusOK({ building }));
  } catch (e) {
    next(e);
  }
});

module.exports = router;
