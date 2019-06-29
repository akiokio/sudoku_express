import express from "express";
const router = express.Router();

import commonRoutes from "./common";

router.get("/", (req, res) => {
  res.send("Hello world");
});

router.use("/common", commonRoutes);

router.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});

export default router;
