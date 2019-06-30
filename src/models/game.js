"use strict";

module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define(
    "game",
    {
      name: DataTypes.STRING,
      board: sequelize.ARRAY(sequelize.ARRAY(sequelize.INTEGER))
    },
    {}
  );
  Game.associate = function(models) {
    // associations can be defined here
  };
  return Game;
};
