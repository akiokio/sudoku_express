const BoardEngine = require("./board");

const TestBoard = BoardEngine(class {});

describe("Game", () => {
  const game = new TestBoard();

  const emptyBoard = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];

  const fullBoard = [
    [5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],
    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 9]
  ];

  const unsolvableBoard = [
    [5, 1, 6, 8, 4, 9, 7, 3, 2],
    [3, 0, 7, 6, 0, 5, 0, 0, 0],
    [8, 0, 9, 7, 0, 0, 0, 6, 5],
    [1, 3, 5, 0, 6, 0, 9, 0, 7],
    [4, 7, 2, 5, 9, 1, 0, 0, 6],
    [9, 6, 8, 3, 7, 0, 0, 5, 0],
    [2, 5, 3, 1, 8, 6, 0, 7, 4],
    [6, 8, 4, 2, 0, 7, 5, 0, 0],
    [7, 9, 1, 0, 5, 0, 6, 0, 8]
  ];

  test("it should init an empty board", () => {
    game.generateEmptyBoard();
    expect(game.board).toEqual(emptyBoard);
  });

  test("it should verify if number is used in a row", () => {
    expect(game.isUsedInRow(2, 1)).toBeFalsy();
    game.board[2] = [0, 0, 0, 0, 0, 0, 1, 0, 0];
    expect(game.isUsedInRow(2, 1)).toBeTruthy();
  });

  test("it should verify if number is used in a column", () => {
    expect(game.isUsedInColumn(5, 4)).toBeFalsy();
    game.board[8][5] = 4;
    expect(game.isUsedInColumn(5, 4)).toBeTruthy();
  });

  test("it should verify if number is already used in a box", () => {
    expect(game.isUsedInBox(2, 2, 8)).toBeFalsy();
    game.board[2][2] = 8;
    expect(game.isUsedInBox(2, 2, 8)).toBeTruthy();
  });

  test("is should verify is the board is complete", () => {
    expect(game.isBoardComplete()).toBeFalsy();
    game.board = fullBoard;
    expect(game.isBoardComplete()).toBeTruthy();
  });

  test("it should not solve an unsolvable board", () => {
    game.board = unsolvableBoard;
    expect(game.solveBoard(0, 0)).toBeFalsy();
  });
});
