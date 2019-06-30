const express = require("express");
const router = express.Router();

const { home, start } = require("../controllers/sudoku");

router.get("/", home);
router.get("/start", start);

module.exports = router;
