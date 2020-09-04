const Storage = require("@google-cloud/storage");
const CLOUD_BUCKET = "remollege-storage";
const storage = new Storage.Storage({
  projectId: "pikopikopon1",
  keyFilename: "pikopikopon1-3b74f04bdc9f.json",
});
const bucket = storage.bucket(CLOUD_BUCKET);
var multer = require("multer");
var upload = multer({
  storage: multer.MemoryStorage,
  // limits: {
  //   fileSize: 5 * 1024 * 1024, // no larger than 5mb
  // },
});

function getPublicUrl(filename) {
  return `https://storage.googleapis.com/${CLOUD_BUCKET}/${filename}`;
}

function sendUploadToGCS(req, res, next) {
  if (!req.file) {
    return next();
  }

  const gcsname = Date.now() + req.file.originalname;
  const file = bucket.file(gcsname);

  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype,
    },
    resumable: false,
  });

  stream.on("error", (err) => {
    console.log("err:" + err);
    req.file.cloudStorageError = err;
    next(err);
  });

  stream.on("finish", () => {
    req.file.cloudStorageObject = gcsname;
    file.makePublic().then(() => {
      req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
      next();
    });
  });

  stream.end(req.file.buffer);
}

module.exports = {
  upload,
  sendUploadToGCS,
};
