require("dotenv").config();

import express from "express";
import Sequelize, { Options } from "sequelize";
import path from "path";
import cors from "cors";
import compression from "compression";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import morgan from "morgan";
import favicon from "serve-favicon";

import routes from "./routes";
const env: string = process.env.NODE_ENV || "development";

import * as config from "./config/config";
// @ts-ignore: :shrug:
const envDbConfig: Options = config[env];

const app = express();
const port = process.env.PORT || 8000;

app.use(morgan("tiny"));
app.use(cors());
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(favicon(path.join(__dirname, "..", "public", "favicon.ico")));
app.use("/static", express.static(path.join(__dirname, "public")));

app.use(routes);

const sequelize = new Sequelize.Sequelize(
  envDbConfig.database,
  envDbConfig.username,
  envDbConfig.password,
  {
    host: envDbConfig.host,
    dialect: envDbConfig.dialect
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log(
      "Connection to the database has been established successfully."
    );
    app.listen(port, () => {
      console.log(`App initialized on port ${port}`);
      return;
    });
  })
  .catch((err: any) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = app;
