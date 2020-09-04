const boom = require('@hapi/boom')

const errorHandler = (err, req, res, next) => {
  // ヘッダーが既に送信されていたらそのまま次のエラーハンドリングミドルウェアに渡す
  if (res.headersSent) return next(err)
  // エラーは全てboom化する
  if (!err.isBoom) err = boom.boomify(err)
  // 500番台はログを出力 // TODO: sentryみたいなエラー監視SaaSに送信したりしたい
  if (err.isServer) console.log(err)
  // jsonでいい感じに返却
  return res.status(err.output.statusCode).json(err.output.payload);
}

module.exports = errorHandler
