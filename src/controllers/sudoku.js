const faker = require("faker");

const asyncMiddleware = require("../middlewares/async");
const models = require("../models");

const home = asyncMiddleware(async (req, res) => {
  const games = await models.game.findAll();
  res.json(
    games.map(game => ({
      [game.slug]: {
        url: game.id
      }
    }))
  );
});

const start = asyncMiddleware(async (req, res) => {
  const game = await models.Game.build({
    name: req.query.name || faker.lorem.words(2)
  });

  game.initBoard();
  game.save();

  game.printBoard();
  res.json(game);
});

module.exports = {
  home,
  start
};
