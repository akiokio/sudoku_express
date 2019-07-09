import express from "express";
const router = express.Router();

import {
  home,
  start,
  play,
  updateBoard,
  deleteGame,
  solveGame
} from "../controllers/sudoku";

router.get("/", home);
router.get("/start", start);
router.get("/play/:id/", play);
router.post("/play/:id/", updateBoard);
router.post("/delete/:id/", deleteGame);
router.post("/solve/:id/", solveGame);

export default router;
