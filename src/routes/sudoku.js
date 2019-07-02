const express = require("express");
const router = express.Router();

const {
  home,
  start,
  play,
  updateBoard,
  deleteGame
} = require("../controllers/sudoku");

router.get("/", home);
router.get("/start", start);
router.get("/play/:id", play);
router.post("/play/:id/", updateBoard);
router.post("/delete/:id/", deleteGame);

module.exports = router;
