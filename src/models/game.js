"use strict";

module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define(
    "game",
    {
      name: DataTypes.STRING,
      board: DataTypes.ARRAY(DataTypes.ARRAY(DataTypes.INTEGER))
    },
    {}
  );
  Game.associate = function(models) {
    // associations can be defined here
  };
  return Game;
};
