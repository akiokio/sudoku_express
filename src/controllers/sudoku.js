const faker = require("faker");

const asyncMiddleware = require("../middlewares/async");
const models = require("../models");

const home = asyncMiddleware(async (req, res) => {
  const games = await models.Game.findAll();
  res.json({
    success: true,
    games: games.map(game => ({
      [game.slug]: {
        name: game.name,
        url: game.getPlayUrl(req)
      }
    }))
  });
});

const start = asyncMiddleware(async (req, res) => {
  const game = await models.Game.build({
    name: req.query.name || faker.lorem.words(2)
  });

  game.initBoard();
  try {
    await game.save();
  } catch (error) {
    throw error;
  }

  res.json({
    success: true,
    url: game.getPlayUrl(req),
    game
  });
});

const play = asyncMiddleware(async (req, res) => {
  const [game] = await models.Game.findAll({
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
      board: game.board
    }
  });
});

const updateBoard = asyncMiddleware(async (req, res) => {
  const row = req.body["row"];
  const col = req.body["col"];
  const val = req.body["val"];

  const [game] = await models.Game.findAll({
    where: {
      id: req.params.id
    }
  });

  if (!("row" in req.body) || !("col" in req.body) || !("val" in req.body)) {
    return res.status(400).json({
      success: false,
      error: "Row, col or val empty",
      board: game.board
    });
  }

  if (!game.isEmptySpace(row, col)) {
    return res
      .status(400)
      .json({ success: false, error: "Space not empty", board: game.board });
  }

  // Results will be an empty array and metadata will contain the number of affected rows.
  await models.sequelize.query(
    `UPDATE "Games" SET board[${row + 1}][${col + 1}] = ${val} WHERE id = '${
      req.params.id
    }';`
  );
  await game.reload();

  return res.json({
    success: true,
    board: game.board
  });
});

module.exports = {
  home,
  start,
  play,
  updateBoard
};
