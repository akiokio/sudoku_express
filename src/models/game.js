"use strict";

const Sequelize = require("sequelize");
const slugify = require("slugify");

class Game extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    super.init(
      {
        name: DataTypes.STRING,
        slug: DataTypes.STRING,
        board: DataTypes.ARRAY(DataTypes.ARRAY(DataTypes.STRING))
      },
      {
        sequelize,
        modelName: "Game"
      }
    );

    this.addHook("beforeValidate", game => {
      game.slug = slugify(game.name);

      return game;
    });

    return this;
  }

  initGame() {
    this.generateBoard();
    this.populateBoard();
  }

  generateBoard() {
    this.board = Array(9)
      .fill()
      .map(() =>
        Array(9)
          .fill()
          .map(() => "")
      );
  }

  populateBoard() {
    if (!this.board) {
      throw Error("Not board");
    }
  }
}

module.exports = Game;
