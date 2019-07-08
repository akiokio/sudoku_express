const express = require("express");
const router = express.Router();

const {
  home,
  start,
  play,
  updateBoard,
  deleteGame,
  solveGame
} = require("../controllers/sudoku");

router.get("/", home);
router.get("/start", start);
router.get("/play/:id/", play);
router.post("/play/:id/", updateBoard);
router.post("/delete/:id/", deleteGame);
router.post("/solve/:id/", solveGame);

module.exports = router;
