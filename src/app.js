require("dotenv").config();

import express from "express";
import path from "path";
import cors from "cors";
import compression from "compression";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import morgan from "morgan";
import favicon from "serve-favicon";

import routes from "./routes";

const app = express();
const port = process.env.PORT;

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

export default app;
