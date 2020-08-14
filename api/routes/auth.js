var express = require("express");
var router = express.Router();
const models = require(global.models);
const User = models.User;

const jwt = require("jsonwebtoken");
const passport = require("passport");
const jwt_secret = "your_jwt_secret"; // FIXME:
const expiresIn = 3600;
const bcrypt = require("bcrypt");

/* Signup */
router.post("/signup/", async (req, res) => {
  try {
    // パスワード
    const rawPassword = req.body.password;
    const hashedPassword = await bcrypt.hashSync(
      req.body.password,
      bcrypt.genSaltSync(10)
    );

    // すでにユーザーが存在するか確認
    const doesUserExist = await User.scope("auth").findOne({
      where: { email: req.body.email },
    });
    if (doesUserExist) {
      throw { message: "User already exists." };
    }

    // ユーザー作成
    req.body.password = hashedPassword;
    await User.create(req.body);

    // 認証
    req.body.password = rawPassword;
    passport.authenticate(
      "local",
      {
        session: false,
      },
      (err, user, info) => {
        if (err || !user) {
          return res.json({ message: info ? info.message : "Login failed" });
        }
        req.login(user, { session: false }, (err) => {
          if (err) {
            return res.json({ message: err });
          }
          // JWTトークン作成
          const token = jwt.sign(
            {
              id: user.id,
              name: user.name,
            },
            jwt_secret,
            { expiresIn }
          );
          const refreshToken = jwt.sign(
            {
              id: user.id,
              name: user.name,
            },
            jwt_secret
          );
          // レスポンス
          return res.json({ token, refreshToken });
        });
      }
    )(req, res);
  } catch (e) {
    res.json(e);
  }
});

/* Login */
router.post("/login/", async (req, res) => {
  try {
    passport.authenticate(
      "local",
      {
        session: false,
      },
      (err, user, info) => {
        if (err || !user) {
          return res.json({ message: info ? info.message : "Login failed" });
        }
        req.login(user, { session: false }, (err) => {
          if (err) {
            return res.json({ message: err });
          }
          // JWTトークン作成
          const token = jwt.sign(
            {
              id: user.id,
              name: user.name,
            },
            jwt_secret,
            { expiresIn }
          );
          const refreshToken = jwt.sign(
            {
              id: user.id,
              name: user.name,
            },
            jwt_secret
          );
          // レスポンス
          return res.json({ token, refreshToken });
        });
      }
    )(req, res);
  } catch (e) {
    res.json(e);
  }
});

/* Logout */
router.post("/logout/", async (req, res) => {
  try {
    res.json(req.logout());
  } catch (e) {
    res.json(e);
  }
});

/* RefreshToken */
router.get(
  "/refresh/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const user = await User.scope("auth").findByPk(req.user.id);

      req.login(user, { session: false }, (err) => {
        if (err) {
          return res.json({ message: err });
        }
        // JWTトークン作成
        const token = jwt.sign(
          {
            id: user.id,
            name: user.name,
          },
          jwt_secret,
          { expiresIn }
        );
        const refreshToken = jwt.sign(
          {
            id: user.id,
            name: user.name,
          },
          jwt_secret
        );
        // レスポンス
        return res.json({ token, refreshToken });
      });
    } catch (e) {
      res.json({ e });
    }
  }
);

/* GetCurrentUser */
router.get(
  "/user/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const user = await User.scope("auth").findByPk(req.user.id);
      res.json(user);
    } catch (e) {
      res.json(e);
    }
  }
);

module.exports = router;
