// デフォルトのモジュールたち
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

// あぷぷ
const app = express();

// パス定義
global.models = path.join(__dirname, "models/index.js");

// 認証
// http://www.passportjs.org/
const passport = require("./passport");

// CORS設定
const cors = require("cors");
const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:3001',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));

// デフォルトのミドルウェアたち
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// ルーティング
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));
app.use("/chats", require("./routes/chats"));
app.use("/rooms", require("./routes/rooms"));
app.use("/tables", require("./routes/tables"));
app.use("/auth", require("./routes/auth"));

// エラーハンドリング
// catch 404 and forward to error handler
app.use((req, res, next) => next(require('@hapi/boom').notFound('missing')));
// https://hapi.dev/module/boom/api
app.use(require('./middleware/error'));

module.exports = app;
