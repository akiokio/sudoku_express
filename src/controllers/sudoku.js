const models = require("../models");

const start = async (req, res) => {
  const games = await models.game.findAll();
  res.json(games);
};

module.exports = {
  start
};
