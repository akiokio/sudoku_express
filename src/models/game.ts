import Sequelize from "sequelize";
import { Request } from "express";
import slugify from "slugify";

import BoardEngine from "../engines/board";

class Game extends BoardEngine(Sequelize.Model) {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        name: DataTypes.STRING,
        slug: DataTypes.STRING,
        board: DataTypes.ARRAY(DataTypes.ARRAY(DataTypes.INTEGER))
      },
      {
        sequelize,
        modelName: "Game",
        hooks: {
          beforeValidate: game => {
            game.slug = slugify(game.name);
            return game;
          }
        }
      }
    );
  }

  initBoard() {
    this.generateBoard();
    // Desired number of empty spaces on the board
    this.fuzzyBoard(17);
  }

  getPlayUrl(req: Request) {
    return `${req.protocol}://${req.headers.host}/sudoku/play/${this.id}`;
  }
}

module.exports = Game;
