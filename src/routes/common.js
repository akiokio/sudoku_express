import express from "express";
const router = express.Router();

import { home, one, post, downloader, reader } from "../controllers/common";

router.get("/", home);
router.get("/one", one);
router.get("/downloader", downloader);
router.get("/reader", reader);

router.post("/", post);

export default router;
