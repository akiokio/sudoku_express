const express = require("express");
const router = express.Router();

const { home } = require("../controllers/common");

router.get("/", home);

module.exports = router;
