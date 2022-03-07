const path = require("path");
const express = require("express")
const multer = require("multer");

const router = new express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/")
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
  }
});


const checkFileTypes = (file, cb) => {
  const fileTypes = /jpg|jpeg|png/;
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);

  // console.log(file);

  if (extName && mimeType) {
    return cb(null, true)
  } else {
    // console.log("hello");
    return cb(new Error("only Images Allowed"), false)
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileTypes(file, cb);
  }
})
// const upload = multer({ storage: storage, fileFilter })

router.post("/", upload.single("image"), (req, res) => {
  // console.log();
  res.send(`/${req.file.path}`);
  // res.send(`done`);
})

module.exports = router;