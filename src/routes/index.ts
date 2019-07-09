import express from "express";
const router = express.Router();

import sudokuRoutes from "./sudoku";

router.get("/", (req, res) => {
  res.send("Please visit http://localhost:8000/sudoku");
});

router.use("/sudoku", sudokuRoutes);

router.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});

export default router;
