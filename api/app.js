require("dotenv").config();

// デフォルトのモジュールたち
require("dotenv").config();
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

if (process.env.NODE_ENV === "production") {
  client_url = "http://pikopikopon1.uc.r.appspot.com";
} else if (process.env.NODE_ENV === "development_in_docker") {
  client_url = "http://client:3001";
} else {
  client_url = "http://localhost:3001";
}

const corsOptions = {
  origin: client_url,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

// デフォルトのミドルウェアたち
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// ルーティング
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));
app.use("/buildings", passport.authenticate("jwt", { session: false }), require("./routes/buildings"));
app.use("/chats", passport.authenticate("jwt", { session: false }), require("./routes/chats"));
app.use("/rooms", passport.authenticate("jwt", { session: false }), require("./routes/rooms"));
app.use("/tables", passport.authenticate("jwt", { session: false }), require("./routes/tables"));
app.use("/users", passport.authenticate("jwt", { session: false }), require("./routes/users"));
app.use("/video", require("./routes/video"));

// エラーハンドリング
// catch 404 and forward to error handler
app.use((req, res, next) => next(require("@hapi/boom").notFound("missing")));
// https://hapi.dev/module/boom/api
app.use(require("./middleware/error"));

module.exports = app;
