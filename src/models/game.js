"use strict";

const Sequelize = require("sequelize");
const slugify = require("slugify");
const { shuffle } = require("lodash");

const EMPTY_VALUE = 0;
const BOARD_SIZE = 9;
let VALID_DIGITS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

class Game extends Sequelize.Model {
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
    this.populateBoard();
  }

  generateBoard() {
    this.board = Array(BOARD_SIZE)
      .fill()
      .map(() =>
        Array(BOARD_SIZE)
          .fill()
          .map(() => EMPTY_VALUE)
      );
  }

  populateBoard() {
    if (!this.board) {
      this.generateBoard();
    }

    for (let i = 0; i < Math.pow(BOARD_SIZE, 2); i++) {
      const rowIndex = Math.floor(i / BOARD_SIZE);
      const colIndex = i % BOARD_SIZE;
      const cellValue = this.board[rowIndex][colIndex];
      if (cellValue == EMPTY_VALUE) {
        VALID_DIGITS = shuffle(VALID_DIGITS);
        for (let digit of VALID_DIGITS) {
          if (
            !this.isUsedInRow(rowIndex, digit) &&
            !this.isUsedInColumn(colIndex, digit) &&
            !this.isUsedInBox(rowIndex, colIndex, digit)
          ) {
            this.board[rowIndex][colIndex] = digit;
            if (this.isGridFull()) {
              return true;
            } else {
              if (this.populateBoard()) {
                return true;
              }
            }
          }
        }
      }
    }

    return false;
  }

  isUsedInRow(rowIndex, value) {
    return this.board[rowIndex].includes(value);
  }

  isUsedInColumn(colIndex, value) {
    const columnValues = [];
    Array(BOARD_SIZE)
      .fill()
      .map((_, i) => {
        columnValues.push(this.board[i][colIndex]);
      });
    return columnValues.includes(value);
  }

  isUsedInBox(rowIndex, colIndex, value) {
    let boxStartRowIndex = -1;
    let boxColStartIndex = -1;

    if (rowIndex <= 2) {
      boxStartRowIndex = 0;
    } else if (rowIndex > 2 && rowIndex <= 5) {
      boxStartRowIndex = 3;
    } else if (rowIndex > 5 && rowIndex <= 8) {
      boxStartRowIndex = 6;
    }

    if (colIndex <= 2) {
      boxColStartIndex = 0;
    } else if (colIndex > 2 && colIndex <= 5) {
      boxColStartIndex = 3;
    } else if (colIndex > 5 && colIndex <= 8) {
      boxColStartIndex = 6;
    }

    if (boxStartRowIndex < 0 || boxColStartIndex < 0) {
      throw Error("Box: invalid position!");
    }

    Array(3)
      .fill()
      .forEach((_, i) => {
        Array(3)
          .fill()
          .forEach((_, j) => {
            if (
              this.board[boxStartRowIndex + i][boxColStartIndex + j] == value
            ) {
              return true;
            }
          });
      });
    return false;
  }

  printBoard() {
    this.board.forEach(row => {
      console.log(row.join(","));
    });
  }

  isGridFull() {
    let isFull = true;
    this.board.forEach(row => {
      if (row.includes(EMPTY_VALUE)) {
        isFull = false;
      }
    });
    return isFull;
  }
}

module.exports = Game;
