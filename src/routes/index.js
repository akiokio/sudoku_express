const express = require("express");
const router = express.Router();

const sudokuRoutes = require("./sudoku");

router.get("/", (req, res) => {
  res.send("Please visit http://localhost:8000/sudoku");
});

router.use("/sudoku", sudokuRoutes);

router.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});

module.exports = router;
