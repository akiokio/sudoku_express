"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const sudoku_1 = __importDefault(require("./sudoku"));
router.get("/", (req, res) => {
    res.send("Please visit http://localhost:8000/sudoku");
});
router.use("/sudoku", sudoku_1.default);
router.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!");
});
exports.default = router;
//# sourceMappingURL=index.js.map