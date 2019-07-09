import { Options } from "sequelize";

export interface EnvConfig {
  [development: string]: Options;
  test: Options;
  production: Options;
}

const config: EnvConfig = {
  development: {
    username: "postgres",
    password: null,
    database: "development",
    host: "127.0.0.1",
    dialect: "postgres"
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "postgres"
  },
  production: {
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
    host: process.env.PROD_DB_HOSTNAME,
    dialect: "postgres"
  }
};

module.exports = config;
