const models = require("./index");

describe("Game", () => {
  const game = models.Game.build({
    name: "test"
  });
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

  test("it should init an empty board", () => {
    game.generateBoard();
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
});
