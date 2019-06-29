require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const favicon = require("serve-favicon");

const routes = require("./routes");

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

if (!module.parent) {
  app.listen(port, err => {
    if (err) {
      Logger.error(err);
      process.exit(1);
      return;
    }
    console.log(`App initialized on port ${port}`);
  });
}

module.exports = app;
