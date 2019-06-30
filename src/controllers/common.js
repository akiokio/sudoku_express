const models = require("../models");

const home = async (req, res) => {
  const games = await models.game.findAll();
  res.json(games);
};

module.exports = {
  home
};
