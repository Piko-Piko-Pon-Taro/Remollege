const router = require("express").Router();
const boom = require("@hapi/boom");
const addStatusOK = require("./lib/addStatusOK");
const User = require(global.models).User;
const images = require("./lib/images.js");

/* GetAllUsers */
router.get("/all/", async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(addStatusOK({ users }));
  } catch (e) {
    next(e);
  }
});

/* GetOneUser */
router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.json(addStatusOK({ user }));
  } catch (e) {
    next(e);
  }
});

/* UpdateUser */
router.post(
  "/update/id/:id",
  images.upload.single("file"),
  images.sendUploadToGCS,
  async (req, res, next) => {
    try {
      // 画像ファイルパス追加
      if (req.file && req.file.cloudStoragePublicUrl) {
        req.body.img = req.file.cloudStoragePublicUrl;
      }
      // データの保存
      const user = await User.update(
        {
          name: req.body.name,
          // profile: req.body.profile,
          img: req.body.img,
        },
        {
          where: {
            id: req.body.id,
          },
        }
      );

      res.json(addStatusOK({ user }));
    } catch (e) {
      next(e);
    }
  }
);

module.exports = router;
