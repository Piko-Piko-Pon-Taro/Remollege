// TODO:
// - 重複する処理が結構あるのでまとめる

const router = require("express").Router();
const boom = require('@hapi/boom');
const addStatusOK = require('./lib/addStatusOK');
const User = require(global.models).User;

const jwt = require("jsonwebtoken");
const passport = require("passport");
const bcrypt = require("bcrypt");

const jwt_secret = "your_jwt_secret"; // FIXME: envファイルで管理する
const expiresIn = 1800; // 30分
const refreshExpiresIn = 3 * 30 * 24 * 3600; // 3ヶ月

/* Signup */
router.post("/signup/", async (req, res, next) => {
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
      throw boom.conflict('user already exists');
    }

    // ユーザー作成
    req.body.password = hashedPassword;
    req.body.img = 'sampleIcon1.jpg'; // TODO: 画像アップロードできるようになったら削除する
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
          throw boom.notImplemented('login failed', err)
        }
        req.login(user, { session: false }, (err) => {
          if (err) {
            throw boom.notImplemented('login failed', err)
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
          res.json(addStatusOK({ token, refreshToken, expiresInSec: expiresIn, refreshExpiresInSec: refreshExpiresIn }));
        });
      }
    )(req, res);
  } catch (e) {
    next(e);
  }
});

/* Login */
router.post("/login/", async (req, res, next) => {
  try {
    passport.authenticate(
      "local",
      {
        session: false,
      },
      (err, user, info) => {
        if (err || !user) {
          throw boom.notImplemented('login failed', err)
        }
        req.login(user, { session: false }, (err) => {
          if (err) {
            throw boom.notImplemented('login failed', err)
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
          res.json(addStatusOK({ token, refreshToken, expiresInSec: expiresIn, refreshExpiresInSec: refreshExpiresIn }));
        });
      }
    )(req, res);
  } catch (e) {
    next(e);
  }
});

/* Logout */
router.post("/logout/", async (req, res, next) => {
  try {
    req.logout();
    res.json(addStatusOK({ message: 'logged out' }));
  } catch (e) {
    next(e);
  }
});

/* RefreshToken */
router.get(
  "/refresh/",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const user = await User.scope("auth").findByPk(req.user.id);

      req.login(user, { session: false }, (err) => {
        if (err) {
          throw boom.notImplemented('login failed', err)
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
        res.json(addStatusOK({ token, refreshToken, expiresInSec: expiresIn, refreshExpiresInSec: refreshExpiresIn }));
      });
    } catch (e) {
      next(e);
    }
  }
);

/* GetCurrentUser */
router.get(
  "/user/",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const user = await User.scope("auth").findByPk(req.user.id);
      res.json(addStatusOK({ user }));
    } catch (e) {
      next(e);
    }
  }
);

module.exports = router;
