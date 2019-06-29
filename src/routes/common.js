const express = require("express");
const router = express.Router();

const {
  home,
  one,
  post,
  downloader,
  reader
} = require("../controllers/common");

router.get("/", home);
router.get("/one", one);
router.get("/downloader", downloader);
router.get("/reader", reader);

router.post("/", post);

module.exports = router;
