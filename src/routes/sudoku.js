const express = require("express");
const router = express.Router();

const { start } = require("../controllers/sudoku");

router.get("/", start);

module.exports = router;
