"use strict";

import fs from "fs";
import path from "path";
import { Sequelize, Model, Options } from "sequelize";

import Game from "../models/game";

import configJson from "../config/config.js";

const basename = path.basename(__filename);
const env: string = process.env.NODE_ENV || "development";

const config: Options = configJson[env];
const db: any = {};

let sequelize: Sequelize;
sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      !file.includes(".test.js")
    );
  })
  .forEach(async file => {
    const model: Game = require(path.join(__dirname, file)).default;
    db[model.name] = model.init(sequelize, Sequelize);
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export type dbType = {
  Game: any;
  sequelize: Sequelize;
};

export default db;
