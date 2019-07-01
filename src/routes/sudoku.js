const express = require("express");
const router = express.Router();

const { home, start, play } = require("../controllers/sudoku");

router.get("/", home);
router.get("/start", start);
router.get("/play/:id", play);

module.exports = router;
