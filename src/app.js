require("dotenv").config();

const express = require("express");
const Sequelize = require("sequelize");
const path = require("path");
const cors = require("cors");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const favicon = require("serve-favicon");
const { configure } = require("sequelize-pg-utilities");

const routes = require("./routes");

const config = require("./config/config.js");

const { name, user, password, options } = configure(config);

const app = express();
const port = process.env.PORT || 8000;

app.use(morgan("tiny"));
app.use(cors());
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.use("/static", express.static(path.join(__dirname, "public")));

app.use(routes);

const sequelize = new Sequelize(name, user, password, options);

sequelize
  .authenticate()
  .then(() => {
    console.log(
      "Connection to the database has been established successfully."
    );
    app.listen(port, err => {
      if (err) {
        Logger.error(err);
        process.exit(1);
        return;
      }
      console.log(`App initialized on port ${port}`);
    });
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = app;
