"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const sequelize_1 = __importDefault(require("sequelize"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const serve_favicon_1 = __importDefault(require("serve-favicon"));
const routes_1 = __importDefault(require("./routes"));
const env = process.env.NODE_ENV || "development";
const config = __importStar(require("./config/config.js"));
// @ts-ignore: :shrug:
const envDbConfig = config[env];
const app = express_1.default();
const port = process.env.PORT || 8000;
app.use(morgan_1.default("tiny"));
app.use(cors_1.default());
app.use(compression_1.default());
app.use(cookie_parser_1.default());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use(serve_favicon_1.default(path_1.default.join(__dirname, "..", "public", "favicon.ico")));
app.use("/static", express_1.default.static(path_1.default.join(__dirname, "public")));
app.use(routes_1.default);
const sequelize = new sequelize_1.default.Sequelize(envDbConfig.database, envDbConfig.username, envDbConfig.password, {
    host: envDbConfig.host,
    dialect: envDbConfig.dialect
});
sequelize
    .authenticate()
    .then(() => {
    console.log("Connection to the database has been established successfully.");
    app.listen(port, () => {
        console.log(`App initialized on port ${port}`);
        return;
    });
})
    .catch((err) => {
    console.error("Unable to connect to the database:", err);
});
module.exports = app;
//# sourceMappingURL=server.js.map