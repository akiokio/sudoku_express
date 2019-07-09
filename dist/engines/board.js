"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const EMPTY_VALUE = 0;
exports.EMPTY_VALUE = EMPTY_VALUE;
const BOARD_SIZE = 9;
const VALID_DIGITS = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const BoardEngine = (ParentClass) => class extends ParentClass {
    static init(sequelize, DataTypes) {
        return super.init(sequelize, DataTypes);
    }
    generateEmptyBoard() {
        this.board = Array(BOARD_SIZE)
            .fill(null, 0, BOARD_SIZE)
            .map(() => Array(BOARD_SIZE)
            .fill(null, 0, BOARD_SIZE)
            .map(() => EMPTY_VALUE));
    }
    generateBoard() {
        if (!this.board)
            this.generateEmptyBoard();
        this.solveBoard(0, 0);
    }
    solveBoard(currentRow, currentCol) {
        const [found, row, col] = this.getNextEmptySpace(currentRow, currentCol);
        if (!found) {
            return true;
        }
        const possibleNumbers = this.getPossibleNumbers(row, col);
        for (let number of possibleNumbers) {
            this.board[row][col] = number;
            if (this.solveBoard(row, col)) {
                return true;
            }
            else {
                // Backtrack and let return false to try again
                this.board[row][col] = EMPTY_VALUE;
            }
        }
        return false;
    }
    fuzzyBoard(desiredEmptySpaces) {
        for (let i = 0; i < desiredEmptySpaces; i++) {
            this.applyRandomEmptySpace();
        }
    }
    printBoard() {
        this.board.forEach((row) => {
            console.log(row.join(","));
        });
    }
    getNextEmptySpace(currentRow, currentCol) {
        let candidateRow, candidateCol, found = false;
        for (let i = currentCol + currentRow * BOARD_SIZE; i < Math.pow(BOARD_SIZE, 2); i++) {
            candidateRow = Math.floor(i / BOARD_SIZE);
            candidateCol = i % BOARD_SIZE;
            if (this.isEmptySpace(candidateRow, candidateCol)) {
                found = true;
                return [found, candidateRow, candidateCol];
            }
        }
        return [false, candidateRow, candidateCol];
    }
    getPossibleNumbers(row, col) {
        let localValidDigits = lodash_1.shuffle([...VALID_DIGITS]).filter(number => {
            return this.isValueApplicable(row, col, number);
        });
        return localValidDigits;
    }
    isUsedInRow(rowIndex, value) {
        return this.board[rowIndex].includes(value);
    }
    isUsedInColumn(colIndex, value) {
        const columnValues = [];
        for (let i = 0; i < BOARD_SIZE; i++) {
            columnValues.push(this.board[i][colIndex]);
        }
        return columnValues.includes(value);
    }
    isUsedInBox(rowIndex, colIndex, value) {
        let boxStartRowIndex = -1;
        let boxColStartIndex = -1;
        if (rowIndex <= 2) {
            boxStartRowIndex = 0;
        }
        else if (rowIndex > 2 && rowIndex <= 5) {
            boxStartRowIndex = 3;
        }
        else if (rowIndex > 5 && rowIndex <= 8) {
            boxStartRowIndex = 6;
        }
        if (colIndex <= 2) {
            boxColStartIndex = 0;
        }
        else if (colIndex > 2 && colIndex <= 5) {
            boxColStartIndex = 3;
        }
        else if (colIndex > 5 && colIndex <= 8) {
            boxColStartIndex = 6;
        }
        if (boxStartRowIndex < 0 || boxColStartIndex < 0) {
            throw Error("Box: invalid position!");
        }
        let isUsed = false;
        Array(3)
            .fill(null, 0, 3)
            .forEach((_, i) => {
            Array(3)
                .fill(null, 0, 3)
                .forEach((_, j) => {
                if (this.board[boxStartRowIndex + i][boxColStartIndex + j] == value) {
                    isUsed = true;
                }
            });
        });
        return isUsed;
    }
    isBoardComplete() {
        let isComplete = true;
        this.board.forEach((row) => {
            row.forEach(item => {
                if (!this.isValueValid(item)) {
                    isComplete = false;
                }
            });
        });
        return isComplete;
    }
    isEmptySpace(row, col) {
        return this.board[row][col] == EMPTY_VALUE;
    }
    applyRandomEmptySpace() {
        const randomRow = Math.floor(Math.random() * BOARD_SIZE);
        const randomColumn = Math.floor(Math.random() * BOARD_SIZE);
        if (this.board[randomRow][randomColumn] == EMPTY_VALUE) {
            this.applyRandomEmptySpace();
        }
        else {
            this.board[randomRow][randomColumn] = EMPTY_VALUE;
        }
    }
    isValueValid(value) {
        if (value < 1 || value > 9) {
            return false;
        }
        return true;
    }
    isValueApplicable(row, col, value) {
        if (this.isUsedInRow(row, value) ||
            this.isUsedInColumn(col, value) ||
            this.isUsedInBox(row, col, value)) {
            return false;
        }
        return true;
    }
    isRowValid(row) {
        if (row < 0 || row > BOARD_SIZE - 1) {
            return false;
        }
        return true;
    }
    isColValid(col) {
        if (col < 0 || col > BOARD_SIZE - 1) {
            return false;
        }
        return true;
    }
};
exports.default = BoardEngine;
//# sourceMappingURL=board.js.map