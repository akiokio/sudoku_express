const faker = require("faker");

const asyncMiddleware = require("../middlewares/async");
const models = require("../models");

const home = asyncMiddleware(async (req, res) => {
  const games = await models.Game.findAll();
  res.json(
    games.map(game => ({
      [game.slug]: {
        name: game.name,
        url: game.getPlayUrl(req)
      }
    }))
  );
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

  game.printBoard();
  res.json({
    url: game.getPlayUrl(req),
    game
  });
});

const play = asyncMiddleware(async (req, res) => {
  const games = await models.Game.findAll({
    where: {
      id: req.params.id
    }
  });
  res.json(
    games.map(game => ({
      [game.slug]: {
        url: game.getPlayUrl(req),
        board: game.board
      }
    }))
  );
});

module.exports = {
  home,
  start,
  play
};
