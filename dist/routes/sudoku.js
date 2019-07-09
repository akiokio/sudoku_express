"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const sudoku_1 = require("../controllers/sudoku");
router.get("/", sudoku_1.home);
router.get("/start", sudoku_1.start);
router.get("/play/:id/", sudoku_1.play);
router.post("/play/:id/", sudoku_1.updateBoard);
router.post("/delete/:id/", sudoku_1.deleteGame);
router.post("/solve/:id/", sudoku_1.solveGame);
exports.default = router;
//# sourceMappingURL=sudoku.js.map