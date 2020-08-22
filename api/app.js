// モジュール
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

// あぷぷ
const app = express();

// パス定義
global.models = path.join(__dirname, "models/index.js");

// 認証
const passport = require("./passport");

// CORS設定
const corsOptions = {
  origin: 'http://localhost:3001', // FIXME: 環境変数に移行する
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

module.exports = app;
