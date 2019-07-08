var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const faker = require("faker");
const { cloneDeep } = require("lodash");
const asyncMiddleware = require("../middlewares/async");
const models = require("../models");
const home = asyncMiddleware((req, res) => __awaiter(this, void 0, void 0, function* () {
    const games = yield models.Game.findAll();
    res.json({
        success: true,
        games: games.map(game => ({
            id: game.id,
            name: game.name,
            url: game.getPlayUrl(req)
        }))
    });
}));
const start = asyncMiddleware((req, res) => __awaiter(this, void 0, void 0, function* () {
    const game = yield models.Game.build({
        name: req.query.name || faker.lorem.words(2)
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
const play = asyncMiddleware((req, res) => __awaiter(this, void 0, void 0, function* () {
    const [game] = yield models.Game.findAll({
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
const updateBoard = asyncMiddleware((req, res) => __awaiter(this, void 0, void 0, function* () {
    const row = parseInt(req.body["row"]);
    const col = parseInt(req.body["col"]);
    const val = parseInt(req.body["val"]);
    const [game] = yield models.Game.findAll({
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
    yield models.sequelize.query(`UPDATE "Games" SET board[${row + 1}][${col + 1}] = ${val} WHERE id = '${req.params.id}';`);
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
const deleteGame = asyncMiddleware((req, res) => __awaiter(this, void 0, void 0, function* () {
    yield models.Game.destroy({
        where: {
            id: req.params.id
        }
    });
    res.json({ success: true, message: "Game deleted" });
}));
const solveGame = asyncMiddleware((req, res) => __awaiter(this, void 0, void 0, function* () {
    const [game] = yield models.Game.findAll({
        where: {
            id: req.params.id
        }
    });
    if (!game) {
        res.status(404).json({ success: false, error: "Game not found" });
    }
    const result = game.solveBoard(0, 0);
    game.board = cloneDeep(game.board);
    yield game.save();
    return res.json({
        success: result,
        game,
        message: result
            ? "Board solved successfully!"
            : "This board is impossible to solve!"
    });
}));
module.exports = {
    home,
    start,
    play,
    updateBoard,
    deleteGame,
    solveGame
};
//# sourceMappingURL=sudoku.js.map