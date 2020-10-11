// TODO:
// - 重複する処理が結構あるのでまとめる

const router = require("express").Router();
const boom = require('@hapi/boom');
const addStatusOK = require('./lib/addStatusOK');
const User = require(global.models).User;

const jwt = require("jsonwebtoken");
const passport = require("passport");
const bcrypt = require("bcrypt");

// const expiresIn = 1800; // 30分
const expiresIn = 6 * 3600; // 6時間 // FIXME: 30分に戻す
const refreshExpiresIn = 7 * 24 * 3600; // 1週間

const axios = require('axios');

/* Waseda Signup & Login */
router.post("/waseda/", async (req, res, next) => {
  try {
    // accessTokenでgoogleからuser情報を取得
    let data;
    try {
      res_userinfo = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { authorization: req.headers.authorization }
      });
      data = res_userinfo.data
    } catch (e) {
      throw boom.unauthorized('Google auth failed');
    }

    // wasedaメールでない場合エラー
    // if (!data.hd.endsWith('waseda.jp')) throw boom.unauthorized("Email domain is not waseda"); // FIXME: 早稲田生のみにするときにコメントアウト外す

    // gmail未認証の場合エラー
    if (!data.email_verified) throw boom.unauthorized('Email is not verified');

    // 条件に応じてuserを新規追加および更新し、userを取得
    let user = await User.scope('jwt').findOne({ where: { googleSub: data.sub } });
    if (!user) { // 同一googleSubがない場合
      user = await User.scope('jwt').findOne({ where: { email: data.email } });
      if (!user) { // 同一emailがない場合
        await User.create({ name: data.name, email: data.email, img: data.picture, googleSub: data.sub });
      }　else { // 同一emailがある場合
        await User.update({ googleSub: data.sub }, { where: { email: data.email } });
      }
      user = await User.scope('jwt').findOne({ where: { googleSub: data.sub } });
    }
    if (!user) throw boom.badImplementation();

    // token作成
    const accessToken = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn });
    const refreshToken = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET, { expiresIn: refreshExpiresIn });
    res.json(addStatusOK({ accessToken, refreshToken }));
  } catch (e) {
    next(e);
  }
});

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
      throw boom.conflict('User already exists');
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
          throw boom.notImplemented('Login failed', err)
        }
        req.login(user, { session: false }, (err) => {
          if (err) {
            throw boom.notImplemented('Login failed', err)
          }
          // JWTトークン作成
          const token = jwt.sign(
            {
              id: user.id,
              name: user.name,
            },
            process.env.JWT_SECRET,
            { expiresIn }
          );
          const refreshToken = jwt.sign(
            {
              id: user.id,
              name: user.name,
            },
            process.env.JWT_SECRET,
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
          throw boom.notImplemented('Login failed', err)
        }
        req.login(user, { session: false }, (err) => {
          if (err) {
            throw boom.notImplemented('Login failed', err)
          }
          // JWTトークン作成
          const token = jwt.sign(
            {
              id: user.id,
              name: user.name,
            },
            process.env.JWT_SECRET,
            { expiresIn }
          );
          const refreshToken = jwt.sign(
            {
              id: user.id,
              name: user.name,
            },
            process.env.JWT_SECRET,
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
      const user = await User.scope("jwt").findByPk(req.user.id);
      if (!user) throw boom.badImplementation();

      // token作成
      const accessToken = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn });
      const refreshToken = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET, { expiresIn: refreshExpiresIn });
      res.json(addStatusOK({ accessToken, refreshToken, expiresIn }));
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
      res.json(addStatusOK({ user: req.user }));
    } catch (e) {
      next(e);
    }
  }
);

module.exports = router;
