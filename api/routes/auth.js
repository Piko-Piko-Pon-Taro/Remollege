// TODO:
// - 重複する処理が結構あるのでまとめる

const router = require("express").Router();
const User = require(global.models).User;

const jwt = require("jsonwebtoken");
const passport = require("passport");
const bcrypt = require("bcrypt");

const jwt_secret = "your_jwt_secret"; // FIXME: envファイルで管理する
const expiresIn = 1800; // 30分
const refreshExpiresIn = 3 * 30 * 24 * 3600; // 3ヶ月

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
            jwt_secret,
            { expiresIn: refreshExpiresIn }
          );
          // レスポンス
          return res.json({ token, refreshToken, expiresInSec: expiresIn, refreshExpiresInSec: refreshExpiresIn });
        });
      }
    )(req, res);
  } catch (e) {
    res.json(401, e.message);
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
            jwt_secret,
            { expiresIn: refreshExpiresIn }
          );
          // レスポンス
          return res.json({ token, refreshToken, expiresInSec: expiresIn, refreshExpiresInSec: refreshExpiresIn });
        });
      }
    )(req, res);
  } catch (e) {
    res.json(401, e.message);
  }
});

/* Logout */
router.post("/logout/", async (req, res) => {
  try {
    res.json(req.logout());
  } catch (e) {
    res.json(e.message);
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
          jwt_secret,
          { expiresIn: refreshExpiresIn }
        );
        // レスポンス
          return res.json({ token, refreshToken, expiresInSec: expiresIn, refreshExpiresInSec: refreshExpiresIn });
      });
    } catch (e) {
      res.json(401, e.message);
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
      res.json({ user });
    } catch (e) {
      res.json(401, e.message);
    }
  }
);

module.exports = router;
