const express = require("express");
const router = express.Router();

const commonRoutes = require("./common");

router.get("/", (req, res) => {
  res.send("Hello world");
});

router.use("/common", commonRoutes);

router.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});

module.exports = router;
