"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const slugify_1 = __importDefault(require("slugify"));
const board_1 = __importDefault(require("../engines/board"));
class Game extends board_1.default(sequelize_1.Model) {
    static init(sequelize, DataTypes) {
        return super.init({
            name: DataTypes.STRING,
            slug: DataTypes.STRING,
            board: DataTypes.ARRAY(DataTypes.ARRAY(DataTypes.INTEGER))
        }, {
            sequelize,
            modelName: "Game",
            hooks: {
                beforeValidate: (game) => {
                    game.slug = slugify_1.default(game.name);
                    return game;
                }
            }
        });
    }
    initBoard() {
        this.generateBoard();
        // Desired number of empty spaces on the board
        this.fuzzyBoard(17);
    }
    getPlayUrl(req) {
        return `${req.protocol}://${req.headers.host}/sudoku/play/${this.id}`;
    }
}
exports.default = Game;
//# sourceMappingURL=game.js.map