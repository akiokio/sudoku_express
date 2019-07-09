"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = __importDefault(require("faker"));
const lodash_1 = require("lodash");
const async_1 = __importDefault(require("../middlewares/async"));
const models_1 = __importDefault(require("../models"));
const home = async_1.default((req, res) => __awaiter(this, void 0, void 0, function* () {
    const games = yield models_1.default.Game.findAll();
    res.json({
        success: true,
        games: games.map(game => ({
            id: game.id,
            name: game.name,
            url: game.getPlayUrl(req)
        }))
    });
}));
exports.home = home;
const start = async_1.default((req, res) => __awaiter(this, void 0, void 0, function* () {
    const game = yield models_1.default.Game.build({
        name: req.query.name || faker_1.default.lorem.words(2)
    });
    game.initBoard();
    try {
        yield game.save();
    }
    catch (error) {
        throw error;
    }
    res.json({
        success: true,
        url: game.getPlayUrl(req),
        game
    });
}));
exports.start = start;
const play = async_1.default((req, res) => __awaiter(this, void 0, void 0, function* () {
    const [game] = yield models_1.default.Game.findAll({
        where: {
            id: req.params.id
        }
    });
    if (!game) {
        res.status(404).json({ success: false, error: "Game not found" });
    }
    res.json({
        success: true,
        game: {
            url: game.getPlayUrl(req),
            name: game.name,
            board: game.board
        }
    });
}));
exports.play = play;
const updateBoard = async_1.default((req, res) => __awaiter(this, void 0, void 0, function* () {
    const row = parseInt(req.body["row"]);
    const col = parseInt(req.body["col"]);
    const val = parseInt(req.body["val"]);
    const [game] = yield models_1.default.Game.findAll({
        where: {
            id: req.params.id
        }
    });
    if (!game) {
        return res.status(404).json({
            success: false,
            error: "Game not found"
        });
    }
    if (!("row" in req.body) || !("col" in req.body) || !("val" in req.body)) {
        return res.status(400).json({
            success: false,
            error: "Row, col or val empty",
            game
        });
    }
    if (!game.isRowValid(row)) {
        return res
            .status(400)
            .json({ success: false, error: "Row is not valid", game });
    }
    if (!game.isColValid(col)) {
        return res
            .status(400)
            .json({ success: false, error: "Col is not valid", game });
    }
    if (!game.isValueValid(val)) {
        return res
            .status(400)
            .json({ success: false, error: "Value is not valid", game });
    }
    if (!game.isEmptySpace(row, col)) {
        return res
            .status(400)
            .json({ success: false, error: "Space not empty", game });
    }
    if (!game.isValueApplicable(row, col, val)) {
        return res.status(400).json({
            success: false,
            error: "This value cannot be applied here",
            game
        });
    }
    yield models_1.default.sequelize.query(`UPDATE "Games" SET board[${row + 1}][${col + 1}] = ${val} WHERE id = '${req.params.id}';`);
    yield game.reload();
    if (game.isBoardComplete()) {
        return res.status(200).json({
            success: true,
            boardCompleted: true,
            game,
            message: "Congratulations you have finished this puzze!"
        });
    }
    return res.json({
        success: true,
        game,
        message: "Still work to do, keep going!"
    });
}));
exports.updateBoard = updateBoard;
const deleteGame = async_1.default((req, res) => __awaiter(this, void 0, void 0, function* () {
    yield models_1.default.Game.destroy({
        where: {
            id: req.params.id
        }
    });
    res.json({ success: true, message: "Game deleted" });
}));
exports.deleteGame = deleteGame;
const solveGame = async_1.default((req, res) => __awaiter(this, void 0, void 0, function* () {
    const [game] = yield models_1.default.Game.findAll({
        where: {
            id: req.params.id
        }
    });
    if (!game) {
        res.status(404).json({ success: false, error: "Game not found" });
    }
    const result = game.solveBoard(0, 0);
    game.board = lodash_1.cloneDeep(game.board);
    yield game.save();
    return res.json({
        success: result,
        game,
        message: result
            ? "Board solved successfully!"
            : "This board is impossible to solve!"
    });
}));
exports.solveGame = solveGame;
//# sourceMappingURL=sudoku.js.map