"use strict";

const slugify = require("slugify");

const Board = require("../engines/board");

class Game extends Board {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        name: DataTypes.STRING,
        slug: DataTypes.STRING,
        board: DataTypes.ARRAY(DataTypes.ARRAY(DataTypes.STRING))
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
  }
}

module.exports = Game;
