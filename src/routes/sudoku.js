const express = require("express");
const router = express.Router();

const { home, start, play, updateBoard } = require("../controllers/sudoku");

router.get("/", home);
router.get("/start", start);
router.get("/play/:id", play);
router.post("/play/:id/", updateBoard);

module.exports = router;
